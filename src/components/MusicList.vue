<template>
  <div class="bg-white rounded-lg shadow-sm p-3 sm:p-4">
    <h2 class="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">Your Music</h2>
    <div v-if="musicList.length === 0" class="text-gray-500 text-center text-sm sm:text-base">No music uploaded yet.</div>
    <div v-else class="space-y-3 sm:space-y-4">
      <div v-for="music in musicList" :key="music" class="flex items-center p-2 sm:p-3 bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-300">
        <button 
          @click="togglePlay(music)" 
          class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-orange-500 text-white rounded-full mr-2 sm:mr-3 hover:bg-orange-600 transition"
        >
          <svg v-if="!playingTrack || playingTrack !== music" class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
          </svg>
        </button>
        <div class="flex-1">
          <span class="text-black font-medium text-sm sm:text-base truncate">{{ music }}</span>
          <div class="flex items-center mt-1">
            <div class="h-4 sm:h-5 w-full sm:w-3/4 bg-gray-200 rounded">
              <div class="h-full bg-orange-500 rounded" :style="{ width: (progressMap[music] || 0) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      musicList: [],
      playingTrack: null,
      progressMap: {}, // Lưu progress riêng cho từng bài nhạc
      audio: null
    }
  },
  methods: {
    async fetchMusicList() {
      try {
        const response = await axios.get('https://music-upload-backend.onrender.com/music')
        this.musicList = response.data.files
        // Khởi tạo progressMap cho các bài nhạc mới
        this.musicList.forEach(music => {
          if (!this.progressMap[music]) {
            this.$set(this.progressMap, music, 0)
          }
        })
      } catch (error) {
        console.error('Error fetching music list:', error)
      }
    },
    getMusicUrl(filename) {
      return `https://music-upload-backend.onrender.com/uploads/${filename}`
    },
    togglePlay(music) {
      if (this.playingTrack === music) {
        this.audio.pause()
        this.playingTrack = null
      } else {
        if (this.audio) {
          this.audio.pause()
        }
        this.audio = new Audio(this.getMusicUrl(music))
        this.audio.play()
        this.playingTrack = music
        this.audio.addEventListener('timeupdate', () => {
          this.$set(this.progressMap, music, (this.audio.currentTime / this.audio.duration) * 100)
        })
        this.audio.addEventListener('ended', () => {
          this.playingTrack = null
          this.$set(this.progressMap, music, 0)
        })
      }
    }
  },
  mounted() {
    this.fetchMusicList()
  },
  beforeDestroy() {
    if (this.audio) {
      this.audio.pause()
    }
  }
}
</script>
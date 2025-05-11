<template>
  <div class="bg-white rounded-lg shadow-sm p-3 sm:p-4">
    <h2 class="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">Your Music</h2>
    <div v-if="musicList.length === 0" class="text-gray-500 text-center text-sm sm:text-base">No music uploaded yet.</div>
    <div v-else class="space-y-3 sm:space-y-4">
      <div v-for="music in musicList" :key="music" class="p-2 sm:p-3 bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-300">
        <div class="flex items-center">
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
              <!-- Thời gian -->
              <div v-if="playingTrack === music" class="text-xs text-gray-600 mr-2">
                {{ formatTime(currentTimes[music] || 0) }} / {{ formatTime(durations[music] || 0) }}
              </div>
              <!-- Thanh tiến trình -->
              <div 
                class="relative h-4 sm:h-5 w-full sm:w-3/4 bg-gray-200 rounded cursor-pointer"
                @click="seekTrack($event, music)"
              >
                <div 
                  class="absolute h-full bg-orange-500 rounded" 
                  :style="{ width: (progressMap[music] || 0) + '%' }"
                ></div>
              </div>
            </div>
            <!-- Waveform -->
            <div v-if="playingTrack === music" :id="'waveform-' + music.replace(/[^a-zA-Z0-9]/g, '')" class="mt-2"></div>
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
      progressMap: {}, // Lưu tiến trình cho từng bài
      currentTimes: {}, // Lưu thời gian hiện tại
      durations: {}, // Lưu tổng thời gian
      audio: null,
      waveforms: {}, // Lưu waveform cho từng bài
    }
  },
  methods: {
    async fetchMusicList() {
      try {
        const response = await axios.get('https://music-upload-backend.onrender.com/music')
        this.musicList = response.data.files
        this.musicList.forEach(music => {
          if (!this.progressMap[music]) {
            this.$set(this.progressMap, music, 0)
            this.$set(this.currentTimes, music, 0)
            this.$set(this.durations, music, 0)
          }
        })
      } catch (error) {
        console.error('Error fetching music list:', error)
      }
    },
    getMusicUrl(filename) {
      return `https://music-upload-backend.onrender.com/uploads/${filename}`
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
    },
    togglePlay(music) {
      if (this.playingTrack === music) {
        // Dừng bài nhạc
        this.audio.pause()
        this.waveforms[music]?.pause()
        this.playingTrack = null
      } else {
        // Dừng bài nhạc trước (nếu có) và reset tiến trình
        if (this.audio) {
          this.audio.pause()
          this.waveforms[this.playingTrack]?.destroy()
          this.$set(this.progressMap, this.playingTrack, 0)
          this.$set(this.currentTimes, this.playingTrack, 0)
        }

        // Phát bài nhạc mới
        this.audio = new Audio(this.getMusicUrl(music))
        this.audio.play()
        this.playingTrack = music

        // Tải metadata để lấy duration
        this.audio.addEventListener('loadedmetadata', () => {
          this.$set(this.durations, music, this.audio.duration)
        })

        // Cập nhật tiến trình và thời gian
        this.audio.addEventListener('timeupdate', () => {
          this.$set(this.progressMap, music, (this.audio.currentTime / this.audio.duration) * 100)
          this.$set(this.currentTimes, music, this.audio.currentTime)
          if (this.waveforms[music]) {
            this.waveforms[music].seekTo(this.audio.currentTime / this.audio.duration)
          }
        })

        // Reset khi kết thúc
        this.audio.addEventListener('ended', () => {
          this.playingTrack = null
          this.$set(this.progressMap, music, 0)
          this.$set(this.currentTimes, music, 0)
          this.waveforms[music]?.destroy()
        })

        // Tạo waveform cho bài nhạc đang phát
        this.$nextTick(() => {
          const waveformId = `waveform-${music.replace(/[^a-zA-Z0-9]/g, '')}`
          this.waveforms[music] = window.WaveSurfer.create({
            container: `#${waveformId}`,
            waveColor: '#d1d5db',
            progressColor: '#f97316',
            height: 50,
            barWidth: 2,
            barGap: 1,
            cursorWidth: 0,
          })
          this.waveforms[music].load(this.getMusicUrl(music))
        })
      }
    },
    seekTrack(event, music) {
      if (this.playingTrack !== music) return
      const rect = event.target.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const width = rect.width
      const seekPercentage = (clickX / width)
      this.audio.currentTime = seekPercentage * this.audio.duration
      this.$set(this.progressMap, music, seekPercentage * 100)
      this.$set(this.currentTimes, music, this.audio.currentTime)
      if (this.waveforms[music]) {
        this.waveforms[music].seekTo(seekPercentage)
      }
    },
  },
  mounted() {
    this.fetchMusicList()
  },
  beforeDestroy() {
    if (this.audio) {
      this.audio.pause()
    }
    Object.values(this.waveforms).forEach(waveform => waveform.destroy())
  }
}
</script>
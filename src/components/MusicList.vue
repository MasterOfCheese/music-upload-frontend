<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-200 mb-3 sm:mb-4">Your Music</h2>
    <div v-if="musicList.length === 0" class="text-gray-400 text-center">No music uploaded yet.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="music in musicList" :key="music" class="flex items-center justify-between p-3 sm:p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300">
        <div class="flex items-center gap-2 sm:gap-4">
          <img src="https://via.placeholder.com/50" alt="Album Art" class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg">
          <span class="text-gray-200 font-medium text-sm sm:text-base truncate">{{ music }}</span>
        </div>
        <audio controls :src="getMusicUrl(music)" class="w-1/2 sm:w-2/3"></audio>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      musicList: []
    }
  },
  methods: {
    async fetchMusicList() {
      try {
        const response = await axios.get('https://music-upload-backend.onrender.com/music')
        this.musicList = response.data.files
      } catch (error) {
        console.error('Error fetching music list:', error)
      }
    },
    getMusicUrl(filename) {
      return `https://music-upload-backend.onrender.com/uploads/${filename}`
    }
  },
  mounted() {
    this.fetchMusicList()
  }
}
</script>
<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-200 mb-4">Your Music</h2>
    <div v-if="musicList.length === 0" class="text-gray-400 text-center">No music uploaded yet.</div>
    <div v-else class="grid gap-4">
      <div v-for="music in musicList" :key="music" class="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300">
        <div class="flex items-center gap-4">
          <img src="https://via.placeholder.com/50" alt="Album Art" class="w-12 h-12 rounded-lg">
          <span class="text-gray-200 font-medium truncate">{{ music }}</span>
        </div>
        <audio controls :src="getMusicUrl(music)" class="w-1/2"></audio>
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
<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Your Music</h2>
    <div v-if="musicList.length === 0" class="text-gray-500 text-center">No music uploaded yet.</div>
    <div v-for="music in musicList" :key="music" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3 hover:bg-gray-100 transition">
      <span class="text-gray-800 font-medium truncate">{{ music }}</span>
      <audio controls :src="getMusicUrl(music)" class="w-1/2"></audio>
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
        const response = await axios.get('http://localhost:8000/music')
        this.musicList = response.data.files
      } catch (error) {
        console.error('Error fetching music list:', error)
      }
    },
    getMusicUrl(filename) {
      return `http://localhost:8000/uploads/${filename}`
    }
  },
  mounted() {
    this.fetchMusicList()
  }
}
</script>
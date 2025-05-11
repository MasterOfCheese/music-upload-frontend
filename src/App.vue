<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
    <!-- Header -->
    <header class="bg-gray-800 shadow-lg p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-wide md:text-3xl">NamP Music</h1>
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-gray-300 hover:text-white">Home</a>
        <a href="#" class="text-gray-300 hover:text-white">Playlist</a>
        <a href="#" class="text-gray-300 hover:text-white">Profile</a>
      </nav>
      <!-- Menu toggle cho mobile -->
      <button class="md:hidden text-gray-300 hover:text-white focus:outline-none" @click="toggleMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <!-- Menu mobile -->
      <div v-if="isMenuOpen" class="md:hidden absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-10">
        <a href="#" class="block text-gray-300 hover:text-white py-2">Home</a>
        <a href="#" class="block text-gray-300 hover:text-white py-2">Playlist</a>
        <a href="#" class="block text-gray-300 hover:text-white py-2">Profile</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto p-4 sm:p-6">
      <UploadForm @file-uploaded="refreshMusicList" />
      <MusicList ref="musicList" />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 p-4 text-center text-gray-400">
      <p class="text-sm sm:text-base">© 2025 NamP Music App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import UploadForm from './components/UploadForm.vue'
import MusicList from './components/MusicList.vue'

export default {
  components: {
    UploadForm,
    MusicList
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    refreshMusicList() {
      this.$refs.musicList.fetchMusicList()
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
<template>
  <div class="min-h-screen bg-white text-black">
    <!-- Header -->
    <header class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-10">
      <div class="flex items-center">
        <img src="https://via.placeholder.com/40x40?text=Logo" alt="Logo" class="w-10 h-10 mr-2">
        <h1 class="text-xl font-bold text-black">NamP Music</h1>
      </div>
      <div class="hidden md:flex flex-1 mx-4">
        <input type="text" placeholder="Search for tracks, artists..." class="w-full max-w-md p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
      </div>
      <div class="flex items-center space-x-4">
        <button class="hidden md:block px-4 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition">Upload</button>
        <button class="md:hidden text-black hover:text-orange-500 focus:outline-none" @click="toggleMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <!-- Menu mobile -->
      <div v-if="isMenuOpen" class="md:hidden absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
        <a href="#" class="block text-black hover:text-orange-500 py-2">Search</a>
        <a href="#" class="block text-black hover:text-orange-500 py-2">Upload</a>
        <a href="#" class="block text-black hover:text-orange-500 py-2">Profile</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto pt-20 p-4 sm:p-6">
      <UploadForm @file-uploaded="refreshMusicList" />
      <MusicList ref="musicList" />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 p-4 text-center text-gray-600">
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
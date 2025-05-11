<template>
  <div class="min-h-screen bg-gray-50 text-black font-sans">
    <!-- Header -->
    <header class="fixed top-0 left-0 w-full bg-white shadow-sm p-3 flex items-center justify-between z-10">
      <div class="flex items-center">
        <!-- <img src="https://via.placeholder.com/40x40?text=SC" alt="Logo" class="w-8 h-8 mr-2"> -->
        <h1 class="text-lg font-bold text-black">NamP Music</h1>
      </div>
      <div class="flex-1 mx-2 sm:mx-4">
        <input 
          type="text" 
          placeholder="Search for tracks, artists..." 
          class="w-full max-w-md p-2 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        >
      </div>
      
      <!-- Menu mobile -->
      <div v-if="isMenuOpen" class="md:hidden absolute top-14 right-3 bg-white p-3 rounded-lg shadow-lg z-10">
        <a href="#" class="block text-black hover:text-orange-500 py-1 text-sm">Search</a>
        <a href="#" class="block text-black hover:text-orange-500 py-1 text-sm">Upload</a>
        <a href="#" class="block text-black hover:text-orange-500 py-1 text-sm">Profile</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto pt-16 p-3 sm:p-4">
      <UploadForm @file-uploaded="refreshMusicList" />
      <MusicList ref="musicList" />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 p-3 text-center text-gray-600">
      <p class="text-xs sm:text-sm">© 2025 NamP Music App. All rights reserved.</p>
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
  margin-top: 60px;
}
</style>
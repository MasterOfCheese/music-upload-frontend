<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
    <!-- Header -->
    <header class="bg-gray-800 shadow-lg p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold tracking-wide">NamP Music</h1>
      <nav>
        <a href="#" class="text-gray-300 hover:text-white mx-4">Home</a>
        <a href="#" class="text-gray-300 hover:text-white mx-4">Playlist</a>
        <a href="#" class="text-gray-300 hover:text-white mx-4">Profile</a>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto p-6">
      <UploadForm @file-uploaded="refreshMusicList" />
      <MusicList ref="musicList" />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 p-4 text-center text-gray-400">
      <p>&copy; 2025 NamP Music App. All rights reserved.</p>
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
  methods: {
    refreshMusicList() {
      this.$refs.musicList.fetchMusicList()
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
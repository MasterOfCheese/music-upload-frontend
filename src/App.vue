<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Music Upload App</h1>
      <UploadForm @file-uploaded="refreshMusicList" />
      <MusicList ref="musicList" />
    </div>
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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

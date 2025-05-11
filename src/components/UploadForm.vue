<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
    <h2 class="text-xl font-semibold text-black mb-3">Upload Your Music</h2>
    <div class="flex flex-col sm:flex-row items-center gap-3">
      <label class="relative cursor-pointer">
        <input 
          type="file" 
          accept=".mp3,.wav" 
          @change="handleFileChange" 
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        >
        <span class="inline-block py-2 px-4 bg-[#f50] text-white rounded-full text-sm font-semibold hover:bg-[#ff7733] transition-all duration-300">
          Choose a file to upload
        </span>
      </label>
      <button 
        @click="uploadFile" 
        :disabled="!selectedFile || isLoading" 
        class="py-2 px-4 bg-gray-200 text-black rounded-full text-sm font-semibold hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        <span v-if="!isLoading">Upload</span>
        <span v-else class="flex items-center"><i class="animate-spin mr-1">⏳</i> Uploading...</span>
      </button>
    </div>
    <p v-if="uploadMessage" class="mt-3 text-sm" :class="uploadMessage.includes('Error') ? 'text-red-500' : 'text-green-500'">{{ uploadMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedFile: null,
      uploadMessage: '',
      isLoading: false
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]
    },
    async uploadFile() {
      if (!this.selectedFile) return
      this.isLoading = true
      const formData = new FormData()
      formData.append('file', this.selectedFile)

      try {
        const response = await axios.post('https://music-upload-backend.onrender.com/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        this.uploadMessage = response.data.message
        this.selectedFile = null
        this.$emit('file-uploaded')
      } catch (error) {
        this.uploadMessage = error.response?.data?.detail || 'Error uploading file: ' + error.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
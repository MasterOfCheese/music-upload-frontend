<template>
  <div class="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 sm:mb-4">
    <h2 class="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3">Upload Your Music</h2>
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
      <input 
        type="file" 
        accept=".mp3,.wav" 
        @change="handleFileChange" 
        class="w-full sm:w-auto file:mr-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 transition-all duration-300"
      >
      <button 
        @click="uploadFile" 
        :disabled="!selectedFile || isLoading" 
        class="w-full sm:w-auto py-2 px-3 sm:px-5 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        <span v-if="!isLoading">Upload</span>
        <span v-else class="flex items-center"><i class="animate-spin mr-1">⏳</i> Uploading...</span>
      </button>
    </div>
    <p v-if="uploadMessage" class="mt-2 sm:mt-3 text-xs sm:text-sm" :class="uploadMessage.includes('Error') ? 'text-red-500' : 'text-green-500'">{{ uploadMessage }}</p>
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
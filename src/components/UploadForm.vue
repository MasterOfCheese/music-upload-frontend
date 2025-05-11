<template>
  <div class="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-200 mb-3 sm:mb-4">Upload Your Music</h2>
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <input 
        type="file" 
        accept=".mp3,.wav" 
        @change="handleFileChange" 
        class="w-full sm:w-auto file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 transition-all duration-300"
      >
      <button 
        @click="uploadFile" 
        :disabled="!selectedFile || isLoading" 
        class="w-full sm:w-auto py-2 px-4 sm:px-6 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
      >
        <span v-if="!isLoading">Upload</span>
        <span v-else class="flex items-center"><i class="animate-spin mr-2">⏳</i> Uploading...</span>
      </button>
    </div>
    <p v-if="uploadMessage" class="mt-2 sm:mt-4 text-sm" :class="uploadMessage.includes('Error') ? 'text-red-400' : 'text-green-400'">{{ uploadMessage }}</p>
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
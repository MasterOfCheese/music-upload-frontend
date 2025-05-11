<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Upload Music</h2>
    <div class="flex items-center gap-4">
      <input 
        type="file" 
        accept=".mp3,.wav" 
        @change="handleFileChange" 
        class="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      >
      <button 
        @click="uploadFile" 
        :disabled="!selectedFile" 
        class="py-2 px-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        Upload
      </button>
    </div>
    <p v-if="uploadMessage" class="mt-4 text-sm" :class="uploadMessage.includes('Error') ? 'text-red-500' : 'text-green-500'">{{ uploadMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedFile: null,
      uploadMessage: ''
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]
    },
    async uploadFile() {
      if (!this.selectedFile) return
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
        this.uploadMessage = 'Error uploading file: ' + error.message
      }
    }
  }
}
</script>
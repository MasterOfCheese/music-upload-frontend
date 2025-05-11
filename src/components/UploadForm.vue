<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-xl bg-gray-50 shadow-lg rounded-2xl p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">🎵 Upload your track</h2>
      
      <div class="mb-4">
        <input
          type="file"
          @change="handleFileUpload"
          accept=".mp3,.wav"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0 file:text-sm file:font-semibold
                 file:bg-orange-500 file:text-white hover:file:bg-orange-600
                 transition duration-200 ease-in-out"
        />
      </div>

      <div v-if="uploading" class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div class="bg-orange-500 h-2.5 rounded-full transition-all" :style="{ width: progress + '%' }"></div>
      </div>

      <button
        :disabled="!selectedFile || uploading"
        @click="upload"
        class="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold rounded-full transition duration-200 ease-in-out"
      >
        {{ uploading ? 'Uploading...' : 'Upload' }}
      </button>

      <div v-if="message" class="mt-4 text-center text-green-600 font-medium">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      uploading: false,
      progress: 0,
      message: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.message = '';
    },
    async upload() {
      if (!this.selectedFile) return;
      this.uploading = true;
      this.progress = 0;
      this.message = '';

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await fetch('https://music-upload-backend.onrender.com/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        this.message = data.message;
      } catch (err) {
        this.message = 'Upload failed. Please try again.';
      } finally {
        this.uploading = false;
        this.selectedFile = null;
        this.progress = 100;
      }
    }
  }
};
</script>

<style scoped>
/* Optional: Smooth width transition for progress bar */
div[style] {
  transition: width 0.4s ease;
}
</style>

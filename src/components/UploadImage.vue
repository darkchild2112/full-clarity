<template>
  <div>
    <div v-if="!selectedImage" class="drop-container" :class="{ 'isDragging': dragging}" v-cloak 
        @drop.prevent="addFile" 
        @dragleave.prevent="dragEnd" 
        @dragover.prevent
        @dragenter.prevent="dragOver"
        @click="triggerUpload">
    </div>
    <div v-if="selectedImage" class="selected-image">
      <img :src="selectedImage" />
    </div>
    <p>Drag &amp; drop image or click to upload</p>
    <div class="sr-only">
      <label for="imgUpload">Image upload:</label>
      <input id="imgUpload" ref="uploadEl" type="file" accept="image/*" @change="uploadImage($event)">
    </div>
  </div>
</template>

<script>

export default {
  name: 'UploadImage',
  components: {

  },
  data: () => ({
      selectedImage: null,
      dragging: false,
  }),
  methods: {
      triggerUpload() {
        this.$refs.uploadEl.click();
      },
      uploadImage(event) {

        var reader = new FileReader();

        reader.addEventListener('load', (event) => {
            this.selectedImage = event.target.result;
            this.$emit('image-selected', this.selectedImage);
        },false);
            
        reader.readAsDataURL(event.target.files[0])
      },
      addFile(event) {

        var reader = new FileReader();

        reader.addEventListener('load', (event) => {
            this.selectedImage = event.target.result;
            this.$emit('image-selected', this.selectedImage);
        },false);

        reader.readAsDataURL(event.dataTransfer.files[0])
    },
    dragOver(){
      this.dragging = true;
    },
    dragEnd() {
      this.dragging = false;
    }
  }
};
</script>

<style scoped>
    .selected-image {
      width: 144px;
      height: 144px;
      padding-top: 56px;
      margin: 0 auto;
    }

    .selected-image img {
        width: 144px;
        height: 144px;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
    }

p{
  padding: 0;
}

  /*************************/

  .drop-container {
    width: 400px;
    height: 200px;
    margin: 0 auto;

    background-image: url('../assets/images/dragImage.png');
    background-repeat: no-repeat;
    background-position: center bottom;
  }

  .drop-container.isDragging {
    background-image: url('../assets/images/dragOverImage.png');
  }

</style>
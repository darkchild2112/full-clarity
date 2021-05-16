<template>
  <div>
    <div v-if="!avatar" class="drop-container" :class="{ 'isDragging': dragging}" v-cloak 
        @drop.prevent="addFile" 
        @dragleave.prevent="dragEnd" 
        @dragover.prevent
        @dragenter.prevent="dragOver"
        @click="triggerUpload">
    </div>
    <div v-if="avatar" class="selected-image">
      <img class="remove-icon" @click="removeImage" :src="require('../assets/images/removeIcon.png')" />
      <img :src="avatar" />
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
  props: {
    selectedImage: String
  },
  data: () => ({
      avatar: null,
      dragging: false,
  }),
  created(){
    this.avatar = this.selectedImage;
  },
  methods: {
      triggerUpload() {
        this.$refs.uploadEl.click();
      },
      removeImage() {
        this.avatar = null;
        this.dragging = false;
      },
      uploadImage(event) {

        var reader = new FileReader();

        reader.addEventListener('load', (event) => {
            this.avatar = event.target.result;
            this.$emit('image-selected', this.avatar);
        },false);
            
        reader.readAsDataURL(event.target.files[0])
      },
      addFile(event) {

        var reader = new FileReader();

        reader.addEventListener('load', (event) => {
            this.avatar = event.target.result;
            this.$emit('image-selected', this.avatar);
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
      position: relative;
    }

    .selected-image img {
        width: 144px;
        height: 144px;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
    }

    .selected-image .remove-icon {
      position: absolute;
      top: 64px;
      left: 107px;
      width: 19px;
      height: 18px;
    }

    p {
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
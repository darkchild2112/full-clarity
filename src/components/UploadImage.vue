<template>
  <div class="upload-image">
    <img :src="selectedImage" />
    <input type="file" accept="image/*" @change="uploadImage($event)">
    <p>Drag &amp; drop image or click to upload</p>
  </div>
</template>

<script>

export default {
  name: 'UploadImage',
  components: {

  },
  data: () => ({
      selectedImage: null 
  }),
  methods: {
      uploadImage(event) {

        var reader = new FileReader();

        reader.addEventListener('load', (event) => {
            this.selectedImage = event.target.result;
            this.$emit('image-selected', this.selectedImage);
        },false);
            
        reader.readAsDataURL(event.target.files[0])
      }
  }
};
</script>

<style>
    .upload-image {
        border: 1px solid red;
        width: 200px;
        height: 200px;
    }

    .upload-image img {
        width: 150px;
        height: auto;
    }
</style>
<template>
  <div>
    <UploadImage :selectedImage="selectedImage" @imageSelected="$emit('image-selected', $event)" />
    <input :value="groupName" type="text" placeholder="Enter group name" @input="$emit('groupName', $event.target.value)" />
  </div>
</template>

<script>

import UploadImage from './UploadImage'

export default {
  name: 'GroupDetails',
  components: {
    UploadImage
  },
  props: {
    groupName: String,
    selectedImage: Object
  }
};
</script>

<style scoped>
  input {
    width: 400px;
    margin: 0 auto;
    display: block;
  }
</style>
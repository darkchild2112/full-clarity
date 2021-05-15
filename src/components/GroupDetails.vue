<template>
  <div>
    <UploadImage @imageSelected="$emit('image-selected', $event)" />
    <input type="text" placeholder="Enter group name" @input="$emit('groupName', $event.target.value)" />
  </div>
</template>

<script>

import UploadImage from './UploadImage'

export default {
  name: 'GroupDetails',
  components: {
    UploadImage
  },
};
</script>

<style>

</style>
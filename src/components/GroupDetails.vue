<template>
  <div>
    <UploadImage />
    <input type="text" placeholder="Enter group name" />
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
<template>
  <div class="confirmation-container">
    <img :src="imgPath" />
    <p>Group created</p>
  </div>
</template>

<script>
export default {
  name: 'GroupConfirmation',
  data: () => ({
    imgPath: require('../assets/images/Confirmation.png')
  })
};
</script>

<style lang="scss" scoped>

  .confirmation-container {
    padding-top: 100px;

    > * {
      margin: 0 auto;
      display: block;
    }

    p {
      text-align: center;
      padding-top: 20px;
      color: #96A6BE;
    }
  }
  
</style>
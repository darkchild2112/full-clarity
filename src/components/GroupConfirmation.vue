<template>
  <div class="confirmation-container">
    <img :src="imgPath" />
    <p>Group created</p>
  </div>
</template>

<script>



export default {
  name: 'GroupConfirmation',
  components: {

  },
  data: () => ({
    imgPath: require('../assets/images/Confirmation.png')
  })
};
</script>

<style>

  .confirmation-container {
    padding: 100px;
  }

  .confirmation-container > * {
      margin: 0 auto;
      display: block;
  }

  img {

  }

  p {
    text-align: center;
    padding-top: 20px;
    color: #96A6BE;
  }
</style>
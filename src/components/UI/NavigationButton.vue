<template>
  <button type="button">{{ text }}</button>
</template>

<script>

export default {
  name: 'UploadImage',
  props: {
      text: String
  },
};
</script>

<style lang="scss" scoped>
    
    button {
        background-color: #EFFAFF;
        color: #57ADD3;
        border: none;
        width: 60px;
        height: 34px;
        margin: 8px 8px 0 0;


    }

    button:disabled {
      opacity: 0.5;
    }
    
</style>
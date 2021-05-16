<template>
  <div class="modal-container">
    <div class="modal-content">
        <header class="modal-header">
            <button v-if="!showBackButton" type="button" class="btn-close">
                <span class="sr-only">Close Modal</span>
            </button>
            <button v-if="showBackButton" type="button" class="btn-back" @click="$emit('back-button-clicked')">
                <span class="sr-only">Close Modal</span>
            </button>
            <h2>{{ heading }}</h2>
            <slot name="header" />
        </header>
        <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
      heading: String,
      showBackButton: Boolean
  },
};
</script>

<style lang="scss" scoped>

    @import '../../styles/_variables.scss';

    .modal-container {
        position: fixed; 
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto;
        background-color: rgba(64, 80, 105,0.4);

        .modal-content {
            background-color: #F6F8FD;
            margin: 15% auto; 
            width: 500px; 
            min-height: 474px;
            border-radius: 5px;

            @media only screen and (max-width: $X-Small) {

                width: 95%;
            }

            .modal-header {
                background-color: #fff;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-radius: 5px 5px 0 0;

                .btn-close {
                    background-image: url('../../assets/images/close.png');
                    background-repeat: no-repeat;
                    background-position: 0 0;
                    width: 24px;
                    height: 26px;
                    border: none;
                    margin: 10px 10px;
                }

                .btn-back {
                    background-image: url('../../assets/images/Back.png');
                    background-repeat: no-repeat;
                    background-position: 0 0;
                    width: 24px;
                    height: 26px;
                    border: none;
                    margin: 12px 10px;
                    background-color: transparent;
                }

                h2 {
                    font-size: 1.13rem;
                }
            }
        }
    }
</style>
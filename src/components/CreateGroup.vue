<template>
  <div>
    <header>
        <button type="button">Close Modal</button>
        <h2>{{ heading }}</h2>
        <button type="button" @click="next">{{ nextBtnText }}</button>
    </header>
    <GroupDetails v-if="show('DETAILS')" />
    <GroupMembers v-if="show('MEMBERS')" />
    <GroupConfirmation v-if="show('CONFIRMATION')" />
  </div>
</template>

<script>

import GroupDetails from './GroupDetails';
import GroupMembers from './GroupMembers';
import GroupConfirmation from './GroupConfirmation';

const steps = { DETAILS: "DETAILS", MEMBERS: "MEMBERS", CONFIRMATION: "CONFIRMATION" };

const headings = { DETAILS: "New group", MEMBERS: "Group members", CONFIRMATION: "Group created" };

const nextBtn = { DETAILS: "Next", MEMBERS: "Save", CONFIRMATION: "Done" };

export default {
  name: 'CreateGroup',
  components: {
      GroupDetails,
      GroupMembers,
      GroupConfirmation
  },
  data() {
      return {
          currentStep: steps.DETAILS,
          currentStepIndex: 0
      }
  },
  methods: {
      show(step) {
          return this.currentStep === step;
      },
      next() {
          this.currentStepIndex++;
      }
  },
  computed: {
      heading() {
          return headings[this.currentStep];
      },
      nextBtnText() {
          return nextBtn[this.currentStep];
      }
  }
};
</script>

<style>

</style>
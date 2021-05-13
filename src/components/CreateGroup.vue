<template>
  <div>
    <header>
        <button type="button">Close Modal</button>
        <h2>{{ heading }}</h2>
        <button v-if="show('DETAILS')" type="button" @click="moveTo('MEMBERS')">Next</button>
        <button v-if="show('MEMBERS')" type="button" @click="moveTo('CONFIRMATION')">Save</button>
        <button v-if="show('CONFIRMATION')" type="button" >Done</button>
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
      }
  },
  methods: {
      show(step) {
          return this.currentStep === step;
      },
      moveTo(step) {
          this.currentStep = steps[step];
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
<template>
  <div>
    <header>
        <button type="button">Close Modal</button>
        <h2>{{ heading }}</h2>
        <button v-if="show(steps.DETAILS)" type="button" @click="moveTo(steps.MEMBERS)">Next</button>
        <button v-if="show(steps.MEMBERS)" type="button" @click="moveTo(steps.CONFIRMATION)">Save</button>
        <button v-if="show(steps.CONFIRMATION)" type="button" >Done</button>
    </header>
    <GroupDetails v-if="show(steps.DETAILS)" />
    <GroupMembers v-if="show(steps.MEMBERS)" :contacts="contacts" />
    <GroupConfirmation v-if="show(steps.CONFIRMATION)" />
  </div>
</template>

<script>

import GroupDetails from './GroupDetails';
import GroupMembers from './GroupMembers';
import GroupConfirmation from './GroupConfirmation';

import { getContacts } from '../services/ContactsService';

const headings = { DETAILS: "New group", MEMBERS: "Group members", CONFIRMATION: "Group created" };

export default {
  name: 'CreateGroup',
  components: {
      GroupDetails,
      GroupMembers,
      GroupConfirmation
  },
  data() {
      return {
          currentStep: null,
          steps: { DETAILS: "DETAILS", MEMBERS: "MEMBERS", CONFIRMATION: "CONFIRMATION" },
          contacts: [],
      }
  },
  async created() {
      this.currentStep = this.steps.DETAILS;

      // TODO: Add try/catch
      this.contacts = await getContacts();
  },
  methods: {
      show(step) {
          return this.currentStep === step;
      },
      moveTo(step) {
          this.currentStep = this.steps[step];
      }
  },
  computed: {
      heading() {
          return headings[this.currentStep];
      },
  }
};
</script>

<style>

</style>
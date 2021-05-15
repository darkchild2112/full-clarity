<template>
  <div>
    <header>
        <button type="button">Close Modal</button>
        <h2>{{ heading }}</h2>
        <button v-if="show(steps.DETAILS)" type="button" 
            @click="moveTo(steps.MEMBERS)" :disabled="!groupDetailsValid">Next</button>
        <button v-if="show(steps.MEMBERS)" type="button" 
            @click="moveTo(steps.CONFIRMATION)" :disabled="!groupMembersValid">Save</button>
        <button v-if="show(steps.CONFIRMATION)" type="button" >Done</button>
    </header>
    <GroupDetails v-if="show(steps.DETAILS)" 
        @groupName="groupName = $event" 
        @imageSelected="groupAvatar = $event"  />
    <GroupMembers v-if="show(steps.MEMBERS)" :contacts="contacts" 
        @selectedContact="updateSelectedContacts($event)" />
    <GroupConfirmation v-if="show(steps.CONFIRMATION)" />
  </div>
</template>

<script>

import GroupDetails from './GroupDetails';
import GroupMembers from './GroupMembers';
import GroupConfirmation from './GroupConfirmation';

import { getContacts, createContactGroup } from '../services/ContactsService';

const headings = { DETAILS: "New group", MEMBERS: "Group members", CONFIRMATION: "Group created" };

export default {
  name: 'CreateGroup',
  components: {
      GroupDetails,
      GroupMembers,
      GroupConfirmation
  },
  data: () => ({currentStep: null,
    steps: { DETAILS: "DETAILS", MEMBERS: "MEMBERS", CONFIRMATION: "CONFIRMATION" },
    contacts: [],
    groupName: '',
    groupAvatar: null,
    selectedContacts: []
  }),
  async created() {
      this.currentStep = this.steps.DETAILS;

      // TODO: Add try/catch
      this.contacts = await getContacts();
  },
  methods: {
      show(step) {
          return this.currentStep === step;
      },
      async moveTo(step) {

          if(step === this.steps.CONFIRMATION)
          {
              const newGroup = { 
                  name: this.groupName,
                  avatar: this.groupAvatar,
                  members: this.selectedContacts.map(c => c.id)
              };

              try{
                  await createContactGroup(newGroup);
              }
              catch(err) {
                  // TODO: this needs to be presented to the user in a better way
                  console.error(err);
              }
          }

          this.currentStep = this.steps[step];
      },
      updateSelectedContacts(contacts){
          this.selectedContacts = contacts;
      }
  },
  computed: {
      heading() {
          return headings[this.currentStep];
      },
      groupDetailsValid(){ 
          return this.groupName !== '' && this.groupAvatar !== null;
      },
      groupMembersValid(){
          return this.selectedContacts.length > 0;
      }
  }
};
</script>

<style>

</style>
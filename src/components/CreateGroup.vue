<template>
  <Modal :heading="heading">
    <template v-slot:header>
        <NavBtn v-if="show(steps.DETAILS)" @click="moveTo(steps.MEMBERS)" :disabled="!groupDetailsValid" text="Next" />
        <NavBtn v-if="show(steps.MEMBERS)" @click="moveTo(steps.CONFIRMATION)" :disabled="!groupMembersValid" text="Save" />
        <NavBtn v-if="show(steps.CONFIRMATION)" text="Done" />
    </template>
    <GroupDetails v-if="show(steps.DETAILS)" 
        @groupName="groupName = $event" 
        @imageSelected="groupAvatar = $event"  />
    <GroupMembers v-if="show(steps.MEMBERS)" :contacts="contacts" 
        @selectedContact="updateSelectedContacts($event)" />
    <GroupConfirmation v-if="show(steps.CONFIRMATION)" />
  </Modal>
</template>

<script>

import GroupDetails from './GroupDetails';
import GroupMembers from './GroupMembers';
import GroupConfirmation from './GroupConfirmation';
import NavBtn from './UI/NavigationButton';

import Modal from './UI/Modal'

import { getContacts, createContactGroup } from '../services/ContactsService';

const headings = { DETAILS: "New group", MEMBERS: "Group members", CONFIRMATION: "Group created" };

export default {
  name: 'CreateGroup',
  components: {
      GroupDetails,
      GroupMembers,
      GroupConfirmation,
      Modal, 
      NavBtn
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
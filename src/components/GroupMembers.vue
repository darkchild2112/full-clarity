<template>
  <div>
    <input type="text" placeholder="Search" @input="filterContacts($event)" />
    <ul>
      <li v-for="contact in displayedContacts" :key="contact.id">
        <img :src="contact.avatar" :alt="`${contact.fullName}'s profile picture`" />
        <h3>{{ contact.fullName }}</h3>
        <button type="button" v-if="!contains(contact)" 
          @click="addContact(contact)">Add {{ contact.fullName }}</button>
        <button type="button" v-if="contains(contact)" 
          @click="removeContact(contact)">Remove {{ contact.fullName }}</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'GroupMembers',
  components: {

  },
  props: {
    contacts: Array
  },
  data: () => ({
      selectedContacts: [],
      displayedContacts: [],
  }),
  created(){
      this.displayedContacts = this.contacts;
  },
  methods: {
    addContact(contact){
      this.selectedContacts = [contact, ...this.selectedContacts];

      // TODO: Emit the currenct list
    },
    removeContact(contact){
      this.selectedContacts = this.selectedContacts.filter(c => c.id !== contact.id);

      // TODO: Emit the currenct list
    },
    filterContacts(event){

      this.displayedContacts = event.target.value !== '' ? 
        this.contacts.filter(c => c.searchableName.startsWith(event.target.value)) : 
        this.contacts;
    },
    contains(contact) {
      const result = this.selectedContacts.filter(c => c.id === contact.id);

      return result.length > 0;
    }
  },
};
</script>

<style>

</style>
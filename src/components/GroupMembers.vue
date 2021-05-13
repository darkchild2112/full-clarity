<template>
  <div>
    <input type="text" placeholder="Search" />
    <ul>
      <li v-for="contact in contacts" :key="contact.id">
        <img :src="contact.avatar" :alt="`${getFullName(contact)}'s profile picture`" />
        <h3>{{ getFullName(contact) }}</h3>
        <button type="button" v-if="!contains(contact)" @click="addContact(contact)">Add {{ getFullName(contact) }}</button>
        <button type="button" v-if="contains(contact)" @click="removeContact(contact)">Remove {{ getFullName(contact) }}</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'GroupMembers',
  components: {

  },
  data(){
    return {
      selectedContacts: []
    };
  },
  props: {
    contacts: Array
  },
  methods: {
    getFullName(contact) {
      return `${contact.first_name} ${contact.last_name}`;
    },
    addContact(contact){
      this.selectedContacts = [contact, ...this.selectedContacts];

      // TODO: Emit the currenct list
    },
    removeContact(contact){
      this.selectedContacts = this.selectedContacts.filter(c => c.id !== contact.id);

      // TODO: Emit the currenct list
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
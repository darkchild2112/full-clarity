<template>
  <div>
    <div class="search-container">
      <img class="search-icon" :src="require('../assets/images/Search.png')" />
      <input type="text" placeholder="Search" @input="filterContacts($event)" />
      <img class="close-icon" :src="require('../assets/images/close.png')" />
    </div>
    <ul class="contact-list">
      <li v-for="contact in displayedContacts" :key="contact.id">
        <img :src="contact.avatar" :alt="`${contact.fullName}'s profile picture`" />
        <h3>{{ contact.fullName }}</h3>
        <button type="button" v-if="!contains(contact)" class="btn-add"
          @click="addContact(contact)"><span class="sr-only">Add {{ contact.fullName }}</span></button>
        <button type="button" v-if="contains(contact)" class="btn-remove"
          @click="removeContact(contact)">
            <span class="sr-only">Remove {{ contact.fullName }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>

const selectedContactsEventName = "selected-contact";

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

      this.$emit(selectedContactsEventName, this.selectedContacts);
    },
    removeContact(contact){
      this.selectedContacts = this.selectedContacts.filter(c => c.id !== contact.id);

      this.$emit(selectedContactsEventName, this.selectedContacts);
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

<style scoped>

  .search-container {
    padding: 20px 20px 20px 20px;
    display: flex;
    position: relative;
  }

  .search-container img.search-icon {
    position: absolute;
    top: 38px;
    left: 36px;
  }

  .search-container img.close-icon {
    position: absolute;
    top: 34px;
    right: 32px;
  }

  .search-container input {
    width: 100%;
    padding-left: 42px;
    padding-right: 42px;
  }

  .contact-list {
    list-style: none;
    padding: 15px 20px;
    margin: 0;
    background-color: #F3F5FB;
  }

  .contact-list li {
    display: flex;
    align-items:center;
    padding: 0 0 20px 0;
  }

  .contact-list li:last-child {
    padding-bottom: 0;
  }

  .contact-list img {
    width: 48px;
    border-radius: 50%; /* perfect circle */
    height: 48px; /* some images arn't scaling correctly without this */
  }

  .contact-list h3 {
    margin: 0;
    color: #405069;
    font-size: 0.875rem; /* 14px */
    margin-left: 20px;
  }

  .contact-list button {
    margin-left: auto; /* pushes it over to the right */

    width: 25px;
    height: 25px;
    border: none;
    
    background-repeat: no-repeat;
    background-position: 0 0;
  }

  .contact-list button.btn-add {
    background-image: url('../assets/images/add.png');
  }

  .contact-list button.btn-remove {
    background-image: url('../assets/images/remove.png');
  }

</style>
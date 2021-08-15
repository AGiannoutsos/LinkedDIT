<template>
  <q-page class="column wrap items-stretch justify-start content-center">


    <form @submit.prevent="searchSubmit" class="q-pa-xl">

      <q-input
          v-model="searchText"
          filled
          label="Search for Users"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
      </q-input>
    </form>

    <q-dialog v-model="fixed">
      <q-card>
        <q-card-section class="row items-center q-pb-md">
          <div class="text-h6">Search Results</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div v-for="(item, index) in searchUserResults" :key="index" class="q-pa-md">
            <UserCard :user="item" ></UserCard>
          </div>
        </q-card-section>

      </q-card>
    </q-dialog>

    <div class="fit row wrap items-start justify-center content-center">

      <div v-for="(item, index) in connectedUsers" :key="index" class="q-pa-md">
        <UserCard :user="item"> {{item}}</UserCard>
      </div>
    </div>


  </q-page>
</template>

<script>
import UserCard from 'src/components/UserCard.vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"

export default defineComponent({
  name: 'NetworkPage',
  components: { UserCard },
   
  setup () {
  return {    

  }
  },

  data() {
    return{
      searchText: "",
      fixed: false,
    }
  },

  methods: {
    ...mapActions(["getConnectedUsers", "postSearchResults"]),
    searchSubmit: function() {
      console.log("SEARCH FORM", this.searchText.split(" ")[1])

      var postSearchResultsForm = {
        firstName: this.searchText.split(" ")[0],
        lastName: this.searchText.split(" ")[1] ? this.searchText.split(" ")[1] : ""
      }

      this.postSearchResults(postSearchResultsForm)

      this.fixed = true
      this.searchText = ""
    },
  },

  created() {
    this.getConnectedUsers()
  },

  computed:{
      ...mapGetters({
      connectedUsers: "connectedUsers",
      searchUserResults: "searchUserResults",
    }),
  },

})
</script>

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
        <q-card-section>
          <div class="text-h6">Search Results</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div v-for="(item, index) in searchUserResults" :key="index" class="q-pa-lg">
            <UserCard :user="item" :connected="false"></UserCard>
          </div>
        </q-card-section>

      </q-card>
    </q-dialog>

    <div class="fit row wrap items-start justify-center content-center">

      <div v-for="(item, index) in connectedUsers" :key="index" class="q-pa-lg">
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
    searchSubmit: function() {
      console.log("SEARCH FORM", this.searchText)
      this.fixed = true
      this.searchText = ""
    },
  },

  computed:{
      ...mapGetters({
      connectedUsers: "connectedUsers",
      user: "user",
      searchUserResults: "searchUserResults",
    }),
  },

})
</script>

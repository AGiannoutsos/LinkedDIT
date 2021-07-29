<template>
  <q-page class="fit row wrap justify-evenly items-center content-center">
     <q-card class="connection-card">
        <q-card-section>
          <div class="text-h6">Connection Requests</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 400px" class="scroll">
          <div v-for="(item, index) in connectionRequests" :key="index" class="q-pa-none">
            <UserCard :user="item" :acceptConnection="true"></UserCard>
          </div>
        </q-card-section>

      </q-card>

      <q-card class="actions-card">
        <q-card-section>
          <div class="text-h6">Latest Interactions</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 400px" class="scroll">
          <div v-for="(item, index) in interactions" :key="index" class="q-pa-none">
            <UserCard :user="item.user" :interactions="item.interaction" ></UserCard>
          </div>
        </q-card-section>

      </q-card>
  </q-page>
</template>

<script>
import UserCard from 'src/components/UserCard.vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"

export default defineComponent({
  name: 'NotificationsPage',
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
    ...mapActions(["getConnectionRequests", "getInteractions"]),

  },

  created() {
    this.getConnectionRequests()
    this.getInteractions()
  },

  computed:{
      ...mapGetters({
      connectionRequests: "connectionRequests",
      interactions: "interactions",
    }),
  },

})
</script>

<style lang="sass" scoped>
.connection-card
  min-height: 400px
.actions-card
  min-height: 400px
</style>
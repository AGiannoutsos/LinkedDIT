<template>
 <div class="user-card">
  <q-card class="user-card">
    <q-card-section horizontal>
      <q-item>
        <q-item-section avatar horizontal>
            <q-avatar>
              <img :src="user.avatar">
            </q-avatar>
          </q-item-section>

          <q-item-section horizontal>
            <q-item-label>{{ user.firstName+' '+user.lastName }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <q-separator vertical />
          <q-item-section vertical>
            <q-card-actions align="around" vertical>
              <q-btn flat>View Profile</q-btn>
              <q-btn flat>Chat</q-btn>
            </q-card-actions>
          </q-item-section> -->

        <q-card-actions horizontal class="justify-around">
            <q-btn flat round color="blue" icon="visibility" @click="personalDataPop = true; "> 
              <q-tooltip :delay="500" class="bg-accent">View User's profile</q-tooltip> 
            </q-btn>
            <q-btn flat round color="blue" icon="chat">
              <q-tooltip :delay="500" class="bg-accent">Start a Conversation</q-tooltip>
            </q-btn>
            <q-btn flat round color="blue" icon="person_add" v-if="!connected">
              <q-tooltip :delay="500" class="bg-accent">Add User to your Network</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card-section>

        <q-dialog v-model="personalDataPop" >
          <q-card>
            <PersonalData :ownUser="false" :personalData="user.personalData"> </PersonalData>
          </q-card>
        </q-dialog>

    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from "vuex"
import PersonalData from './PersonalData.vue'


export default defineComponent({
  components: { PersonalData },
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    connected: {
      type: Boolean,
      default: true
    },
  },

  data(){
    return{
      personalDataPop: false,
      currentUser: {},
    }
  },

  setup () {  
    // console.log(this.post)
    return {

    }
  },

  methods: {

    
  },

  computed:{
    ...mapGetters({
      // user: "user",
    }),
  },

})
</script>

<style lang="sass" scoped>
.user-card
  width: 100%
  max-width: 600px
</style>
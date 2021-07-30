<template>
 <div class="user-card">
  <q-card square class="user-card">
    <q-card-section horizontal class="justify-between items-center">
      <q-card-section horizontal class="justify-left items-center q-pa-none">
        <q-checkbox v-if="admin" v-model="val" @click="checkSelected" />
          <q-item>
            <q-item-section avatar horizontal>
                <q-avatar>
                  <img :src="user.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section horizontal>
                <q-item-label>{{ user.firstName+' '+user.lastName }}</q-item-label>
                <q-item-label caption>
                {{user.personalData[0].content}}
              </q-item-label>
              </q-item-section>


              <q-item-section v-if="interactions !== '' " >
                <q-btn disabled flat round color="teal" icon="thumb_up" v-if="interactions === 'like'"> 
                  <q-tooltip :delay="500" class="bg-accent">User liked your post</q-tooltip> 
                </q-btn>
                <q-btn disabled flat round color="teal" icon="comment" v-if="interactions === 'comment'">
                  <q-tooltip :delay="500" class="bg-accent">User commented to your post</q-tooltip>
                </q-btn>
                <q-btn disabled flat round color="teal" icon="work" v-if="interactions === 'apply'">
                  <q-tooltip :delay="500" class="bg-accent">User applied for a job proposal</q-tooltip>
                </q-btn>
              </q-item-section>

            </q-item>
        </q-card-section>

        <!-- <q-separator vertical />
          <q-item-section vertical>
            <q-card-actions align="around" vertical>
              <q-btn flat>View Profile</q-btn>
              <q-btn flat>Chat</q-btn>
            </q-card-actions>
          </q-item-section> -->

        <q-card-actions align="right" >
            <q-btn flat round color="blue" icon="visibility" @click="personalDataPop = true; "> 
              <q-tooltip :delay="500" class="bg-accent">View User's profile</q-tooltip> 
            </q-btn>
            <q-btn flat round color="blue" icon="chat" v-if="!admin" @click="startDiscussion(user.id)">
              <q-tooltip :delay="500" class="bg-accent">Start a Discussion</q-tooltip>
            </q-btn>
            <q-btn flat round color="blue" icon="person_add" v-if="!user.connected && !admin && !acceptConnection">
              <q-tooltip :delay="500" class="bg-accent">Add User to your Network</q-tooltip>
            </q-btn>
            <q-btn flat round color="green" icon="person_add" v-if="!user.connected && !admin && acceptConnection" @click="respondConnectionRequest({id:user.id, answer:'accept'})">
              <q-tooltip :delay="500" class="bg-accent">Accept Connection to your Network</q-tooltip>
            </q-btn>
            <q-btn flat round color="red" icon="person_remove" v-if="!user.connected && !admin && acceptConnection" @click="respondConnectionRequest({id:user.id, answer:'reject'})">
              <q-tooltip :delay="500" class="bg-accent">Reject Connection to your Network</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card-section>

        <q-dialog v-model="personalDataPop" >
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Personal Data</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
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
    admin: {
      type: Boolean,
      default: false
    },
    acceptConnection: {
      type: Boolean,
      default: false
    },
    interactions: {
      type: String,
      default: ""
      },
  },

  data() {
    return{
      personalDataPop: false,
      currentUser: {},
      val: false,
    }
  },

  setup () {  
    // console.log(this.post)
    return {

    }
  },

  methods: {
    ...mapActions(["selectUser", "getDiscussionId", "respondConnectionRequest"]),
    checkSelected: function () {
      this.selectUser(this.user.id)
    },

    startDiscussion: function(otherUserId){
      var discussionId = this.getDiscussionId(otherUserId)
      console.log(discussionId)
      discussionId = "100021"
      this.$router.push({name:"discussions", params:{id:"100021"}})
    }
    
  },

  computed:{
    ...mapGetters({
    }),

  },

})
</script>

<style lang="sass" scoped>
.user-card
  width: 100%
  max-width: 600px
</style>
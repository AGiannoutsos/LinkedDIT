<template>
  <q-page class="fit row wrap justify-center items-stretch content-center">
    <div class="q-pa-none">
      <q-card flat class="contacts-card">

        <q-card-section>
          <div class="text-h6">Contacts</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="width:350px; height:500px " class="scroll q-pa-none">
          <q-scroll-area style="width:350px; height:500px">
            <div v-for="(item, index) in discussionOtherUsers()" :key="index" class="q-pa-none">
              <UserCard :user="item" ></UserCard>
            </div>
          </q-scroll-area>
        </q-card-section>

      </q-card>
    </div>
    
    <div class="q-pa-none">
      <q-card flat class="messages-card" v-if="thisDiscussion.messages.length != 0">

        <q-card-section>
          <div class="text-h6">{{thisDiscussionName}}</div>
        </q-card-section>

        <q-separator />

        <!-- <q-card-section style="max-height: 700px; max-width: 600px" class="scroll"> -->
        <q-card-section style=" min-width:450px; height:430px;" class="q-pa-md" >
        <q-scroll-area style="max-width:900px; height:430px" id="message_scroller" class="scroll" >
            <div class="q-pa-md row justify-center items-stretch">
              <div style="width: 100%; max-width: 500px">
                <div v-for="(item, index) in thisDiscussion.messages" :key="index">
                  <q-chat-message
                    :avatar="item.user.avatar"
                    :text="[item.content.text]"
                    :sent="user.id===item.user.id"
                  />
                </div>
              </div>
            </div>
          </q-scroll-area>

        </q-card-section>

        <!-- <q-separator /> -->
      <q-form @submit.prevent="sendMessage_">
        <q-input flat v-model="textMessage" label="Message" class="q-pa-md">
          <template v-slot:append>
            <q-btn
              icon="send"
              type="submit"
              color="blue"
              round
              @click="sendMessage_"
              :disable="textMessage===''"
            ></q-btn>
          </template>
        </q-input>
      </q-form>



      </q-card>
    </div>
  </q-page>
</template>

<script>
import UserCard from 'src/components/UserCard.vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"
import { scroll } from 'quasar'

export default defineComponent({
  name: 'DiscussionsPage',
  components: { UserCard },
   
  setup () {
  return {    

  }
  },

  data() {
    return{
      searchText: "",
      textMessage: "",
      fixed: false,
    }
  },

  created() {
    this.getUser()
    this.getDiscussions()
    console.log(this.$route.params.id)
  },

  methods: {
    ...mapActions(["getDiscussions", "sendMessage", "getUser"]),
    sendMessage_: function() {
      console.log("SEND MESSAGE", this.textMessage)

      let message = {
        id: this.$route.params.id,
        message: {
          user: this.user,
          content: {
            text: this.textMessage,
          }
        }
      }

      this.sendMessage(message)

      this.textMessage = ""

      // const { getScrollTarget } = scroll

      // let objDiv = document.getElementById("message_scroller")
      // objDiv.scrollTop = objDiv.scrollHeight
      
      // console.log(getVerticalScrollPosition(getScrollTarget(document.getElementById("message_scroller"))))
    },

    // scroll: function (source, position) {
    //   const { setScrollPosition } = scroll
    //   this.$refs[source].setScrollPosition(position)
    // },

    // onScrollFirst: function ({ verticalPosition }) {
    //   this.position = verticalPosition + 200
    //   this.scroll('first', 20)
    //   console.log(this.position)
    // },
  },

  computed:{
      ...mapGetters({
      discussions: "discussions",
      user: "user",
      myUserId: "myUserId",
      discussionOtherUsers: "discussionOtherUsers",
    }),
    thisDiscussion: function() {
      var disc = this.discussions.find(d => d.id === this.$route.params.id) 
      return  disc ? disc : {messages: []}
    },
    thisDiscussionName: function() {
      if (this.thisDiscussion.user1.id === this.myUserId){
        return this.thisDiscussion.user2.firstName+' '+this.thisDiscussion.user2.lastName
      } else {
        return this.thisDiscussion.user1.firstName+' '+this.thisDiscussion.user1.lastName
      }
    },
  },

})
</script>

<style lang="sass" scoped>
.contacts-cardd
  height: 500px
.messages-card
  height: 500px
  width: 100%
</style>

<template>
 <div class="my-card">
  <q-card class="my-card">
    <q-item>
      <q-item-section avatar>
          <q-avatar>
            <img :src="post.user.avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ post.user.first_name+' '+post.user.last_name }}</q-item-label>
          <q-item-label caption>
            {{post.date}}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section v-if="post.content.text" class="q-pa-md">
        {{ post.content.text }}
      </q-card-section>

      <q-card-section v-if="post.content.file.type === 'file'" class="q-pa-md">
        <q-btn
            color="primary"
            icon-right="archive"
            :label="post.content.file.url.split('/').pop()"
            no-caps
            @click="downloadFile"
          />
      </q-card-section>

      <q-card-section v-else-if="post.content.file.type === 'image'" class="q-pa-md" align="center">
        <q-img
        :src="post.content.file.url"
        spinner-color="white"
        style="max-height: 300px; max-width: 550px"
        />
      </q-card-section>

      <q-card-section v-else-if="post.content.file.type === 'video'" class="q-pa-md" align="center">
        <!-- <q-video
        :ratio="16/9"
        :src="post.content.file.url"
        spinner-color="white"
        style="max-height: 300px; max-width: 550px"
        /> -->

        <video width="550" height="300" controls  preload="none">
          <source :src="post.content.file.url" type="video/mp4" autostart="0"> Your browser does not support the video tag.
        </video>

        <!-- <q-media-player
        type="video"
        background-color="black"
        :muted="true"
        radius="1rem"
        :autoplay="true"
        :show-big-play-button="true"
        :sources="{src: post.content.file.url, type: 'video/mp4'}">
        </q-media-player> -->

        

      </q-card-section>


      <!-- POST -->

      <q-card-actions align="left" class="q-pa-sm" v-if="isPost">
        <q-btn flat round color="blue" @click="post.likes.find(u => u.id === user.id) ? postThumbsUp({id:post.id, thumbs:'down'}) : postThumbsUp({id:post.id, thumbs:'up'})" 
                                        :icon="post.likes.find(u => u.id === user.id) ? 'thumb_up' : 'thumb_up_off_alt'" :disable="mine"/>
        <div class="text-capitalize">
          <q-btn flat class="text-caption" :label="'Liked by '+post.likes.length" @click="likedPop = true"/>
        </div>

        <q-dialog v-model="likedPop">
          <q-card>
            <q-card-section style="max-height: 50vh" class="scroll">
              <div v-for="(item, index) in post.likes" :key="index" class="q-pa-md">
                <UserCard :user="item" ></UserCard>
              </div>
            </q-card-section>

          </q-card>
        </q-dialog>
      </q-card-actions>

      <!-- JOB PROPOSAL -->

      <q-card-actions align="left" class="q-pa-sm" v-else>
        <q-btn flat label="Apply" color="blue" @click="post.likes.find(u => u.id === user.id) ? postApplyUp({id:post.id, apply:'down'}) : postApplyUp({id:post.id, apply:'up'})" 
                                                :icon="post.likes.find(u => u.id === user.id) ? 'work' : 'work_outline'" :disable="mine" />
        <div class="text-capitalize">
          <q-btn flat class="text-caption" :label="'Applicants '+post.likes.length" @click="likedPop = true"/>
        </div>

        <q-dialog v-model="likedPop">
          <q-card>
            <q-card-section style="max-height: 50vh" class="scroll">
              <div v-for="(item, index) in post.likes" :key="index" class="q-pa-md">
                <UserCard :user="item" ></UserCard>
              </div>
            </q-card-section>

          </q-card>
        </q-dialog>
      </q-card-actions>

      <q-card-section class="q-pa-none" v-if="isPost">

        <q-separator />

        <q-card-section class="q-pa-md" v-if="post.comments.length != 0">
          <q-scroll-area style="height: 200px; max-width: 600px;">
            <div class="q-pa-md row justify-center items-stretch">
              <div style="width: 100%; max-width: 500px">
                <div v-for="(item, index) in post.comments" :key="index">
                  <q-chat-message
                    :name="item.user.first_name+' '+item.user.last_name"
                    :avatar="item.user.avatar"
                    :text="[item.content.text]"
                    :sent="myUserId===item.user.id"
                  />
                </div>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-separator />

        <q-input v-model="commentText" label="Post a Comment here" autogrow class="q-pa-sm">
          <template v-slot:append>
            <q-btn
              type="submit"
              label="Comment"
              color="teal"
              @click="postComment_"
              :disable="commentText===''"
            ></q-btn>
          </template>
        </q-input>

      </q-card-section>


    </q-card>
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from "vuex"
import { exportFile, useQuasar } from 'quasar'
import UserCard from './UserCard.vue'
import axios from 'axios'

export default defineComponent({
  components: { UserCard },
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    },
    isPost: {
      type: Boolean,
      default: true
    },
    mine: {
      type: Boolean,
      default: false
    },
  },

  data(){
    return{
      commentText: "",
      likedPop: false,
    }
  },

  setup () {  
    // console.log(this.post)
    const $q = useQuasar()
    return {

    }
  },

  methods: {
    ...mapActions(["getUser", "postComment", "postThumbsUp", "postApplyUp"]),
    postComment_: function() {
      console.log("POST COMMENT", this.commentText)

      let comment = {
        id: this.post.id,
        comment: {
          user: this.userLight,
          content: {
            text: this.commentText,
          }
        }
      }

      this.postComment(comment)

      this.commentText = ""
    },

    downloadFile: function () {
      const $q = useQuasar()
      // naive encoding to csv format
      // const content = ["aa"]

      // const status = exportFile(this.post.content.file.url.split('/').pop(), content)

      // if (status !== true) {
      //   $q.notify({
      //     message: 'Browser denied file download...',
      //     color: 'negative',
      //     icon: 'warning'
      //   })
      // }

      // taken from https://morioh.com/p/f4d331b62cda
      axios({
          url: this.post.content.file.url,
          method: 'GET',
          responseType: 'blob',
      }).then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', this.post.content.file.url.split('/').pop());
            document.body.appendChild(fileLink);

            fileLink.click();
      });
    }
  },

  // created() {
  //   this.getUser()
  // },

  computed:{
        ...mapGetters({
        myUserId: "myUserId",
        user: "user",
        userLight: "userLight",
	    }),
  },

})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>
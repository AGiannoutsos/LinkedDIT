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
          <q-item-label>{{ post.user.firstName+' '+post.user.lastName }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section v-if="post.content.text" class="q-pa-md">
        {{ post.content.text }}
      </q-card-section>

      <q-card-section v-if="post.content.file" class="q-pa-md">
        <q-btn
            color="primary"
            icon-right="archive"
            :label="post.content.file.name"
            no-caps
            @click="downloadFile"
          />
      </q-card-section>

      <q-card-actions align="left">
        <q-btn flat round color="red" icon="favorite" />
      </q-card-actions>

      <q-separator />

      <q-card-section class="q-pa-md" v-if="post.comments.length != 0">
        <q-scroll-area style="height: 200px; max-width: 600px;">
          <div class="q-pa-md row justify-center items-stretch">
            <div style="width: 100%; max-width: 500px">
              <div v-for="(item, index) in post.comments" :key="index">
                <q-chat-message
                  :name="item.user.firstName+' '+item.user.lastName"
                  :avatar="item.user.avatar"
                  :text="[item.content.text]"
                  :sent="user.id===item.user.id"
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
            label="Post"
            color="teal"
            @click="postComment_"
            :disable="commentText===''"
          ></q-btn>
        </template>
      </q-input>


    </q-card>
 </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from "vuex"
import { exportFile, useQuasar } from 'quasar'

export default defineComponent({
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    },
  },

  data(){
    return{
      commentText: "",
    }
  },

  setup () {  
    // console.log(this.post)
    const $q = useQuasar()
    return {

    }
  },

  methods: {
    ...mapActions(["postComment"]),
    postComment_: function() {
      console.log("POST COMMENT", this.commentText)

      let comment = {
        id: this.post.id,
        comment: {
          user: this.user,
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
      const content = ["aa"]

      const status = exportFile(
        this.post.content.file.name,
        content,
        'text/csv'
      )

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  },

    computed:{
        ...mapGetters({
		    user: "user",
	    }),
  },

})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>
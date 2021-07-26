<template>
  <q-page class="column wrap items-stretch justify-start content-center">
    
      <form @submit.prevent="postSubmit" class="q-pa-xl">
        <!-- <div class="row q-rcol-gutter-y-md"> -->

        <!-- <div class="column wrap items-stretch justify-center content-center"> -->
          <q-input
            v-model="text"
            filled
            label="Write your thoughts here"
            autogrow
            class="q-pa-sm"
          />
        <!-- </div> -->

        <div class="row wrap items-center justify-center content-center">
          <q-file
            v-model="file"
            label="Upload file"
            filled
            class="q-pa-sm"
            style="max-width: 200px"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

        <q-btn
          type="submit"
          label="Post"
          color="teal"
          :disable="text==='' && file===null"
        >
        </q-btn>
        </div>
      </form>

    <q-separator size="2px" />

    <!-- <div class="column wrap items-center"> -->
      <q-infinite-scroll @load="onLoad" :offset="250">
        <div v-for="(item, index) in posts" :key="index" class="q-pa-lg">
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p> -->
          <Post :post="item"></Post>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    <!-- </div> -->
  </q-page>
</template>

<script>
import Post from 'src/components/Post.vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"

export default defineComponent({
  components: { Post },
  name: 'WallPage',

    setup () {
    const items = ref([ {},
                        {}, 
                        {}, 
                        {}, 
                        {}, 
                        {}, 
                        {} ])
    
    return {
      text: ref(""),
      file: ref(null),
      items,
      onLoad (index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    }
  },
  created() {
    console.log("WALL PAGE", this.posts)
  },

  methods: {
    ...mapActions(["postPost"]),
    postSubmit: function() {
      console.log("POST FORM", this.text, this.file)


      let post = {
          id: Math.random().toString(),
          user: this.user,
          content: {
              text: this.text,
              file: this.file,
          },
          comments: [],
      }

      this.postPost(post)
      this.text = ""
      this.file = null
    },
  },

  computed:{
        ...mapGetters({
		    posts: "posts",
        user: "user"
	    }),
  },

})
</script>

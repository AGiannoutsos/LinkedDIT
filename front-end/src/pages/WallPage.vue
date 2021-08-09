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


    <q-btn-toggle
      v-model="postsToggle"
      spread
      no-caps
      flat
      toggle-color="blue"
      color="white"
      text-color="grey"
      :options="[
        {label: 'Recommended Posts', value: 'Other Posts'},
        {label: 'Mine Posts', value: 'My Posts'}
      ]"
    />

    <q-separator size="2px" />

    <!-- <div class="column wrap items-center"> -->
      <q-infinite-scroll @load="onLoad" :offset="20">
        <div v-for="(item, index) in postsToggle === 'Other Posts' ? posts : myPosts" :key="index" class="q-pa-lg">
          <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p> -->
          <Post :post="item" :mine="postsToggle === 'My Posts'"></Post>
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
    
    return {
      text: ref(""),
      file: ref(null),
      
    }
  },

  data() {
    return {
      items: [],
      postsToggle: "Other Posts",
    }
  },

  created() {
    // // this.getRecommendedPosts()
    this.getMyPosts()
    this.getUser()
  },

  methods: {
    ...mapActions(["getUser", "postPost", "getRecommendedPosts", "getMyPosts"]),

    onLoad: function (index, done) {
        setTimeout(() => {
        if (this.postsToggle === "Other Posts")
          this.getRecommendedPosts()
        // else
        //   this.getMyPosts()
        // this.items.push(...this.posts)

        done()
       }, 2500)
    },


    postSubmit: function() {
      console.log("POST FORM", this.text, this.file)


      let post = {
          id: Math.random().toString(),
          date: Date().toString().replace(/\w+ (\w+) (\d+) (\d+).*/,'$2 $1 $3'),
          user: this.user,
          likes: [],
          content: {
            text: this.text,
            file: {
              type: "",
              url: "",
            },
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
		    myPosts: "myPosts",
        user: "user"
	    }),
  },

})
</script>

<template>
  <q-page class="column wrap items-stretch justify-start content-center">
    
      <form @submit.prevent="proposalSubmit" class="q-pa-xl">
        <!-- <div class="row q-rcol-gutter-y-md"> -->

        <!-- <div class="column wrap items-stretch justify-center content-center"> -->
          <q-input
            v-model="text"
            filled
            label="Write your Job Proposal here"
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
        v-model="proposalsToggle"
        spread
        no-caps
        flat
        toggle-color="blue"
        color="white"
        text-color="grey"
        :options="[
          {label: 'Other Proposals', value: 'Other Proposals'},
          {label: 'My Proposals', value: 'My Proposals'}
        ]"
      />

    <q-separator size="2px" />

    <!-- <div class="column wrap items-center"> -->
      <q-infinite-scroll @load="onLoad" :offset="20">
        <div v-for="(item, index) in proposalsToggle === 'Other Proposals' ? proposals : myProposals" :key="index" class="q-pa-lg">
          <Post :post="item" :isPost="false" :mine="proposalsToggle === 'My Proposals' "></Post>
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
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"
import Post from 'src/components/Post.vue';



export default defineComponent({
  name: 'ProposalsPage',
  components: { Post },
   setup () {
    
    return {
    }
      
  },

  data() {
    return {
      adSubmit: false,
      text: "",
      file: null,
      proposalsToggle: "Other Proposals",
      itema: [],
    }
  },

  methods: {
    ...mapActions(["postProposal", "getUser", "getMyProposals", "getProposals"]),


    onLoad: function (index, done) {
        setTimeout(() => {
        if (this.proposalsToggle === "Other Proposals")
          this.getProposals()
        

        done()
       }, 2000)
    },


    proposalSubmit: function() {
      console.log("ADVERT FORM", this.text, this.file)


      let proposal = {
          id: Math.random().toString(),
          date: Date().toString().replace(/\w+ (\w+) (\d+) (\d+).*/,'$2 $1 $3'),
          user: this.user,
          content: {
            text: this.text,
            file: {
              type: "",
              url: "",
            },
          },
          likes: [],
      }

      this.postProposal(proposal)
      this.text = ""
      this.file = null
    },
  },

  created() {
    this.getUser()
    this.getProposals()
    this.getMyProposals()
  },

  computed:{
      ...mapGetters({
      proposals: "proposals",
      myProposals: "myProposals",
      user: "user"
    }),
  },

})
</script>

<template>
<div class="q-pa-md fit column wrap justify-start items-center content-center">
<div class="text-h5">{{user.firstName + " " + user.lastName}}</div>
  <q-img :src="user.avatar" style="max-height: 140px; max-width: 150px"/>
</div>
  <q-page class="fit column wrap justify-start items-stretch content-center">
    
    <div class="q-pa-md">
      
    <div class="text-h6">Profile Image</div>
      <q-form @submit.prevent="submitImage" class="q-gutter-md">

        <!-- <q-uploader
          url="http://localhost:4444/upload"
        /> -->
        <q-file
          v-model="imageFile"
          label="Upaload Profile Image"
          accept=".jpg, .png, image/*"
          filled
          class="q-pa-sm"
        />
      <q-btn type="submit" flat label="Upaload" color="primary"  />
      </q-form>
      <!-- <div class="q-pa-lg">
        <q-btn color="red" class="full-width q-pa-lg" label="Log out" @click="logOut_" />
      </div> -->
    </div>
    <PersonalData :personalData="user.personalData" :ownUser="true"></PersonalData>
  </q-page>
</template>

<script>
import PersonalData from 'src/components/PersonalData.vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"

export default defineComponent({
  components: { PersonalData },
  name: 'PersonalDataPage',

   setup () {
    return {    
      
      }
  },

  data() {
    return {
      imageFile: null,

    }
  },

  created() {
    this.getUser()
  },

  methods: {
    ...mapActions(["getUser", "postProfileImage"]),

    submitImage: function() {
      console.log("CHANGE IMAGE", this.imageFile)

      const formData = new FormData();
      formData.append("image", this.imageFile, this.imageFile.name);
      console.log(formData.getAll("image"))

      this.postProfileImage(formData)
    },

  },

  computed:{
      ...mapGetters({
      user: "user",
    }),
  },

})
</script>

<template>
  <q-page class="fit column wrap justify-start items-center content-center">
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

  computed:{
      ...mapGetters({
      user: "user",
    }),
  },

})
</script>

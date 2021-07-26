<template>
  <q-page class="fit column wrap justify-start items-center content-center">
    <div class="q-pa-lg">
    <div class="text-h6">Reset Settings</div>
    <q-form @submit.prevent="submitSettings" @reset="onReset" class="q-gutter-md">
      <q-input v-model="user.email" filled label="Email" type="email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type an email']"/>
      <q-input v-model="password" filled label="Password" :type="isPwd ? 'password' : 'text'" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="password2" filled label="New Password" :type="isPwd ? 'password' : 'text'" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="password3" filled label="Confirm Password" :type="isPwd ? 'password' : 'text'" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    <q-btn type="submit" flat label="Reset" color="primary"  />
    <q-btn type="reset" flat label="Cancel" v-close-popup />
    </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"

// JSON.parse(JSON.stringify(user.email))
export default defineComponent({
  name: 'SettingsPage',

   setup () {
    return {    
      password: ref(''),
      password2: ref(''),
      password3: ref(''),
      isPwd: ref(true),
      email: ref(''),

    }
  },

  methods: {
    submitSettings: function() {
      if (this.password2 === this.password3) {
        console.log("CHANGE SETTINGS FORM", this.user.email, this.password, this.password2, this.password3)
      } else {
        alert("Passwords are not the same")
      }
    },

    onReset: function() {
      this.password = ""
      this.password2 = ""
      this.password3 = ""
      this.email = ""
    },
  },

    computed:{
    ...mapGetters({
      user: "user",
    }),
  },

})
</script>

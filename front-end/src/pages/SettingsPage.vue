<template>
  <q-page class="fit row wrap justify-center items-baseline content-center">
    <div class="q-pa-lg">
    <div class="text-h6">Reset Personal Info</div>
      <q-form @submit.prevent="submitPersonal" @reset="onReset" class="q-gutter-md">
        <q-input v-model="user.username"  filled label="Username" autofocus/>
        <q-input v-model="user.first_name"  filled label="First Name"/>
        <q-input v-model="user.last_name"  filled label="Last Name"/>
        <q-input v-model="user.email" filled label="Email" type="email"/>
        <q-input
          filled
          v-model="user.phone"
          label="Phone"
          
        />
      <q-btn type="submit" flat label="Reset" color="primary"  />
      <q-btn type="reset" flat label="Cancel" v-close-popup />
      </q-form>
    </div>

    

    <div class="q-pa-lg">
    <div class="text-h6">Reset Password</div>
      <q-form @submit.prevent="submitPassword" @reset="onReset" class="q-gutter-md">
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
      // password: ref(''),
      // password2: ref(''),
      // password3: ref(''),
      // isPwd: ref(true),
      // email: ref(''),

    }
  },
  data() {
    return {
      password: "",
      password2: "",
      password3: "",
      isPwd: false,

    }
  },

  methods: {
    ...mapActions(["getUser", "postUserSettings", "postUserSettingsPassword"]),
    submitPersonal: function() {
      console.log("CHANGE SETTINGS FORM", this.user.email, this.user.username, this.user.first_name, this.user.last_name, this.user.phone)

      var postUserSettingsForm = {
        username: this.user.username, 
        first_name: this.user.first_name, 
        last_name: this.user.last_name, 
        email: this.user.email, 
        phone: this.user.phone, 
      }

      this.postUserSettings(postUserSettingsForm)
    },


    submitPassword: function() {
      if (this.password2 === this.password3) {
        console.log("CHANGE PASSWORD FORM", this.password, this.password2, this.password3)

        var postUserSettingsPasswordForm = {
          old: this.password,
          new: this.password3
        }

        this.postUserSettingsPassword(postUserSettingsPasswordForm)
        
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

  created() {
    this.getUser()
  },

  computed:{
    ...mapGetters({
      user: "user",
    }),
  },

})
</script>

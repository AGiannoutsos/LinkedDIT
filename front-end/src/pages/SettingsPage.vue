<template>
  <q-page class="fit row wrap justify-center items-baseline content-center">
    <div class="q-pa-lg">
    <div class="text-h6">Reset Personal Info</div>
      <q-form @submit.prevent="submitPersonal" @reset="onReset" class="q-gutter-md">
        <q-input v-model="user.username"  filled label="Username" autofocus/>
        <q-input v-model="user.firstName"  filled label="First Name"/>
        <q-input v-model="user.lastName"  filled label="Last Name"/>
        <q-input v-model="user.email" filled label="Email" type="email"/>
        <q-input
          filled
          v-model="user.phone"
          label="Phone"
          
        />
      <q-btn type="submit" flat label="Reset" color="primary"  />
      <q-btn type="reset" flat label="Cancel" v-close-popup />
      </q-form>
      <!-- <div class="q-pa-lg">
        <q-btn color="red" class="full-width q-pa-lg" label="Log out" @click="logOut_" />
      </div> -->
    </div>

    <div class="q-pa-lg">
    <div class="text-h6">Reset Image</div>
      <q-form @submit.prevent="submitImage" @reset="onReset" class="q-gutter-md">

        <!-- <q-uploader
          url="http://localhost:4444/upload"
        /> -->
        <q-file
          v-model="user.avatar"
          label="Upaload avatar image"
          accept=".jpg, .png, image/*"
          filled
          class="q-pa-sm"
        />
      <q-btn type="submit" flat label="Reset" color="primary"  />
      <q-btn type="reset" flat label="Cancel" v-close-popup />
      </q-form>
      <!-- <div class="q-pa-lg">
        <q-btn color="red" class="full-width q-pa-lg" label="Log out" @click="logOut_" />
      </div> -->
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
      <!-- <div class="q-pa-lg">
        <q-btn color="red" class="full-width q-pa-lg" label="Log out" @click="logOut_" />
      </div> -->
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
    submitPersonal: function() {
      console.log("CHANGE SETTINGS FORM", this.user.email, this.user.username, this.user.firstName, this.user.lastName, this.user.phone)
    },

    submitImage: function() {
      console.log("CHANGE IMAGE", this.user.avatar)
    },

    submitPassword: function() {
      if (this.password2 === this.password3) {
        console.log("CHANGE PASSWORD FORM", this.password, this.password2, this.password3)
      } else {
        alert("Passwords are not the same")
      }
    },

    logOut_: function() {
      console.log("LOG OUT")
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

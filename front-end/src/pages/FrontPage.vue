<template>

  <q-page class="column justify-center items-center content-center">
        <q-img
          src="../../public/icons/logo_LinkedDit.svg"
          width="300px"
          height="300px"
        />
        <h1> LinkedDIT </h1>
        <div class="q-gutter-x-md">
          <q-btn
            color="primary" 
            label="Login"
            align="center"
            size="xl"
            @click="loginPrompt = true" />

          <q-dialog v-model="loginPrompt" >
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Login</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit.prevent="loginSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input v-model="username"  filled label="Username" autofocus />
                  <q-input v-model="password" filled label="Password" :type="isPwd ? 'password' : 'text'" >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                <q-btn type="reset" flat label="Forgot Password" @click="forgotPasswordPrompt = true" v-close-popup />
                <q-btn type="reset" flat label="Cancel" v-close-popup />
                <q-btn type="submit" flat label="Login" color="primary"  />
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-dialog v-model="forgotPasswordPrompt" >
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Forgot Password</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit.prevent="forgotPasswordSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input v-model="email" filled label="Email" type="email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type an email']"/>
                <q-btn type="submit" flat label="Send Password" color="primary"  />
                <q-btn type="reset" flat label="Cancel" v-close-popup />
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
                  
          <q-btn
            color="primary" 
            label="Sign up"
            align="center"
            size="xl"
            @click="signupPrompt = true" />

            <q-dialog v-model="signupPrompt" >
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Sign Up</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form @submit.prevent="signupSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input v-model="username"  filled label="Username" autofocus lazy-rules :rules="[ val => val && val.length > 0 || 'Please type a username']"/>
                  <q-input v-model="firstName"  filled label="First Name" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type a First Name']"/>
                  <q-input v-model="lastName"  filled label="Last Name" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type a Last Name']"/>
                  <q-input v-model="email" filled label="Email" type="email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type an email']"/>
                  <q-input
                    filled
                    v-model="phone"
                    label="Phone"
                    mask="### ## ## ###"
                  />
                  <!-- <q-uploader
                    url="http://localhost:4444/upload"
                  /> -->
                  <q-input v-model="password" filled label="Password" :type="isPwd ? 'password' : 'text'" >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <q-input v-model="password2" filled label="Confirm Password" :type="isPwd ? 'password' : 'text'" >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                <q-btn type="reset" flat label="Cancel" v-close-popup />
                <q-btn type="submit" flat label="Sign Up" color="primary"  />
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>


        </div>
  </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FrontPage',

   setup () {
      const $q = useQuasar()

    return {
      alert: ref(false),
      confirm: ref(false),
      loginPrompt: ref(false),
      forgotPasswordPrompt: ref(false),
      signupPrompt: ref(false),
      test: ref(''),

      loginForm: ref(null),
      password: ref(''),
      password2: ref(''),
      isPwd: ref(true),
      username: ref(''),
      firstName: ref(''),
      lastName: ref(''),
      email: ref(''),
      phone: ref(''),
      file: ref(null),

      showNotifBad (msg) {
        $q.notify({ 
          type: 'negative', 
          message: msg, 
          icon: 'report_problem',
          position: "top" })
      },

      showNotifInfo (msg) {
        $q.notify({ 
          type: 'info', 
          message: msg, 
          icon: 'info',
          position: "top" })
      }
      


    }
  },

  methods: {
    ...mapActions(["postLogin", "postForgotPassword", "postSignUp"]),


    loginSubmit: function() {
      console.log("LOGIN FORM", this.username, this.password)

      var postLoginForm = {
        username: this.username,
        password: this.password 
      }

      // if succes route to the app
      if (this.username === "admin") {

        this.postLogin(postLoginForm)
        .then(response => {          
          this.$router.push({ name: 'admin page' })
        })
        .catch(error => {
        })

      } else {

        this.postLogin(postLoginForm)
        .then(response => {
          this.$router.push({ name: 'app front page' })
        })
        .catch(error => {
        })

      }
    },

    forgotPasswordSubmit: function() {
      console.log("FORGOT PASS FORM", this.email)

      var postForgotPasswordForm = {
        email: this.email
      }
      this.postForgotPassword(postForgotPasswordForm)
    },

    signupSubmit: function() {
      if (this.password === this.password2) {
        console.log("SIGNUP FORM", this.username, this.firstName, this.lastName, this.password, this.password2, this.phone, this.file)

        
        var postSignUpForm = {
          username: this.username, 
          firstName: this.firstName, 
          lastName: this.lastName, 
          email: this.email,
          phone: this.phone.replace(/\s/g, ''), 
          // file: this.file,
          password: this.password, 
        }

        this.postSignUp(postSignUpForm)

      } else {
        this.showNotifBad("Passwords are not the same")
      }
    },

    onReset: function() {
      this.username = ""
      this.password = ""
      this.password2 = ""
      this.firstName = ""
      this.lastName = ""
      this.email = ""
      this.phone = ""
      this.file = null
    },

  },

})
</script>

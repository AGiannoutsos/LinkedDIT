<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/icons/logo_LinkedDit.svg">
          </q-avatar>
          LinkedDIT Administrator Control Panel
        </q-toolbar-title>
        <q-btn color="blue" icon="logout" class="q-pa-sm q-ma-sm" label="Log out" @click="logOut_" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script>


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AdminLayout',

  components: {
    
  },

  setup () {

  },

  methods: {
    logOut_: function() {
      console.log("LOG OUT")
    },
  },
})
</script>

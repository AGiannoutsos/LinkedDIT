<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/icons/logo_LinkedDit.svg">
          </q-avatar>
          LinkedDIT
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script>
import EssentialLink from 'components/EssentialLink.vue'


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginLayout',

  components: {
    
  },

  setup () {
    console.log("niii ed")
  },


})
</script>

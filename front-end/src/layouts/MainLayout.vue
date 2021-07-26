<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/icons/logo_LinkedDit.svg">
          </q-avatar>
          LinkedDIT
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/app/wall" label="Wall" />
        <q-route-tab to="/app/network" label="Network" />
        <q-route-tab to="/app/adverts" label="Adverts" />
        <q-route-tab to="/app/discussions" label="Discussions" />
        <q-route-tab to="/app/notifications" label="Notifications" />
        <q-route-tab to="/app/personal_data" label="Personal Data" />
        <q-route-tab to="/app/settings" label="Settings" />
        <!-- Aρχική Σελίδα / Δίκτυο / Αγγελίες  /  Συζητήσεις  /  Ειδοποιήσεις  /  Προσωπικά  Στοιχεία  /  Ρυθ μίσεις -->
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay>
      <!-- drawer content -->
      <q-list bordered padding class="rounded-borders text-primary">
        <q-item
          clickable
          v-ripple
          @click="this.$router.push({ name: 'network' })"
          active-class="my-menu-link"
        >
          <q-item-section>Network</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="this.$router.push({ name: 'personal data' })"
          active-class="my-menu-link"
        >
          <q-item-section>Personal Data</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {

    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
      
    }
  }
})
</script>

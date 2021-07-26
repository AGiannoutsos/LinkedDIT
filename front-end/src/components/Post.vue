<template>
 <div class="my-card">
  <q-card class="my-card">
    <q-item>
      <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Andreas Smaragda</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section class="q-pa-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </q-card-section>

      <q-card-actions align="left">
        <q-btn flat round color="red" icon="favorite" />
      </q-card-actions>
    </q-card>
 </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Post',
  props: {
    title: {
      type: String,
      default: ''

    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>
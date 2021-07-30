<template>
  <q-page class="fit column wrap justify-start items-center content-center">
    <div class="q-pa-md">
      <q-card class="users-card">
        <q-card-section horizontal class="justify-between items-center q-pa-md">
          <div class="text-h5 q-pa-sm">All Users</div>
          <q-card-section horizontal class="justify-right items-center q-gutter-sm">
            <q-btn
              type="submit"
              label="Export to JSON"
              color="teal"
              icon="file_download"
              @click="exportUsers('JSON')"
            ></q-btn>
            <q-btn
              type="submit"
              label="Export to XML"
              color="teal"
              icon="file_download"
              @click="exportUsers('XML')"
            ></q-btn>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-section  class="scroll">
          <div v-for="(item, index) in adminAllUsers" :key="index" class="q-pa-none">
            <UserCard :user="item" :admin="true" ></UserCard>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>

<script>
import UserCard from 'src/components/UserCard.vue';
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from "vuex"
import { exportFile, useQuasar } from 'quasar'

export default defineComponent({
  name: 'AdminPage',
  components: { UserCard },
   
  setup () {
    const $q = useQuasar()

    return {

    }
  },

  data() {
    return{
      searchText: "",
      fixed: false,
      val: true,

    }
  },

  created() {
    this.getAdminAllUsers()
  },

  methods: {
    ...mapActions(["getAdminAllUsers"]),

    exportUsers: function(type) {
      console.log("EXPORT TYPE", type)
      // var parser = require('xml2json');
      // console.log(parser)

      const content = this.adminAllUsersSelected()
      var status = null;

      if (type === "JSON")
         status = exportFile('users.json', JSON.stringify(content,null,4))
      else
        status = exportFile('users.xml', this.json2xml(content))
      

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
      
    },

    // taken from https://tqdev.com/2017-converting-json-to-xml-in-javascript-and-php <3 <3 <3
    json2xml: function(json) {
    var a = json
    var c = document.createElement("root");
    var t = function (v) {
        return {}.toString.call(v).split(' ')[1].slice(0, -1).toLowerCase();
    };
    var f = function (f, c, a, s) {
        c.setAttribute("type", t(a));
        if (t(a) != "array" && t(a) != "object") {
            if (t(a) != "null") {
                c.appendChild(document.createTextNode(a));
            }
        } else {
            for (var k in a) {
                var v = a[k];
                if (k == "__type" && t(a) == "object") {
                    c.setAttribute("__type", v);
                } else {
                    if (t(v) == "object") {
                        var ch = c.appendChild(document.createElementNS(null, s ? "item" : k));
                        f(f, ch, v);
                    } else if (t(v) == "array") {
                        var ch = c.appendChild(document.createElementNS(null, s ? "item" : k));
                        f(f, ch, v, true);
                    } else {
                        var va = document.createElementNS(null, s ? "item" : k);
                        if (t(v) != "null") {
                            va.appendChild(document.createTextNode(v));
                        }
                        var ch = c.appendChild(va);
                        ch.setAttribute("type", t(v));
                    }
                }
            }
        }
    };
    f(f, c, a, t(a) == "array");
    return c.outerHTML;
}

    

  },

  computed:{
      ...mapGetters({
      adminAllUsers: "adminAllUsers",
      adminAllUsersSelected: "adminAllUsersSelected",
    }),
  },

})
</script>

<style lang="sass" scoped>


</style>
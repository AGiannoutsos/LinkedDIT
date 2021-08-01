<template>
  <div class="personal-card">

    <div v-for="(item, index) in personalData" :key="index" class="q-pa-md">
      <q-card flat bordered v-if="item.visibility || ownUser" >
          <q-card-section >
            <div class="row justify-between">
              <div class="text-h6">{{ item.title }}</div>
              <q-btn v-if="ownUser" color="secondary" icon="edit" label="Edit" @click="chooseEditor(item); currentItem = JSON.parse(JSON.stringify(item));"/>
            </div>
          </q-card-section>

          <q-dialog v-model="editorPop">
            <q-card style="max-width: 600px; max-height: 700px">
              <q-form @submit.prevent="submitPersonalInfo(currentItem)" @reset="canselPersonalInfo">
                <q-card-section>
                  <div class="row justify-between">
                    <div class="text-h6">{{ currentItem.title }}</div>
                    <q-toggle
                      v-model="currentItem.visibility"
                      :color="!currentItem.visibility ? 'blue' : 'blue' "
                      :icon="!currentItem.visibility ? 'visibility_off' : 'visibility' "
                      :label="!currentItem.visibility ? 'Private' : 'Public' "
                    />
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-editor v-model="currentItem.content" min-height="5rem" :toolbar="[
                                                                          [
                                                                            {
                                                                              label: $q.lang.editor.align,
                                                                              icon: $q.iconSet.editor.align,
                                                                              fixedLabel: true,
                                                                              list: 'only-icons',
                                                                              options: ['left', 'center', 'right', 'justify']
                                                                            },
                                                                            {
                                                                              label: $q.lang.editor.align,
                                                                              icon: $q.iconSet.editor.align,
                                                                              fixedLabel: true,
                                                                              options: ['left', 'center', 'right', 'justify']
                                                                            }
                                                                          ],
                                                                          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                                                                          ['token', 'hr', 'link', 'custom_btn'],
                                                                          ['print', 'fullscreen'],
                                                                          [
                                                                            {
                                                                              label: $q.lang.editor.formatting,
                                                                              icon: $q.iconSet.editor.formatting,
                                                                              list: 'no-icons',
                                                                              options: [
                                                                                'p',
                                                                                'h1',
                                                                                'h2',
                                                                                'h3',
                                                                                'h4',
                                                                                'h5',
                                                                                'h6',
                                                                                'code'
                                                                              ]
                                                                            },
                                                                            {
                                                                              label: $q.lang.editor.fontSize,
                                                                              icon: $q.iconSet.editor.fontSize,
                                                                              fixedLabel: true,
                                                                              fixedIcon: true,
                                                                              list: 'no-icons',
                                                                              options: [
                                                                                'size-1',
                                                                                'size-2',
                                                                                'size-3',
                                                                                'size-4',
                                                                                'size-5',
                                                                                'size-6',
                                                                                'size-7'
                                                                              ]
                                                                            },
                                                                            {
                                                                              label: $q.lang.editor.defaultFont,
                                                                              icon: $q.iconSet.editor.font,
                                                                              fixedIcon: true,
                                                                              list: 'no-icons',
                                                                              options: [
                                                                                'default_font',
                                                                                'arial',
                                                                                'arial_black',
                                                                                'comic_sans',
                                                                                'courier_new',
                                                                                'impact',
                                                                                'lucida_grande',
                                                                                'times_new_roman',
                                                                                'verdana'
                                                                              ]
                                                                            },
                                                                            'removeFormat'
                                                                          ],
                                                                          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                                                                          ['undo', 'redo'],
                                                                          ['viewsource']
                                                                        ]"
                                                                        :fonts="{
                                                                          arial: 'Arial',
                                                                          arial_black: 'Arial Black',
                                                                          comic_sans: 'Comic Sans MS',
                                                                          courier_new: 'Courier New',
                                                                          impact: 'Impact',
                                                                          lucida_grande: 'Lucida Grande',
                                                                          times_new_roman: 'Times New Roman',
                                                                          verdana: 'Verdana'
                                                                        }"/>
                </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn type="submit" flat label="Submit" v-close-popup />
                    <q-btn type="reset" flat label="Cancel" v-close-popup />
                    
                  </q-card-actions>

              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog v-model="selectPop">
            <q-card style="max-width: 600px; max-height: 700px">
              <q-form @submit.prevent="submitPersonalInfo(currentItem)" @reset="canselPersonalInfo">
                <q-card-section>
                  <div class="row justify-between">
                    <div class="text-h6">{{ currentItem.title }}</div>
                    <q-toggle
                      v-model="currentItem.visibility"
                      :color="!currentItem.visibility ? 'blue' : 'blue' "
                      :icon="!currentItem.visibility ? 'visibility_off' : 'visibility' "
                      :label="!currentItem.visibility ? 'Private' : 'Public' "
                    />
                  </div>
                </q-card-section>

                <q-card-section style="min-width: 300px">
                  <q-select filled v-model="currentItem.content" :options="options" label="Choose Profession" />
                </q-card-section>


                <q-card-section class="q-pt-none">
                  <q-card-actions align="right" class="text-primary">
                    <q-btn type="submit" flat label="Submit" v-close-popup />
                    <q-btn type="reset" flat label="Cancel" v-close-popup />
                  </q-card-actions>
                </q-card-section>

              </q-form>
            </q-card>
          </q-dialog>

          
          <q-separator />

          <q-card-section v-html="item.content" />

      </q-card>
    </div>



  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from "vuex"


export default defineComponent({
  name: 'PersonalData',
  props: {
    personalData: {
      type: Object,
      required: true
    },
    ownUser: {
      type: Boolean,
      default: true
    },
  },

  data(){
    return{
      editor: "lorepon ise la",
      editorPop: false,
      selectPop: false,
      toggleVisibility: false,
      currentItem: {title: "", content: "", visibility: true},
      options: [ "Chiropractor",
"Dentist",
"Dietitian or Nutritionist",
"Optometrist",
"Pharmacist",
"Physician",
"Physician Assistant",
"Podiatrist",
"Registered Nurse",
"Therapist",
"Veterinarian",
"Health Technologist or Technician",
"Nursing, Psychiatric, or Home Health Aide",
"Occupational",
"Chief Executive",
"General and Operations Manager",
"Advertising, Marketing",
"Operations Specialties Manager",
"Construction Manager",
"Engineering Manager",
"Accountant, Auditor",
"Business Operations or Financial Specialist",
"Business Owner",
"Architect, Surveyor, or Cartographer",
"Engineer",
"Postsecondary Teacher",
"Primary, Secondary School Teacher",
"Arts, Design, Entertainment, Sports",
"Computer Specialist, Mathematical Science",
"Lawyer, Judge",
"Life Scientist",
"Physical Scientist",
"Religious Worker",
"Social Scientist and Related Worker",
"Supervisor of Administrative Support Workers",
"Financial Clerk",
"Secretary or Administrative Assistant",
"Material Recording, and Dispatching Worker",
"Protective Service",
"Chef or Head Cook",
"Cook or Food Preparation Worker",
"Food and Beverage Serving Worker",
"Building and Grounds Cleaning and Maintenance",
"Personal Care and Service",
"Sales Supervisor, Retail Sales",
"Retail Sales Worker",
"Insurance Sales Agent",
"Sales Representative",
"Real Estate Sales Agent",
"Construction and Extraction",
"Farming, Fishing, and Forestry",
"Installation, Maintenance, and Repair",
"Production Occupations",
"Aircraft Pilot or Flight Engineer",
"Motor Vehicle Operator",
"Military",
"Homemaker",
"Don't Know",
"Not Applicable", ]

    }
  },

  setup () {  
    // console.log(this.post)
    return {

    }
  },

  methods: {
    ...mapActions(["postPersonalData"]),
    submitPersonalInfo: function(item) {
      console.log("PERSONAL FORM", item)
      
      this.postPersonalData(item)

      this.editor = ""
      this.toggleVisibility = false
      this.editorPop = false
      this.selectPop = false
    },

    canselPersonalInfo: function() {      
      this.editor = ""
      this.toggleVisibility = false
      this.editorPop = false
      this.selectPop = false
    },

    chooseEditor: function(item){
      if (item.title === "Profession")
        this.selectPop = true
      else
        this.editorPop = true
    },
    
  },

  computed:{
    ...mapGetters({
      // user: "user",
    }),
  },

})
</script>

<style lang="sass" scoped>
.personal-card
  width: 100%
  max-width: 600px
</style>


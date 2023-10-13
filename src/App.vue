<script>

  import Sessions from './components/Sessions.vue'
  import Clock from './components/Clock.vue'

  export default {
    components: {            
      Sessions,
      Clock
    },
    data() {

      return {
        
        today: new Date().toDateString(),
        timeNow: new Date().toLocaleTimeString('en-US'),

        // retrieve data from Hermes Server workstation
        eventName: 'Event Name can go here',        
        eventStartDate: 'October 1 – 5, 2023',
        stationNumber: 1,     

        stationAdded: true, // after server adds this station
        startSession: false, // after server assigns a user to this station
        endSession: false,
        
        // retrieve from Server
        firstName: 'Bobby',
        lastName: 'Flay',                       
        sessions: [
          {
            sessionDate: 'October 2, 2023',
            sessionTime: '9:00 AM',
            sessionTitle: 'Diam dolor laoreet lorem ipsum amet',
            presentationName: 'Latin nunc diam, laoreet Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            filePath: '.',
            fileUploaded: false
          },
          {
            sessionDate: 'October 3, 2023',
            sessionTime: '1:00 PM',
            sessionTitle: 'Ullamcorper augue eu lorem',
            presentationName: 'Latin consectetur lorem ipsum dolor sit amet. Ullamcorper augue eu nam nunc diam laoreet.',
            filePath: '.',
            fileUploaded: false
          },
          // {
          //   sessionDate: 'October 4, 2023',
          //   sessionTime: '11:00 AM',
          //   sessionTitle: 'Consectetur adipiscing elit',
          //   presentationName: 'Latin lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc diam, laoreet ullamcorper augue eu.',
          //   filePath: null,
          //   fileUploaded: false
          // }, 

        ],

        uploadProgress: '100'

      }
    },
    methods: {
      saveExit() {
        this.uploadFiles()    
        this.startSession = false
        this.endSession = true
      },      
      uploadFiles() {     
        window.alert('uploading...')   
      }
    }
  }

</script>

<template>
    
  <div class="app-container" v-bind:class="{ stationIdle: !startSession, sessionComplete: endSession }">

    <div v-if="!stationAdded" class="p-10 rounded-3xl border border-white shadow-black shadow-xl">
      <p class="text-2xl mb-4 font-normal tracking-wide text-yellow-500">Station Activation Code</p>
      <h1 class="text-white text-9xl font-light">PPQFBG</h1>
    </div>

    <!-- after server has added this station -->
    <div v-if="stationAdded">

      <header v-if="!endSession" class="flex justify-between flex-wrap items-start">
        <!-- always show Event Name -->
        <div class="mb-6">
          <p class="text-4xl font-semibold">{{ eventName }}</p>
          <p class="text-2xl font-normal">{{ eventStartDate }}</p>
        </div>
        
        <!-- show Date and Time now if logged in -->
        <Clock v-if="startSession" />
      </header>

      <!-- show station name if not logged in -->
      <div v-if="!startSession && !endSession">
        <p class="text-xxl font-bold text-yellow-500 leading-none">Station {{ stationNumber }}</p>
        <p class="text-5xl font-light">Please see attendant to log in</p>
      </div>
        
      <main id="session-list" v-bind:class="{ active: startSession}">

        <!-- if presenter still working -->
        <section v-if="startSession && !endSession">
                
          <!-- Show Presenter Name (Logged User) -->
          <!-- comment: make "Save and Exit" it more obvious -->
          <div class="presenter-info">
            <h1 class="text-5xl font-bold text-yellow-500 mb-4">Welcome, {{ firstName }} {{ lastName }}!</h1>
            <div class="presenter-actions">            
              <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" type="button" class="cta-primary-xl">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                Save and Exit
              </button>
            </div>     
          </div>
          
          <!-- loop through sessions -->
          <ul>        
            <Sessions v-for="session in sessions" :key="session.id"
              :sessionDate="session.sessionDate"
              :sessionTime="session.sessionTime"
              :sessionTitle="session.sessionTitle"
              :presentationName="session.presentationName"
              :filePath="session.filePath"
              :fileUploaded="session.fileUploaded"
            />        
          </ul>          

        </section>

        <!-- save and exit -->
        <section class="presenter-ready" v-if="!startSession && endSession">

          <div class="w-full" v-if="uploadProgress != 100">
            <div class="flex justify-between mb-1">
              <span class="text-base font-medium text-white dark:text-white">Uploading</span>
              <span class="text-sm font-medium text-white dark:text-white">{{ uploadProgress + '%' }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
            </div>
          </div>

          <div v-if="uploadProgress >= 100">
            <h1 class="text-5xl font-bold text-yellow-500 mb-4">You're all set, {{ firstName }} {{ lastName }}!</h1>
            <p class="text-4xl font-light">Have a great presentation!</p>
          </div>
        </section>

      </main>

    </div>

    <!-- Main modal --> 
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Are you finished?
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Make sure you have added all your presentation files.<br>The next step will upload all your files to the server.</p>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Return</button>
                  <button @click="saveExit" data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes, I'm done</button>                  
                </div>
            </div>
        </div>
    </div>

  </div>

</template>

<style lang="postcss" scoped>

#branding img { width: 100%; height: auto; max-width: 200px; }

.app-container {
  @apply flex p-6 lg:p-12 h-full
}

.app-container {
  height: 100vh;
  background: url(@/assets/cadmium-logo.svg) no-repeat bottom right / 100%;
  background-size: 200px;
  background-position-y: calc(100% - 25px);
  background-position-x: calc(100% - 25px);
}

.app-container.stationIdle {
  place-items: center;
  min-height: 100vh;
  padding: 0 3rem;  
  padding-bottom: 200px;
  justify-content: center;
}

.app-container.stationClosed {
  width: 100%;
}

.station-info {
  @apply flex text-left w-full gap-3 flex-col mt-4
}

.presenter-info {
  @apply mb-12 flex justify-between flex-wrap
}

.presenter-actions {
  @apply flex gap-4 items-center
}

.presenter-ready, .presenter-not-ready {
  @apply flex flex-col items-center justify-center gap-6 w-full
}

.cta-disabled { 
  @apply flex gap-3 items-center text-gray-400 bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-400 text-base font-medium px-5 py-2.5 focus:z-10 
}

.cta-primary { 
  @apply w-full flex gap-3 items-center text-yellow-500 bg-slate-900 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center transition-colors
}
.cta-primary-xl { 
  @apply 
  w-full 
  flex 
  gap-3 
  items-center 
  text-yellow-500 
  bg-slate-900 
  hover:bg-slate-700 
  border
  border-yellow-500
  focus:ring-4 
  focus:outline-none 
  focus:ring-blue-300 
  font-medium 
  rounded-lg 
  text-3xl 
  px-5 
  py-2.5 
  text-center   
  transition-all  
}
.cta-primary-xl svg {
  @apply fill-yellow-500
}

.cta-secondary {
  @apply flex gap-3 items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 transition-colors
}

</style>

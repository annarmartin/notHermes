<script>

  export default {
    props: [
      'sessionDate',
      'sessionTime',
      'sessionTitle',
      'presentationName',
      'filePath',
      'fileUploaded'
    ],
    data() {
      return {
        hasPresentation: false,
        hasFileUploaded: false
      }
    },
    methods: {
      
    },
    beforeMount() {
      if (this.presentationName != null) {
        this.hasPresentation = true
      }
      if ((this.filePath != null) || (this.fileUploaded)) {
        this.hasFileUploaded = true
      }

    }
  }

</script>

<template>

  <li class="session-info" v-if="hasPresentation">
    <div class="presentation-status" v-if="!hasFileUploaded" @click="$refs.file.click()">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg>
      <p class="font-normal text-center">LOAD PRESENTATION</p>
    </div>
    <div class="presentation-submitted" v-if="hasFileUploaded">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
      <p class="font-normal text-center">PRESENTATION LOADED</p>
    </div>

    <div class="presentation-details">
      <p class="text-xl font-normal">{{ sessionDate }} &nbsp;|&nbsp; {{  sessionTime }}</p>
      <h2 class="text-3xl font-bold">{{ presentationName }}</h2>
      <p class="text-xl font-normal">{{ sessionTitle }}</p>

      <div class="session-actions">
        <button v-if="!hasFileUploaded" @click="$refs.file.click()" type="button" class="cta-primary">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg>
          Load Presentation
        </button>
        <button v-if="!hasFileUploaded" type="button" class="cta-disabled" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
          Edit Presentation
        </button>                
        
        <button v-if="hasFileUploaded" @click="$refs.file.click()" type="button" class="cta-primary">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg>
          Reload Presentation
        </button>
        <button v-if="hasFileUploaded" type="button" class="cta-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
          Edit Presentation
        </button>        
      </div>
    </div>

    <input type="file" ref="file" style="display: none" />  

  </li>

  <div class="session-info" v-if="!hasPresentation">
    <p class="text-xl font-normal">Session or Presentation Info unavailable. Please contact your administrator for assistance.</p>
  </div>

</template>

<style lang="postcss" scoped>
  
  p { color: #000; }

  .session-info {
    @apply 

    flex
    flex-wrap     
    justify-center 
    
    w-full 
    scale-100 
    
    rounded-sm
    shadow-xl 
    bg-opacity-70 
    bg-gray-200 
    text-gray-700 
    shadow-slate-950

    transition-all mb-6

     
    hover:scale-102 
  }
  .session-info:hover h2 {
    @apply text-black
  }

  .presentation-status {
    @apply 
    bg-gray-600 
    flex 
    gap-4
    lg:flex-col 
    items-center 
    lg:justify-center 
    text-white 
    w-full
    lg:w-60
    rounded-none 
    p-8 
    cursor-pointer
    hover:bg-gray-500
    transition-all
  }
  .presentation-status p { @apply text-white }
  .presentation-status svg {
    @apply fill-white w-8 h-8 mb-4 
  }

  .presentation-submitted {
    @apply 
    bg-green-700 
    flex 
    gap-4
    lg:flex-col 
    items-center 
    lg:justify-center 
    text-white 
    w-full
    lg:w-60
    rounded-none 
    p-8
  }
  .presentation-submitted p { @apply text-white }
  .presentation-submitted svg {
    fill: #fff;
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
  }

  .presentation-details {
    @apply flex-1 p-8
  }

  .presentation-submitted + .presentation-details { 
    @apply bg-gray-300
  }

  .session-actions {
    @apply flex flex-wrap justify-start gap-4 mt-6 
  }

  .cta-disabled { 
    @apply flex gap-3 items-center text-gray-400 bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg font-medium px-5 py-2.5 focus:z-10
  }
  .cta-disabled svg {
    @apply fill-gray-400
  }
  
  .cta-primary { 
    @apply flex gap-3 items-center text-black bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center
  }

  .cta-primary svg { 
    @apply fill-black
  }
  
  .cta-secondary {
    @apply flex gap-3 items-center text-black bg-gray-100 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-lg font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10
  } 


</style>
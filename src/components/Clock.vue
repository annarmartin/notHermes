<script setup>

  import { reactive, onBeforeUnmount } from 'vue';
  import { useGlobalStore } from "../stores/global.store"

  const store = useGlobalStore();

    const date = new Date();
    const dateTime = reactive({
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      period: ''
    });

    const setDateTime = () => {
      const date = new Date();
      dateTime.hours = date.getHours();
      dateTime.minutes = date.getMinutes();
      dateTime.seconds = date.getSeconds();
      dateTime.period = '';

      if (dateTime.minutes < 10) {
        dateTime.minutes = '0' + dateTime.minutes
      }

      if (dateTime.seconds < 10) {
        dateTime.seconds = '0' + dateTime.seconds
      }

      if (dateTime.hours >= 13) {
        dateTime.period = 'PM'
        dateTime.hours = dateTime.hours - 12
      } else {
        dateTime.period = 'AM'
      }
    }

    const timer = setInterval(setDateTime, 1000);

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

</script>

<template>
  
  <p class="text-2xl font-light mb-4 flex gap-3 items-center">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
    {{ dateTime.hours }}:{{ dateTime.minutes }} {{  dateTime.period }}
    <a @click="store.increment()">{{ store.count }}</a>
    {{store.nodeRole}}
  </p>             

</template>

<style lang="postcss" scoped>
  
  p svg {
    fill: #aaa;    
    height: 20px;
    width: 20px;
  }

</style>

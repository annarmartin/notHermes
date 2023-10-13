<script>
  const date = new Date();
  export default {

    data() {

      return {
                
        dateTime: {
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          period: ''
        },
        timer: undefined,

      }
    },

    methods: {
      setDateTime() {
        const date = new Date();
        this.dateTime = {
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          period: ''
        };

        if (this.dateTime.minutes < 10) {
          this.dateTime.minutes = '0' + this.dateTime.minutes
        }

        if (this.dateTime.seconds < 10) {
          this.dateTime.seconds = '0' + this.dateTime.seconds
        }

        if (this.dateTime.hours >= 13) {
          this.dateTime.period = 'PM'
          this.dateTime.hours = this.dateTime.hours - 12
        } else {
          this.dateTime.period = 'AM'
        }
      },
    },

    beforeMount() {
      this.timer = setInterval(this.setDateTime, 1000);
    },

    beforeUnmount() {
      clearInterval(this.timer);
    },

  }

</script>

<template>
  
  <p class="text-2xl font-light mb-4 flex gap-3 items-center">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
    {{ dateTime.hours }}:{{ dateTime.minutes }} {{  dateTime.period }}
  </p>             

</template>

<style lang="postcss" scoped>
  
  p svg {
    fill: #aaa;    
    height: 20px;
    width: 20px;
  }

</style>

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { NodeRole } from '../types/global.types';

export const useGlobalStore = defineStore('global', () => {

    // store state
    const eventName = ref("No Event Name")
    const eventDates = ref("No Dates")
    const nodeRole = ref("Unassigned")

    const count = ref(0);
    function increment() {
      count.value++
    }
  
    return { count, increment, eventName, eventDates, nodeRole }
  });
  
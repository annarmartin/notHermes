  <script>
  import { ref, onMounted } from 'vue';
  import { useGlobalStore } from "../stores/global.store"
  
  export default {
    setup() {
      const stations = ref([]);
  
      const fetchStations = async () => {
        try {
          const response = await fetch('http://localhost:3001/stations');
          stations.value = await response.json();
        } catch (error) {
          console.error('Error fetching stations:', error);
        }
      };
  
      const openServerAssignedStation = (station) => {
        // Set the station details in the state
        assignPresenterState.currentStation = station;
        assignPresenterState.backUrl = '/'; // Set the URL to navigate back to
  
        // Switch to the Assign Presenter screen
        assignPresenterState.screen = 'assignPresenter';
      };
  
      onMounted(fetchStations);
  
      return { stations, openServerAssignedStation };
    },
  };
  </script>

<template>
    <div>
      <h1>Stations</h1>
      <ul>
        <li v-for="station in stations" :key="station.id" @click="openServerAssignedStation(station)">
          <div class="list-item" :class="{ 'in-use': station.state === 'InUse', 'not-in-use': station.state === 'NotInUse' }">
            {{ station.name }} {{ station.state }}
          </div>
          
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .in-use {
    background-color: green;
  }
  
  .not-in-use {
    background-color: red;
  }
  
  </style>
  
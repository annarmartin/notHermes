<template>
  <div>
    <!-- Check if nodeRole is "Undefined" to show the dropdown -->
    <div v-if="store.nodeRole === 'Undefined'">
      <header>      
        <h1>Speaker Ready Room</h1>      
        <h2>Admin Override</h2>                   
      </header>
      <p>Please select a role for this node:</p>
      <div class="radio-buttons" style="display:flex; flex-direction: column;">
        <div><input type="radio" id="stationRadio" v-model="selectedNodeRole" value="Station">
        <label for="stationRadio">Station</label></div>

        <div><input type="radio" id="serverRadio" v-model="selectedNodeRole" value="Server">
        <label for="serverRadio">Server</label></div>

        <div><input type="radio" id="podiumRadio" v-model="selectedNodeRole" value="Podium">
        <label for="podiumRadio">Podium</label></div>
      </div>
  <button @click="updateNodeRole" :disabled="selectedNodeRole === null" class="btn primary btn-block">Activate</button>
</div>
    <!-- Render the component based on the selectedNodeRole -->
    <component :is="computedComponentName" v-else />
  </div>
</template>

<script>
import { useGlobalStore } from './stores/global.store.ts';
import { ref, onMounted } from 'vue';
import Station from './components/Station.vue';
import Server from './components/Server.vue';
import Podium from './components/Podium.vue';
import stylesheet from './assets/styles.css'

export default {
  setup() {
    const store = useGlobalStore();
    const selectedNodeRole = ref(undefined); // Initialize as undefined
    const loading = ref(true);

    console.log('selectedNodeRole:', selectedNodeRole.value);

    const loadNodeRole = async () => {
      try {
        const response = await fetch('http://localhost:3001/current-node');
        const data = await response.json();

        console.log('Node Role from API:', data.nodeRole);

        store.nodeRole = data.nodeRole;
      } catch (error) {
        console.error('Error loading node role:', error);
      } finally {
        loading.value = false;
      }
    };

    const determineComponentName = () => {
      switch (selectedNodeRole.value) {
        case 'Station':
          return Station;
        case 'Server':
          return Server;
        case 'Podium':
          return Podium;
        default:
          return 'Undefined';
      }
    };

    const updateNodeRole = () => {
      store.nodeRole = selectedNodeRole.value;
      console.log('updatedSelectedNodeRole:', selectedNodeRole.value);
    };

    onMounted(async () => {
      await loadNodeRole();
      selectedNodeRole.value = store.nodeRole; // Set selectedNodeRole based on store.nodeRole
    });

    return { store, loadNodeRole, determineComponentName, selectedNodeRole, updateNodeRole, loading };
  },
  computed: {
    computedComponentName() {
      return this.determineComponentName();
    }
  }
};
</script>



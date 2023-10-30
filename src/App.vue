<template>
  <div>
    <!-- Check if nodeRole is "Undefined" to show the dropdown -->
    <div v-if="store.nodeRole === 'Undefined'">
      <select v-model="selectedNodeRole">
        <option value="Station">Station</option>
        <option value="Server">Server</option>
        <option value="Podium">Podium</option>
      </select>
      <button @click="updateNodeRole">Submit</button>
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



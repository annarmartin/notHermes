<!-- AssignPresenter.vue -->

  
  <script>
  import { ref, onMounted } from 'vue';
  import { useGlobalStore } from "../stores/global.store"
  
  export default {
    setup() {
      const selectedPresenter = ref('');
      const presenters = ref([]);
      const eventName = ref('');
      const eventDate = ref('');
  
      const fetchPresenters = async () => {
        try {
          const response = await fetch('http://localhost:3001/users');
          presenters.value = await response.json();
        } catch (error) {
          console.error('Error fetching presenters:', error);
        }
      };
  
      const fetchCurrentNode = async () => {
        try {
          const response = await fetch('http://localhost:3001/current-node');
          const data = await response.json();
          eventName.value = data.eventName;
          eventDate.value = data.eventDates;
        } catch (error) {
          console.error('Error fetching current node information:', error);
        }
      };
  
      const assignPresenter = () => {
        // Perform the logic to assign the presenter to the station using the API
        console.log(`Assigning presenter ${selectedPresenter} to station ${assignPresenterState.currentStation.id}`);
      };
  
      const navigateBack = () => {
        // Switch back to the Stations screen
        assignPresenterState.screen = 'stations';
      };
  
      onMounted(() => {
        fetchPresenters();
        fetchCurrentNode();
      });
  
      return { selectedPresenter, presenters, eventName, eventDate, assignPresenter, navigateBack };
    },
  };
  </script>
  
  <template>
    <div>
      <h1>Assign Presenter</h1>
      <label for="presenter">Select Presenter:</label>
      <select v-model="selectedPresenter" id="presenter">
        <option v-for="presenter in presenters" :key="presenter.userId" :value="presenter.userId">
          {{ presenter.userFullName }}
        </option>
      </select>
      <button @click="assignPresenter">Assign Presenter</button>
      <div>
        <p>Event Name: {{ eventName }}</p>
        <p>Event Date: {{ eventDate }}</p>
      </div>
      <button @click="navigateBack">Back to Stations</button>
    </div>
  </template>
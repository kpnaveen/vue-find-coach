<template>
  <div>
    <section>
      <CoachFilter @change-filter="setFilter" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="getAllCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isAuthenticated">Login to Register as Coach</base-button>
          <base-button
            :link="true"
            to="/register"
            v-if="!isLoading && !isUserCoach && isAuthenticated"
            >Register As Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachListItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          />
        </ul>
        <h3 v-else>No coach found</h3>
      </base-card>
    </section>
    <base-dialog :show="!!error" title="Error" @close="error = null">
      <!-- !!error will convert error string to boolean -->
      <p>{{ error }}</p>
    </base-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CoachListItem from "@/components/coaches/CoachListItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachListItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      // filteredCoaches: "coach/coaches",
      // hasCoaches: "coach/hasCoaches",
      isUserCoach: "coach/isUserCoach",
      isAuthenticated: "isAuthenticated"
    }),
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coach/hasCoaches"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coach/coaches"];
      const keys = Object.keys(this.activeFilters);
      const selectedFilters = keys.filter(
        (filter) => this.activeFilters[filter] === true
      );
      return coaches.filter((coach) => {
        return coach.areas.some((item) => selectedFilters.includes(item));
      });
    },
  },
  methods: {
    setFilter(updaterFilter) {
      this.activeFilters = updaterFilter;
    },
    async getAllCoaches(forceFetch = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coach/getCoaches", { forceFetch });
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getAllCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

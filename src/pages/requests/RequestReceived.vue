<template>
  <div>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <ul v-if="hasRequests && !isLoading">
          <RequestItem
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          />
        </ul>
        <h3 v-else-if="!(hasRequests || isLoading)">
          You haven't received any request yet
        </h3>
      </base-card>
    </section>
    <base-spinner v-if="isLoading"></base-spinner>
  </div>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["request/getCurrentUserRequests"];
    },
    hasRequests() {
      return this.$store.getters["request/hasRequests"];
    },
  },
  methods: {
    async getReceivedRequests() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("request/getRequests");
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getReceivedRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

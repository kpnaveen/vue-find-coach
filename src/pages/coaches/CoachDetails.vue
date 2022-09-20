<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
  
export default {
  props: ["id"], // this id is coming from routing by setting props: true in router.js
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
    },
    contactLink() {
      return `${this.$route.path}/contact`
    },
    rate() {
      return this.selectedCoach.hourlyRate
    }
  },
  created() {
    this.selectedCoach = this.$store.getters["coach/coaches"].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
 
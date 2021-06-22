<template>
  <div class="demo-section">
    <h1>Vue Section Scroller</h1>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "DemoSection",
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.demo-section {
  padding: 1rem;

  h1 {
    margin: 0 0 2rem 0;
    font-size: 3rem;
  }

  h3 {
    margin: 0 0 1.2rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0 0 1rem 0;
    font-size: 1rem;
  }
}
</style>

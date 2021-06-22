<template>
  <div id="app">
    <vue-section-scroller :sections="sections" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueSectionScroller from '@/vue-section-scroller.vue';
import Section from '@/types/Section'
import DemoSection from './components/DemoSection.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueSectionScroller
  },
   setup() {
    const sections: Section[] = [
      {
        id: 1,
        label: "First section",
        component: DemoSection,
        props: {
          title:
            "With this component you can add page scrolling effect on your website.",
          description: "Scroll down to see how it's working.",
        },
      },
      {
        id: 2,
        label: "Second section",
        component: DemoSection,
        props: {
          title: "You can customize this component.",
          description: "Check out all of the props on the component docs.",
        },
      },
      {
        id: 3,
        label: "Third section",
        component: DemoSection,
        props: {
          title: "It's free.",
          description: "Feel free to use it in your project.",
        },
      },
    ];

    return {
      sections,
    };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

html,
body {
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #323330;
  height: 100%;

  .header {
    padding: 1rem;
    h1 {
      margin: 0;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import VueSectionScroller from '@/vue-section-scroller.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueSectionScroller
  }
});
</script>

<template>
  <div id="app">
    <vue-section-scroller />
  </div>
</template>

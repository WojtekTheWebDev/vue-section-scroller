<template>
  <div class="vue-section-scroller">
    <div
      v-if="sectionIndex > 0"
      class="top"
      @click="changeComponent(sectionIndex - 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1.5rem"
        height="1.5rem"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path
            d="M4 15l8-8l8 8"
            :stroke="baseColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>

    <section class="scroller-section">
      <component
        :key="currentSection.id"
        :is="currentSection.component"
        v-bind="currentSection.props"
      />
    </section>

    <div
      v-if="sectionIndex < sectionsLength - 1"
      class="bottom"
      @click="changeComponent(sectionIndex + 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1.5rem"
        height="1.5rem"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path
            d="M4 9l8 8l8-8"
            :stroke="baseColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </div>

    <aside class="scroller-aside" :class="{ 'aside-left': asideLeft }">
      <div
        v-for="(section, index) in sections"
        :key="section.name"
        class="aside-section"
        :class="{ active: index === sectionIndex }"
        @click="changeComponent(index)"
      >
        <span
          v-if="dots && !customPrefix"
          class="dot"
          :style="{
            backgroundColor: index === sectionIndex ? activeColor : baseColor,
          }"
        ></span>
        <span
          v-if="customPrefix"
          class="custom-prefix"
          :style="{
            color: index === sectionIndex ? activeColor : baseColor,
          }"
        >
          <slot name="customPrefix" :index="index"></slot>
        </span>
        <span
          v-if="asideLabels"
          class="label"
          :style="{
            color: index === sectionIndex ? activeColor : baseColor,
          }"
        >
          {{ section.label }}
        </span>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onUnmounted } from "vue";
import { gsap } from "gsap";
import Section from "@/types/Section";

export default defineComponent({
  name: "VueSectionScroller",

  props: {
    /**
     * Array of component's sections.
     */
    sections: {
      type: Array as PropType<Section[]>,
      default: () => [],
    },

    /**
     * Show aside on the left.
     */
    asideLeft: {
      type: Boolean,
      default: false,
    },

    /**
     * Show aside labels.
     */
    asideLabels: {
      type: Boolean,
      default: false,
    },

    /**
     * Show aside dots.
     * If customPrefix is enabled, it overrides the dots.
     */
    dots: {
      type: Boolean,
      default: true,
    },

    /**
     * Show custom aside prefixes.
     * Overrides the dots.
     */
    customPrefix: {
      type: Boolean,
      default: false,
    },

    /**
     * Color of inactive dots and labels.
     */
    baseColor: {
      type: String,
      default: "#323330",
    },

    /**
     * Color of active dots and labels.
     */
    activeColor: {
      type: String,
      default: "#323330",
    },

    /**
     * Show chevrons at the top and bottom of the component.
     */
    showChevrons: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    /* Data */
    let sectionIndex = ref(0);

    /* Computed */
    let currentSection = computed(() => props.sections[sectionIndex.value]);
    let sectionsLength = computed(() => props.sections.length);

    /* Methods */
    const changeComponent = (index: number) => {
      if (index === sectionIndex.value) return;

      gsap
        .timeline()
        .to(".scroller-section", {
          duration: 0.5,
          opacity: 0,
          y: index > sectionIndex.value ? -100 : 100,
          onComplete: () => {
            sectionIndex.value = index;
          },
        })
        .to(".scroller-section", {
          duration: 0,
          opacity: 0,
          y: index > sectionIndex.value ? 100 : -100,
        })
        .to(".scroller-section", {
          duration: 0.5,
          opacity: 1,
          y: 0,
        });

      emit("changeComponent", index);
    };

    /* Scrolling */
    const handleScroll = (event: WheelEvent) => {
      window.removeEventListener("wheel", handleScroll);

      setTimeout(() => {
        window.addEventListener("wheel", handleScroll);
      }, 200);

      if (event.deltaY > 0 && sectionIndex.value < sectionsLength.value - 1) {
        emit("scrollDown");
        changeComponent(sectionIndex.value + 1);
      } else if (event.deltaY < 0 && sectionIndex.value > 0) {
        emit("scrollUp");
        changeComponent(sectionIndex.value - 1);
      }
    };

    /* Swipe gestures  */
    let touchStartY = 0;
    const handleSwipeStart = (event: TouchEvent) => {
      window.removeEventListener("touchstart", handleSwipeStart);

      setTimeout(() => {
        window.addEventListener("touchstart", handleSwipeStart);
      }, 200);

      touchStartY = event.changedTouches[0].screenY;
    };

    const handleSwipeEnd = (event: TouchEvent) => {
      window.removeEventListener("touchend", handleSwipeEnd);

      setTimeout(() => {
        window.addEventListener("touchend", handleSwipeEnd);
      }, 200);

      let touchEndY = event.changedTouches[0].screenY;

      if (
        touchEndY < touchStartY &&
        sectionIndex.value < sectionsLength.value - 1
      ) {
        console.log("Swiped Down");
        emit("swipeDown");
        changeComponent(sectionIndex.value + 1);
      }

      if (touchEndY > touchStartY && sectionIndex.value > 0) {
        emit("swipeUp");
        changeComponent(sectionIndex.value - 1);
      }
    };

    /* Add event listeners */
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleSwipeStart);
    window.addEventListener("touchend", handleSwipeEnd);

    /* Remove event listeners */
    onUnmounted(() => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleSwipeStart);
      window.removeEventListener("touchend", handleSwipeEnd);
    });

    return {
      currentSection,
      sectionIndex,
      sectionsLength,
      changeComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
/* Vue Section Scroller CSS */
.vue-section-scroller {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .scroller-section {
    width: 100%;
  }

  .top {
    position: absolute;
    top: 0;
    width: 100%;
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scroller-aside {
    position: absolute;
    right: 0;
    left: initial;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media screen and (max-width: 768px) {
      display: none;
    }

    &.aside-left {
      right: initial;
      left: 0;

      .aside-section {
        flex-direction: row;
      }
    }

    .aside-section {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      width: 100%;
      cursor: pointer;
      padding: 0.5rem 0;
      opacity: 0.8;

      .label {
        font-weight: 400;
        font-size: 1rem;
      }

      .custom-prefix {
        margin: 0 0.5rem;
        min-width: 1.5rem;
        max-width: 2.5rem;
      }

      .dot {
        height: 0.5rem;
        width: 0.5rem;
        margin: 0 0.5rem;
        border-radius: 50%;
      }

      &:hover {
        opacity: 1;

        .dot {
          transform: scale(1.2);
        }
      }

      &.active {
        opacity: 1;

        .label {
          font-weight: 500;
        }

        .custom-prefix {
          font-weight: 500;
        }

        .dot {
          transform: scale(1.5);

          &:hover {
            transform: scale(1.5);
          }
        }
      }
    }
  }
}
</style>

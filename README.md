# vue-section-scroller
Vue.js component for switching sections with scrolling and swiping (for mobile). Made with Vue 3, Composition API and TypeScript. 

## Getting started

### Installation
```bash
npm install vue-section-scroller -D

# or

yarn add vue-section-scroller -D
```
Then, import and register the component:
```js
import VueSectionScroller from "vue-section-scroller";
```
You need also to import the styles separately:
```js
import "vue-section-scroller/dist/vue-section-scroller.css"
```
Finally, add to your component:
```js
...
components: {
  VueSectionScroller,
  // Other components
}
...
```

### Usage
First, create the array of sections in your component. If you are using TypeScript, Section type is included in the library:
```js
/* Vue 3 + TypeScript */
import Section from 'vue-section-scroller/src/types/Section';
  // Component creation etc...
  setup() {
      const sections: Section[] = [
        {
          id: 1, // Unique identifier
          label: "Component label", // Label displayed in the aside
          component: SomeComponent, // Component displayed in the section
          props: { // Component props, should be an object with key - value pairs.
          },
        },
        // rest of the sections
      ];

      // other code

      return {
        sections,
        // other returns
      };
  }

// ---------------------------------------------------------------------------------------

/* Vue 2 */
export default {
  data: () => ({
    sections: [
      {
        id: 1, // Unique identifier
        label: "Component label", // Label displayed in the aside
        component: SomeComponent, // Component displayed in the section
        props: { // Component props, should be an object with key - value pairs.
        },
      },
      // rest of the sections
    ]
  })
}

```
```html
<vue-section-scroller :sections="sections"></vue-section-scroller>
```

### Props

| Prop         | Type      | Default   | Description                        |
| ---          | ---       | ---       | ---                                |
| sections     | Section[] | []        | Array of component's sections.     |
| asideLeft    | Boolean   | false     | Show aside on the left.            |
| asideLabels  | Boolean   | false     | Show aside labels.                 |
| dots         | Boolean   | true      | Show aside dots. If customPrefix is enabled, it overrides the dots. |
| customPrefix | Boolean   | false     | Show custom aside prefixes. Overrides the dots. |
| baseColor    | String    | "#323330" | Color of inactive dots and labels. |
| activeColor  | String    | "#323330" | Color of active dots and labels.  |
| showChevrons | Boolean   | true      | Show chevrons at the top and bottom of the component. |

## Live Demo

https://codesandbox.io/s/vue-section-scroller-demo-tsyzd

## Credits
Thanks to [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup) for the SFC template ready to publish. I wish I had known this before.

## License
[MIT License](https://github.com/SikoraWojciech/vue-section-scroller/blob/master/LICENSE)

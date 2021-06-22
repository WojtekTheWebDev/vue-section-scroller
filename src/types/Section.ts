import { Component } from 'vue';

/**
 * Section type for the Vue Section Scroller.
 * ___
 * Properties:
 * * id: *string | number* - Unique identifier.
 * * label: *string* - Label displayed in the aside
 * * component: *Component* - Component displayed in the section
 * * props: *any* - Component props, should be an object with key - value pairs.
 */
export default interface Section {
  id: string | number,
  label: string,
  component: Component,
  props?: any
};
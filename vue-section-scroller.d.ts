import { DefineComponent, Plugin } from 'vue';

declare const VueSectionScroller: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default VueSectionScroller;

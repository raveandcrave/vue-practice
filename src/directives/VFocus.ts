import type { DirectiveWithName } from '@/types';

export default <DirectiveWithName<HTMLElement, () => void>>{
  mounted(el) {
    el.focus();
  },
  name: 'focus'
};

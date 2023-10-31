import type { DirectiveWithName } from '@/types';

export default <DirectiveWithName<HTMLElement, () => void>>{
  mounted(el, binding) {
    console.log(el, binding);

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };

    const observer = new IntersectionObserver(callback, options);

    if (el) {
      observer.observe(el);
    }
  },
  name: 'intersection'
};

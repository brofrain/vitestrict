import Link from '~/components/_base/Link.vue';

import { mount } from '@vue/test-utils';

const push = vi.fn();
const replace = vi.fn();

vi.mock('vue-router', () => ({ useRouter: () => ({ push, replace }) }));

describe('Link', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should render', () => {
    const wrapper = mount(Link, { slots: { default: 'abc' } });
    expect(wrapper.text()).toContain('abc');
    expect(wrapper.html()).toMatchSnapshot();
  });

  const to = '/abc';

  const openSpy = vi.spyOn(window, 'open').mockImplementation(() => window);
  const focusSpy = vi.spyOn(window, 'focus').mockImplementation(() => {});

  it('should do nothing', async () => {
    const wrapper = mount(Link);

    await wrapper.trigger('click');

    expect(push).not.toHaveBeenCalled();
    expect(replace).not.toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('should open external link', async () => {
    const wrapper = mount(Link, { props: { to, external: true } });

    await wrapper.trigger('click');

    expect(openSpy).toHaveBeenCalledOnce();
    expect(openSpy).toHaveBeenCalledWith(to, '_blank');
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  it('should push router', async () => {
    const wrapper = mount(Link, { props: { to } });

    await wrapper.trigger('click');

    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith(to);
  });

  it('should replace router', async () => {
    const wrapper = mount(Link, { props: { to, replace: true } });

    await wrapper.trigger('click');

    expect(replace).toHaveBeenCalledOnce();
    expect(replace).toHaveBeenCalledWith(to);
  });
});

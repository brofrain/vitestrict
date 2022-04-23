import { mount } from "@vue/test-utils";
import Button from "~/components/_base/Button.vue";

describe("Button", () => {
  it("should render", () => {
    const wrapper = mount(Button, { slots: { default: "abc" } });
    expect(wrapper.text()).toContain("abc");
    expect(wrapper.html()).toMatchSnapshot();
  });
});

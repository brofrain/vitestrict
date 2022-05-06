describe("_global", () => {
  describe("cloneDeep", () => {
    it("should clone deeply", () => {
      const fn = vi.fn(cloneDeep);

      const obj = { 1: { 2: [{ 3: { value: "abc" } }] } };
      const clonedObj = fn(obj);

      expect(clonedObj).toStrictEqual(obj);
    });
  });

  describe("forceNextTick", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should request animation frame twice", () => {
      const requestAnimationFrameMock = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb: any) => cb());

      forceNextTick();

      expect(requestAnimationFrameMock).toHaveBeenCalledTimes(2);

      requestAnimationFrameMock.mockClear();

      const fn = vi.fn();

      forceNextTick(fn);

      expect(fn).toHaveBeenCalledOnce();
      expect(requestAnimationFrameMock).toHaveBeenCalledTimes(2);
    });
  });

  describe("range", () => {
    it("should create range array", () => {
      expect(range(3)).toStrictEqual([0, 1, 2]);
      expect(range(1, 4)).toStrictEqual([1, 2, 3]);
      expect(range(1, 8, 2)).toStrictEqual([1, 3, 5, 7]);
    });
  });
});

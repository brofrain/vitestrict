import type { ParamlessVoidFunction } from "~/types/basic";

export * from "./is";

export const cloneDeep = <T>(value: T): T => {
  if (isArray(value)) {
    return value.map((item) => cloneDeep(item)) as unknown as T;
  }

  if (value === Object(value)) {
    const newObj = { ...value };
    for (const key in newObj) {
      newObj[key] = cloneDeep(newObj[key]);
    }
    return newObj;
  }

  return value;
};

const doubleRequestAnimationFrame = (callback: ParamlessVoidFunction) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};

// based on https://github.com/twickstrom/vue-force-next-tick
export const forceNextTick = (
  callback?: ParamlessVoidFunction
): Promise<unknown> | void => {
  if (callback && isFn(callback)) {
    doubleRequestAnimationFrame(callback);
  } else {
    return new Promise((resolve) => {
      doubleRequestAnimationFrame(resolve as ParamlessVoidFunction);
    });
  }
};

export const range = (
  startOrEnd: number,
  end: number | null | undefined = null,
  step = 1
): number[] => {
  const isEndNullish = isNullish(end);

  return Array.from(
    {
      length: Math.ceil(
        Math.abs(isEndNullish ? startOrEnd : end - startOrEnd) / step
      ),
    },
    (_, i) => i * step + (isEndNullish ? 0 : startOrEnd)
  );
};

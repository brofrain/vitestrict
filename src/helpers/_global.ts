export * from './is';

export const cloneDeep = <T>(value: T): T => {
  if (isArray(value)) {
    return value.map((item) => cloneDeep(item)) as unknown as T;
  }

  if (value === Object(value)) {
    const newObj: Partial<T> = {};
    for (const key in value) {
      newObj[key] = cloneDeep(value[key]);
    }
    return newObj as T;
  }

  return value;
};

const doubleRequestAnimationFrame = (callback: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};

// based on https://github.com/twickstrom/vue-force-next-tick
export const forceNextTick = (callback?: () => void): Promise<void> | void => {
  if (callback && isFn(callback)) {
    doubleRequestAnimationFrame(callback);
  } else {
    return new Promise((resolve) => {
      doubleRequestAnimationFrame(resolve);
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

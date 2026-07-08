export function debouncePromise<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  delayMs: number
): (...args: Args) => Promise<T> {
  let timerId: any = null;
  let pendingCallbacks: Array<{
    resolve: (val: T | PromiseLike<T>) => void;
    reject: (err: any) => void;
  }> = [];
  let latestArgs: Args | null = null;

  return function (...args: Args): Promise<T> {
    if (timerId) clearTimeout(timerId);
    latestArgs = args;

    return new Promise<T>((resolve, reject) => {
      pendingCallbacks.push({ resolve, reject });

      timerId = setTimeout(async () => {
        const callbacks = pendingCallbacks;
        const currentArgs = latestArgs!;
        pendingCallbacks = [];
        latestArgs = null;
        timerId = null;
        try {
          const res = await fn(...currentArgs);
          for (const cb of callbacks) {
            cb.resolve(res);
          }
        } catch (err) {
          for (const cb of callbacks) {
            cb.reject(err);
          }
        }
      }, delayMs);
    });
  };
}

export function throttlePromise<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  limitMs: number
): (...args: Args) => Promise<T> {
  let lastRun = 0;
  let activePromise: Promise<T> | null = null;

  return function (...args: Args): Promise<T> {
    const now = Date.now();
    
    if (!activePromise || now - lastRun >= limitMs) {
      lastRun = now;
      activePromise = fn(...args).finally(() => {
        activePromise = null;
      });
    }

    return activePromise;
  };
}

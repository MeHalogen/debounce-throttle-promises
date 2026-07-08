import { describe, it, expect, vi } from 'vitest';
import { debouncePromise } from '../src/index.js';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('debounce-throttle-promises', () => {
  it('should debounce calls and resolve to the latest execution result', async () => {
    let calls = 0;
    const fn = async (val: number) => {
      calls++;
      return val * 2;
    };

    const debounced = debouncePromise(fn, 20);
    const p1 = debounced(1);
    const p2 = debounced(2);

    const r1 = await p1;
    const r2 = await p2;

    expect(r1).toBe(4);
    expect(r2).toBe(4);
    expect(calls).toBe(1);
  });
});

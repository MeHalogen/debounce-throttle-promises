# debounce-throttle-promises

> **Why use debounce-throttle-promises?**
> Standard debounce and throttle functions are fire-and-forget: they execute asynchronously and do not return values to the original callers. Developers cannot capture outcomes or resolve flows after they run.

Promise-aware debounce and throttle wrappers. They return a Promise to all callers, which resolves to the actual execution outcome when the debounced/throttled task eventually fires.

---

## ⚡ Features
* **Promise-based return values**
* **Coalesces multiple calls to resolve to the final execution result**
* **Supports both debounce (wait for quiet) and throttle (maximum rate)**

---

## 📦 Installation
```bash
npm i debounce-throttle-promises
```

---

## 🚀 Usage
```javascript
import { debouncePromise } from 'debounce-throttle-promises';

let calls = 0;
const debouncedFetch = debouncePromise(async (query) => {
  calls++;
  return `Query "${query}" result (call ${calls})`;
}, 300);

// Call multiple times rapidly
const p1 = debouncedFetch('abc');
const p2 = debouncedFetch('abc');

// Both promises will resolve to the outcome of the final execution
console.log(await p1);
console.log(await p2);
```

---

## ⚙️ API Reference
### debouncePromise(fn, delayMs)
### throttlePromise(fn, intervalMs)
* Returns a wrapped function that yields a `Promise` of the return value.

---

## 📺 Demonstration
![Terminal Demo](./demo.gif)

---

## 📄 License
MIT License.

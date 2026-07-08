# debounce-throttle-promises

Promise-aware debounce and throttle utility.

## Usage

```ts
import { debouncePromise } from 'debounce-throttle-promises';

const debounced = debouncePromise(async (val) => val, 250);
```

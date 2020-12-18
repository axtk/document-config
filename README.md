```js
import {getDocumentConfig} from 'document-config';

const transform = {
    initialCount: Number
};

// <meta name="app.initialCount" content="42">
// or
// <html data-app-initial-count="42">
const config = getDocumentConfig({ns: 'app', transform});
// {initialCount: 42}
```

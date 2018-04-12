## [@amarajs/plugin-engine-server](https://github.com/amarajs/plugin-engine-server)

Enables AmaraJS features in a server environment.

### Installation

`npm install --save @amarajs/plugin-engine-server`

### Usage

```javascript
const Koa = require('koa');
const Amara = require('@amarajs/core');
const AmaraServer = require('@amarajs/plugin-engine-server');

const server = new Koa();
const amara = Amara([
    AmaraServer(server)
]);

server.use(...); // add Koa middleware here

amara.bootstrap(8080);
```

### Description

The `@amarajs/plugin-engine-server` middleware provides [`@amarajs/core`](https://github.com/amarajs/core) with the ability to map each feature's `target` selector strings to HTTP requests. For example:

```javascript
amara.add({
    type: 'some-custom-type',
    // @amarajs/plugin-engine-server will use these
    // target strings to identify which HTTP requests
    // this feature should be applied to
    targets: ['GET /index.js', 'POST /users/*'],
    apply: () => {}
});
```

### Customization

This plugin accepts a [Koa](https://github.com/koajs/koa) server instance.

### Contributing

If you have a feature request, please create a new issue so the community can discuss it.

If you find a defect, please submit a bug report that includes a working link to reproduce the problem (for example, using [this fiddle](https://jsfiddle.net/04f3v2x4/)). Of course, pull requests to fix open issues are always welcome!

### License

The MIT License (MIT)

Copyright (c) Dan Barnes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

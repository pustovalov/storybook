#!/usr/bin/env node

console.log('boot', Date.now())

require("esm")(module)('../dist/server');

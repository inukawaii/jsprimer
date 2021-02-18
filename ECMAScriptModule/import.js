import { foo, bar } from './module.js';
console.log(foo);
console.log(bar);

import { foo1 } from './module.js';
console.log(foo1)

// 名前付きインポート
import { foo as myFoo } from './module.js';
console.log(myFoo
  )

// default import
// import myModule from './module.js';
// console.log(myModule)

import myModule, { foo as foo3 } from './module.js'
console.log(foo3)
console.log(myModule)
// const foo = 'foo';
// export { foo };

// export function bar() {};

export const foo = 'foo';
export function bar() {}

// 名前つきexport 
const internalFoo = 'foo';
export { internalFoo as foo1 }

// default export
const foo2 = 'foo';
// export default foo2;

// この形式でも可能だがdefaultを使っての定義は複数行にわたってはできないみたい…？
// export default function() {
//   console.log('default export')
// }

export default {
  baz: 'baz'
}

{
  function blockTime(timeout) {
    const startTime = Date.now();
    while (true) {
      const diffTime = Date.now() - startTime;
      if (diffTime >= timeout) {
        return;
      }
    }
  }

  console.log('1');
  setTimeout(() => {
    console.log('3')
    blockTime(1000);
    console.log('4')
  }, 10)
  console.log('2')
}
{
  function blockTime(timeout) {
    const startTime = Date.now();
    while(true){
      const diffTIme = Date.now() - startTime;
      if(diffTIme >= timeout) {
        return;
      }
    }
  }
  const startTime = Date.now();
  setTimeout(() => {
    const endTime = Date.now();
    console.log(`非同期処理のコールバックが呼ばれるまで${endTime - startTime}ミリ秒かかりました`)
  })
  console.log('start block')
  blockTime(1000)
  console.log('end block')
}
{
  try {
    throw new Error('同期')
  } catch (error) {
    console.log('catch')
  }
  console.log('////実行')
}
{
  try {
    setTimeout(() => {
      throw new Error('同期')
    }, 10)
  } catch(error) {
    // 非同期処理のエラーはキャッチできない
  }
  console.log('//実行される')
}
{
  setTimeout(() => {
    try{
      throw new Error('error');
    } catch (error) {
      console.log('error catch')
    }
  }, 10)
}
// error first callback
{
  function dummyFetch(path, callback) {
    setTimeout(() => {
      if(path.startsWith('/success')) {
        callback(null, {body: 'response'})
      } else {
        callback(new Error('not found'));
      }
    }, 1000 * Math.random())
  }
  dummyFetch('/success/data', (error, response) => {
    if(error) {
      // 実行されない
    } else {
      console.log(response);
    }
  })
  dummyFetch('/failure/data', (error, response) => {
    if (error) {
      console.log(error.message);
    } else {
      // 実行されない
    }
  })
}
{
  function dummyFetch(path, successCallback, failureCallback) {
    setTimeout(() => {
      if(path.startsWith('/success')) {
        successCallback({body: 'response'});
      } else {
        failureCallback(new Error('not found'))
      }
    }, 1000 * Math.random());
  }
}
// promise
{
  asyncTask((error, result) => {
    if(error) {

    } else {

    }
  })
}
{
  asyncPromiseTask().then(() => {
    // success 
  }).catch(() => {
    // failure
  });
}
{
  const executor = (resolve, reject) => {
    // success => resolve
    // failure => reject
  }
  const promise = new Promise(executor);
}
{
  const promise = new Promise((resolve, reject) => {
  })
  const onFulfilled = () => {
    console.log("resolveされたときに呼ばれる");
  }
  const onRejected = () => {
    console.log("reject");
  }
  promise.then(onFulfilled, onRejected);
}
{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(path.startsWith('/success')) {
          resolve({ body: 'response' });
        } else {
          reject(new Error('found'));
        }
      }, 1000 * Math.random());
    })
  }
  dummyFetch('/success/data').then(function onFulfilled(response) {
    console.log(response);
  }, function onRejected(error) {

  })
  dummyFetch('/failure/data').then(function onFulfilled(response) {
    console.log(response);
  }, function onRejected(error) {
    console.log(error);
  })
}
{
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeoutMs)
    })
  }
  delay(10).then(() => {
    console.log('afeter 10ms')
  })
}
{
  function errorPromise(message) {
    return new Promise((resolve, reject) => {
      reject(new Error(message));
    })
  }
  errorPromise('thenでエラーハンドリング').then(undefined, (error) => {
    reject(new Error(message));
  })
  errorPromise('catchでエラーハンドリング').catch(error => {
    console.log(error.message);
  })
}
{
  function throwPromise() {
    return new Promise((resolve, reject) => {
      throw new Error('例外が発生');
    })
  }
  throwPromise().catch(error => {
    console.log(error.message);
  })
}
{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      reject(new Error('error'));
      }, 16)
  });
  promise.then(() => {
    console.log('fulfilled')
  }, (error) => {
    // 呼び出されない
  })
}
{
  const fulFilledPromise = Promise.resolve(42);
  fulFilledPromise.then(value => {
    console.log(value);
  })
}
{
  const promise = Promise.resolve();
  promise.then(() => {
    console.log('2. 実行されました')
  })
  console.log('1.')
}
{
  const promise = new Promise((resolve) => {
    console.log('1.');
    resolve();
  });
  promise.then(() => {
    console.log('3.')
  })
  console.log('2.')
}
{
  const rejectedPromise = Promise.reject(new Error('error'));
}
{
  const rejectedPromise = new Promise((resolve, reject) => {
    reject(new Error('error'));
  })
}
{
  Promise.reject(new Error('error')).catch(() => {
    console.log('2.');
  });
  console.log('1')
}
{
  Promise.resolve()
    .then(() => {
      console.log('1')
    })
    .then(() => {
      console.log('2')
    })
}
{
  const firstPromise = Promise.resolve();
  const secondPromise = firstPromise.then(() => {
    console.log('1');
  })
  const thirdPromise = secondPromise.then(() => {
    console.log('2');
  })
}
{
  function asyncTask() {
    return Math.random() > 0.5 
      ? Promise.resolve('success')
      : Promise.reject(new Error('error'))
  }
  asyncTask()
    .then(function onFulfilled(value) {
      console.log(value)
    })
    .catch(function onRejected(error) {
      console.log(error.message)
    })
}
{
  const rejectedPromise = Promise.reject(new Error('error'))
  rejectedPromise.then(() => {

  }).then(() => {

  }).catch((error) => {
    console.log(error.message)
  })
}
{
  Promise.resolve().then(() => {
    throw new Error('error')
  }).then(() => {

  }).catch((error) => {
    // エラーをキャッチする
    console.log(error.message)
  })
}
{
  Promise.reject(new Error('error')).catch((error) => {
    console.log(error)
  }).then(() => {
    console.log('thenが呼び出される')
  })
}
{
  Promise.resolve(1).then((value) => {
    console.log(value);
    return value * 2;
  }).then(value => {
    return value * 2;
  }).then(value => {
    console.log(value)
  }).then(value => {
    console.log(value)
  })
}
{
  Promise.resolve().then(function onFulfilledA() {
    return Promise.reject(new Error('error'))
  }).then(function onFulfilledB() {
    console.log('呼び出されない')
  }).catch(function onRejected(error) {
    console.log(error.message)
  }).then(function onFulfilledC() {
    console.log('呼び出される')
  })
}
{
  function main() {
    return Promise.reject(new Error('error'))
  }
  main().catch((error) => {
    console.log(error)
    return Promise.reject(error);
  }).then(() => {
    // rejectedが継続している
  }).catch(error => {
    console.log('error')
  })
}
{
  const promise = Math.random() < 0.5 ? Promise.resolve() : Promise.reject();
  promise.then(() => {
    console.log('then')
  }).catch((error) => {
    console.log('catch')
  }).finally(() => {
    console.log('finally')
  })
}
{
  function dummyFetch(path){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(path.startsWith('/resource')) {
          resolve({body: 'response'})
        } else {
          reject(new Error('error'))
        }
      }, 1000 * Math.random());
    })
  }
  let isLoading = true;
  dummyFetch('/resource/A').then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    isLoading = false;
    console.log('finally')
  })
}
{
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timeoutMs);
      }, timeoutMs);
    })
  }
  const promise1 = delay(1)
  const promise2 = delay(2)
  const promise3 = delay(3)
  
  Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
  })
}
{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith('/resource')) {
          resolve({body: 'body'})
        } else {
          reject(new Error('not found'))
        }
      })
    })
  }
  const fetchedPromise = Promise.all([
    dummyFetch('/resource/A'),
    dummyFetch('/resource/B')
  ])
  fetchedPromise.then(([responseA, responseB]) => {
    console.log(responseA.body);
    console.log(responseB.body);
  })
}
{
  function dummyFetch(path){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(path.startsWith('/resource')) {
          resolve({body: 'response'})
        } else {
          reject(new Error('error'))
        }
      }, 1000 * Math.random());
    })
  }
  const fetchedPromise = Promise.all([
    dummyFetch('/resource/A'),
    dummyFetch('/not_found/B')
  ])
  fetchedPromise.then(([responseA, responseB]) => {

  }).catch((error) => {
    console.log(error)
  })
}
{
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timeoutMs);
      }, timeoutMs);
    })
  }
  const racePromise = Promise.race([
    delay(1),
    delay(32),
    delay(64),
    delay(128),
  ])
  racePromise.then(value => {
    console.log(value)
  })
}
{
  function timeout(timeoutMs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
      }, timeoutMs);
    });
  }
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith("/resource")) {
          resolve({ body: `Response body of ${path}` });
        } else {
          reject(new Error("NOT FOUND"));
        }
      }, 1000 * Math.random());
    });
  }
  Promise.race([
    dummyFetch('/resource/data'),
    timeout(500)
  ]).then(response => {
    console.log(response.body)
  }).catch(error => {
    console.log(error.message)
  })
}
// async
{
  async function doAsync() {
    return 'value';
  }
  doAsync().then(value => {
    console.log(value)
  })
}
{
  async function fn1() {}
  const fn2 = async function() {}
  const fn3 = async() => {}
  const obj = { async method() {}}
}
{
  // 1
  async function resolveFn() {
    return 'value'
  }
  resolveFn().then(value => {
    console.log(value)
  })

  // 2 
  async function rejectFn() {
    return Promise.reject(new Error('error'))
  }
  rejectFn().catch(error => {
    console.log(error.message)
  })

  // 3
  async function exceptionFn() {
    throw new Error('exception')
  }
  exceptionFn().catch((value) => {
    console.log(error.message)
  })
}
{
  async function doAsync() {
    // 
  }
  async function asyncMain() {
    await doAsync();
    console.log('非同期処理実施後に実施')
  }
}
{
  async function asyncMain() {
    const value = await Promise.resolve(42);
    console.log(value)
  }
  asyncMain()
  // Promiseを使う場合
  async function asyncMain2() {
    const value = await Promise.reject(new Error('error'))
  }
  asyncMain2().catch(error => {
    console.log(error.message)
  })
}
{
  async function asyncMain() {
    try {
      const value = await Promise.reject(new Error('error'))
    } catch (error) {
      console.log(error.message)
    }
  }
  asyncMain().catch(error => { 
    console.log(error) // 無視される
  })
}
{
  function dummyFetch(path){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(path.startsWith('/resource')) {
          resolve({body: 'response'})
        } else {
          reject(new Error('error'))
        }
      }, 1000 * Math.random());
    })
  }
  function fetchAB() {
    const results = [];
    return dummyFetch('/resource/A').then(response => {
      results.push(response.body)
      return dummyFetch('/resource/B')
    }).then(response => {
      results.push(response.body)
      return results;
    })
  }
  fetchAB().then((results) => {
    console.log(results)
  })
}
{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(path.startsWith('/resource')) {
          resolve({body: 'response'})
        } else {
          reject(new Error('error'))
        }
      }, 1000 * Math.random());
    })
  }
  async function fetchResources(resources) {
    const results = []
    for(let i = 0; i < resources.length; i ++) {
      const resource = resource[i];
      const response = await dummyFetch(resource);
      results.push(response.body)
    }
    return results;
  }
  const resources = [
    '/resource/A', '/resource/B'
  ]
  fetchResources(resources).then((results) => {
    console.log(results)
  })
}
{
  function dummyFetch(path) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(path.startsWith('/resource')) {
          resolve({body: 'response'})
        } else {
          reject(new Error('error'))
        }
      }, 1000 * Math.random());
    })
  }
  async function fetchAllResources(resources) {
    const promises = resources.map(function(resource){
      return dummyFetch(resource);
    })
    const responses = await Promise.all(promises);
    return responses.map((response) => {
      return response.body;
    })
  }
  fetchAllResources(resources).then((results) => {
    console.log(results)
  })
}
{
  function main() {
    await Promise.resolve() // SyntaxError
  }
}
{
  async function asyncMain() {
    await new Promise((resolve) => {
      setTimeout(resolve, 16)
    })
  }
  console.log('1')
  asyncMain().then((fun) => {
    console.log('3')
  })
  console.log('2')
}

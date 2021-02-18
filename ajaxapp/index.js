console.log("index.js: loaded");
const userId = 'js-primer-example';
fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
  .then((response) => {
    console.log(response.status);
    return response.json().then((userInfo) => {
      console.log(userInfo);
    })
  })
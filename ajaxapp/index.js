console.log("index.js: loaded");
const userId = 'js-primer-example';

function fetchUserInfo(userId) {
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
        console.error('エラーレスポンス', response);
      } else {
        return response.json().then((userInfo) => {
          console.log(userInfo);
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
}
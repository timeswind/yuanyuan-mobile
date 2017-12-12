import moment from 'moment'
import configureStore from '../redux/store';
const { store } = configureStore
import {
  API_SERVER
} from '../globalConfig'
export function uploadImageWithFolder(image, folderName) {
  var today = new Date();
  const bucket = "yuanyuanofficial" // yuanyuanofficial
  const region = "us-east-1" // us-east-1
  const folder = `${folderName}/` // 'article_images/'
  const expiration = new Date(today.getTime() + 10*60000).toISOString() //"2017-09-14T12:00:00.000Z"
  const date = moment().format('YYYYMMDD')
  const TOKEN = store.getState().auth.token
  let localUri = image
  let filename = image.split('/').pop()
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  return new Promise(function (resolve, reject) {
    url = `${API_SERVER}/protect/upload-pic-token?bucket=${bucket}&region=${region}&folder=${folder}&expiration=${expiration}&date=${date}&filename=${filename}`
    fetch(url, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .then((response) => response.json())
    .then(function (responseJson) {
      console.log(responseJson)
      if (responseJson.success) {
        const Policy = responseJson.Policy
        const XAmzSignature = responseJson["X-Amz-Signature"]
        const key = responseJson.key
        var formData = new FormData();
        formData.append("Key", key);
        formData.append("acl", "public-read")
        formData.append("Content-Type", `${type}`)
        formData.append("x-amz-meta-uuid", "14365123651274")
        formData.append("X-Amz-Credential", `AKIAJEIJLWEBQFRI2M7Q/${date}/${region}/s3/aws4_request`)
        formData.append("x-amz-meta-tag", "")
        formData.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256")
        formData.append("X-Amz-Date", `${date}T000000Z`)
        formData.append("Policy", Policy)
        formData.append("X-Amz-Signature", XAmzSignature)
        formData.append("file", { uri: image, name: filename, type })
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://yuanyuanofficial.s3.amazonaws.com/");
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve({ data: { link: `https://yuanyuanofficial.s3.amazonaws.com/${key}` } });
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.send(formData);
      }
    });

    })
    .catch((error) => console.log(error))
}

export function uploadArticleImage(image) {
  var today = new Date();
  const bucket = "yuanyuanofficial" // yuanyuanofficial
  const region = "us-east-1" // us-east-1
  const folder = "article_images/" // 'article_images/'
  const expiration = new Date(today.getTime() + 10*60000).toISOString() //"2017-09-14T12:00:00.000Z"
  const date = moment().format('YYYYMMDD')

  return new Promise(function (resolve, reject) {
    axios.get(`/api/protect/upload-pic-token?bucket=${bucket}&region=${region}&folder=${folder}&expiration=${expiration}&date=${date}&filename=${image.name}`)
    .then(function (response) {
      if (response.data.success) {
        const Policy = response.data.Policy
        const XAmzSignature = response.data["X-Amz-Signature"]
        const key = response.data.key
        var formData = new FormData();
        formData.append("Key", key);
        formData.append("acl", "public-read")
        formData.append("Content-Type", `${image.type}`)
        formData.append("x-amz-meta-uuid", "14365123651274")
        formData.append("X-Amz-Credential", `AKIAJEIJLWEBQFRI2M7Q/${date}/${region}/s3/aws4_request`)
        formData.append("x-amz-meta-tag", "")
        formData.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256")
        formData.append("X-Amz-Date", `${date}T000000Z`)
        formData.append("Policy", Policy)
        formData.append("X-Amz-Signature", XAmzSignature)
        formData.append("file", image)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://yuanyuanofficial.s3.amazonaws.com/");
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve({ data: { link: `https://yuanyuanofficial.s3.amazonaws.com/${key}` } });
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.send(formData);
      }
    })
  });
}

export function uploadAvatarImage(image) {
  var today = new Date();
  const bucket = "yuanyuanofficial" // yuanyuanofficial
  const region = "us-east-1" // us-east-1
  const folder = "avatar/" // 'article_images/'
  const expiration = new Date(today.getTime() + 10*60000).toISOString() //"2017-09-14T12:00:00.000Z"
  const date = moment().format('YYYYMMDD')

  return new Promise(function (resolve, reject) {
    axios.get(`/api/protect/upload-pic-token?bucket=${bucket}&region=${region}&folder=${folder}&expiration=${expiration}&date=${date}&filename=${image.name}`)
    .then(function (response) {
      if (response.data.success) {
        const Policy = response.data.Policy
        const XAmzSignature = response.data["X-Amz-Signature"]
        const key = response.data.key
        var formData = new FormData();
        formData.append("Key", key);
        formData.append("acl", "public-read")
        formData.append("Content-Type", `${image.type}`)
        formData.append("x-amz-meta-uuid", "14365123651274")
        formData.append("X-Amz-Credential", `AKIAJEIJLWEBQFRI2M7Q/${date}/${region}/s3/aws4_request`)
        formData.append("x-amz-meta-tag", "")
        formData.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256")
        formData.append("X-Amz-Date", `${date}T000000Z`)
        formData.append("Policy", Policy)
        formData.append("X-Amz-Signature", XAmzSignature)
        formData.append("file", image)
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://yuanyuanofficial.s3.amazonaws.com/");
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve({ data: { link: `https://yuanyuanofficial.s3.amazonaws.com/${key}` } });
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.send(formData);
      }
    })
  });
}

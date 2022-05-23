import { apiInstance } from "./index.js";

const api = apiInstance();

function storeList(params, success, fail) {
  api
    .get(`/service/searchStore`, { params: params })
    .then(success)
    .catch(fail);
}

export { storeList };

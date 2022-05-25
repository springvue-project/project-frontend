import { apiInstance } from "./index.js";

const api = apiInstance();

function listInterest(id, success, fail) {
  api
    .get(`/interest/${id}`)
    .then(success)
    .catch(fail);
}

function registInterest(param, success, fail) {
  api
    .post(`/interest`, param)
    .then(success)
    .catch(fail);
}

function deleteInterest(param, success, fail) {
  api
    .delete(`/interest/${param.userid}/${param.aptCode}`)
    .then(success)
    .catch(fail);
}

export { listInterest, registInterest, deleteInterest };

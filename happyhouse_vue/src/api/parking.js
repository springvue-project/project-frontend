import { apiInstance, parkingInstance } from "./index.js";

const api = apiInstance();
const parking = houseInstance();

function sidoList(success, fail) {
  api
    .get(`/map/sido`)
    .then(success)
    .catch(fail);
}

function gugunList(params, success, fail) {
  api
    .get(`/map/gugun`, { params: params })
    .then(success)
    .catch(fail);
}

function dongList(params, success, fail) {
  api
    .get(`/map/dong`, { params: params })
    .then(success)
    .catch(fail);
}

function parkingList(params, success, fail) {
  api
    .get(`/park/dong`, { params: params })
    .then(success)
    .catch(fail);
}

export { sidoList, gugunList, dongList, parkingList };

import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

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

function houseList(params, success, fail) {
  api
    .get(`/map/apt`, { params: params })
    .then(success)
    .catch(fail);
}

function houseDealList(params, success, fail) {
  api
    .get(`/map/aptdeal`, { params: params })
    .then(success)
    .catch(fail);
}

function aroundHouseList(params, success, fail) {
  api
    .get(`/map/aroundapt`, { params: params })
    .then(success)
    .catch(fail);
}

function SearchNameHouseList(params, success, fail) {
  api
    .get(`/apart/searchName`, { params: params })
    .then(success)
    .catch(fail);
}

export {
  sidoList,
  gugunList,
  dongList,
  houseList,
  houseDealList,
  aroundHouseList,
  SearchNameHouseList,
};

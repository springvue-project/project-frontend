import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api
    .get(`/announce`, { params: param })
    .then(success)
    .catch(fail);
}

function writeArticle(article, success, fail) {
  api
    .post(`/announce`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function getArticle(no, success, fail) {
  api
    .get(`/announce/${no}`)
    .then(success)
    .catch(fail);
}

function modifyArticle(article, success, fail) {
  api
    .put(`/announce/${article.no}`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteArticle(no, success, fail) {
  api
    .delete(`/announce/${no}`)
    .then(success)
    .catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };

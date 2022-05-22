import { apiInstance } from "./index.js";

const api = apiInstance();

function writeComment(comment, success, fail) {
  api
    .post(`/comment/${comment.articleno}`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

function listComment(articleno, success, fail) {
  api
    .get(`/comment/${articleno}`)
    .then(success)
    .catch(fail);
}

// function modifyComment(article, success, fail) {
//   api
//     .put(`/comment/${article.no}`, JSON.stringify(article))
//     .then(success)
//     .catch(fail);
// }

function deleteComment(commentno, success, fail) {
  api
    .delete(`/comment/${commentno}`)
    .then(success)
    .catch(fail);
}

export { writeComment, listComment, deleteComment };

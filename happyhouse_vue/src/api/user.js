import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api
    .post(`/user/login`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api
    .get(`/user/info/${userid}`)
    .then(success)
    .catch(fail);
}

// function logout(success, fail)
async function findPwd(userid, success, fail) {
  await api
    .post(`/user/findpwd/${userid}`)
    .then(success)
    .catch(fail);
}
async function userModify(user, success, fail) {
  await api
    .put(`/user/modify`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}
async function changePwd(pwdInfo, success, fail) {
  await api
    .put(`/user/modifypwd`, JSON.stringify(pwdInfo))
    .then(success)
    .catch(fail);
}
async function regist(user, success, fail) {
  await api
    .post(`/user/regist`, JSON.stringify(user))
    .then(success)
    .catch(fail);
}

// userModify() {
//   http.put(`user/modify`, this.userInfo).then((data) => {
//     if (data.status == "200") {
//       alert("수정 완료");
//       this.modifyMode = !this.modifyMode;
//     }
//   });
// },

export { login, findById, findPwd, userModify, changePwd, regist };

import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

import store from "@/store/index.js";

//Parking Service
import Parking from "./views/Parking.vue";
import ParkingList from "./components/Parking/ParkingList.vue";

//Houas Search Service
import HouseView from "@/views/HouseView.vue";

//Qna Board
import Qna from "./views/Qna.vue";
import QnaList from "./components/Qna/QnaList.vue";
import QnaDetail from "./components/Qna/QnaDetail.vue";
import QnaModify from "./components/Qna/QnaModify.vue";
import QnaRegister from "./components/Qna/QnaRegister.vue";
// User
import UserView from "@/views/UserView.vue";
import UserLogin from "@/components/User/UserLogin.vue";
import UserRegist from "@/components/User/UserRegist.vue";
import UserProfile from "@/components/User/UserProfile.vue";
Vue.use(Router);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const getUserInfo = store._actions["userStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    next({ name: "signIn" });
    // router.push({ name: "signIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
    },
    {
      path: "/parking",
      name: "parking",
      components: { default: Parking, header: MainNavbar, footer: MainFooter },
      redirect: "/parking/list",
      children: [
        {
          path: "list",
          name: "list",
          component: ParkingList,
        },
      ],
    },
    {
      path: "/house",
      name: "house",
      components: {
        default: HouseView,
        header: MainNavbar,
        footer: MainFooter,
      },
    },
    {
      path: "/qna",
      name: "qna",
      components: { default: Qna, header: MainNavbar, footer: MainFooter },
      redirect: "/qna/qnalist",
      children: [
        {
          path: "qnalist",
          name: "qnalist",
          component: QnaList,
        },
        {
          path: "qnawrite",
          name: "qnawrite",
          beforeEnter: onlyAuthUser,
          component: QnaRegister,
        },
        {
          path: "qnadetail/:articleno",
          name: "qnadetail",
          beforeEnter: onlyAuthUser,
          component: QnaDetail,
        },
        {
          path: "qnamodify/:articleno",
          name: "qnamodify",
          beforeEnter: onlyAuthUser,
          component: QnaModify,
        },
      ],
    },
    {
      path: "/user",
      name: "user",
      redirect: "/user/login",
      component: UserView,
      children: [
        {
          path: "login",
          name: "login",
          components: {
            default: UserLogin,
            header: MainNavbar,
            footer: MainFooter,
          },
          props: {
            header: { colorOnScroll: 400 },
          },
        },
        {
          path: "regist",
          name: "regist",
          components: {
            default: UserRegist,
            header: MainNavbar,
            footer: MainFooter,
          },
          props: {
            header: { colorOnScroll: 400 },
          },
        },
        {
          path: "profile",
          name: "profile",
          beforeEnter: onlyAuthUser,
          components: {
            default: UserProfile,
            header: MainNavbar,
            footer: MainFooter,
          },
          props: {
            header: { colorOnScroll: 400 },
            footer: { backgroundColor: "black" },
          },
        },
      ],
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

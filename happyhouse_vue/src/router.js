import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

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
import QnaDelete from "./components/Qna/QnaDelete.vue";
import QnaRegister from "./components/Qna/QnaRegister.vue";
// User
import UserView from "@/views/UserView.vue";
import UserLogin from "@/components/User/UserLogin.vue";
import UserRegist from "@/components/User/UserRegist.vue";
import UserProfile from "@/components/User/UserProfile.vue";
Vue.use(Router);

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
          component: QnaRegister,
        },
        {
          path: "qnadetail/:articleno",
          name: "qnadetail",
          component: QnaDetail,
        },
        {
          path: "qnamodify/:articleno",
          name: "qnamodify",
          component: QnaModify,
        },
        {
          path: "qnadelete/:articleno",
          name: "qnadelete",
          component: QnaDelete,
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

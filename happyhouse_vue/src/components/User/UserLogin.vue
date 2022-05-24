<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-40 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <div class="md-form-group btn-pwd" slot="buttons">
                <md-button
                  class="md-simple classic-modal"
                  @click="classicModal = true"
                  >Forget Password...</md-button
                >
                <modal v-if="classicModal" @close="classicModalHide">
                  <template slot="header">
                    <h4 class="modal-title">비밀번호 찾기</h4>
                    <md-button
                      class="md-simple md-just-icon md-round modal-default-button"
                      @click="classicModalHide"
                    >
                      <md-icon>clear</md-icon>
                    </md-button>
                  </template>

                  <template slot="body">
                    <md-field>
                      <label>아이디</label>
                      <md-input v-model="findId" ref="findid"></md-input>
                    </md-field>
                    <p>{{ showMsg }}</p>
                  </template>

                  <template slot="footer">
                    <md-button class="md-success md-simple" @click="findPwd"
                      >찾기</md-button
                    >
                  </template>
                </modal>
              </div>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>ID...</label>
                <md-input v-model="userInfo.userId" ref="userid"></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input
                  v-model="userInfo.userPwd"
                  type="password"
                  ref="password"
                ></md-input>
              </md-field>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="confirm"
              >
                Login
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import { mapState, mapGetters, mapActions } from "vuex";
import { Modal } from "@/components";
import { findPwd } from "@/api/user";

const userStore = "userStore";

export default {
  name: "UserLogin",
  components: {
    LoginCard,
    Modal,
  },
  bodyClass: "login-page",
  data() {
    return {
      findId: "",
      msg: "",
      classicModal: false,
      userInfo: {
        userId: "",
        userPwd: "",
      },
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/HappyApart.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
    showMsg: function() {
      return this.msg;
    },
    ...mapState(userStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapGetters(["loginCheck"]),
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.userInfo);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "index" });
      } else {
        alert("회원 정보가 일치하지 않습니다!");
        this.userId = "";
        this.userPwd = "";
      }
    },
    findPwd() {
      findPwd(this.findId, (data) => {
        this.msg = `회원님의 비밀번호는 ${data.data.pwd} 입니다.`;
      });
    },
    classicModalHide() {
      this.msg = "";
      this.findId = "";
      this.classicModal = false;
    },
  },
};
</script>

<style lang="css" scoped>
.btn-pwd {
  float: right;
  left: 25px;
  margin-top: 30px;
}
</style>

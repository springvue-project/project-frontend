<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand">
            <h3>Profile</h3>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img
                    :src="img"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid img-bg-white"
                  />
                </div>
                <div class="name">
                  <h3 class="title">
                    {{ userInfo.userid }}
                  </h3>
                </div>
                <md-field>
                  <label>아이디</label>
                  <md-input readonly v-model="userInfo.userId"></md-input>
                </md-field>
                <md-field>
                  <label>이름</label>
                  <md-input
                    v-if="modifyMode"
                    v-model="userInfo.userName"
                  ></md-input>
                  <md-input
                    v-else
                    readonly
                    v-model="userInfo.userName"
                  ></md-input>
                </md-field>
                <md-field>
                  <label>이메일</label>
                  <md-input
                    v-if="modifyMode"
                    v-model="userInfo.userEmail"
                  ></md-input>
                  <md-input
                    v-else
                    readonly
                    v-model="userInfo.userEmail"
                  ></md-input>
                </md-field>
                <md-field>
                  <label>전화번호</label>
                  <md-input
                    v-if="modifyMode"
                    v-model="userInfo.phoneNum"
                  ></md-input>
                  <md-input
                    v-else
                    readonly
                    v-model="userInfo.phoneNum"
                  ></md-input>
                </md-field>

                <md-field v-if="modifyMode">
                  <label>비밀번호</label>
                  <md-input v-model="inputPwd" type="password"></md-input>
                  <md-button
                    id="tmp"
                    v-if="modifyMode"
                    class="md-simple classic-modal"
                    @click="classicModal = true"
                    >변경</md-button
                  >
                  <modal v-if="classicModal" @close="classicModalHide">
                    <template slot="header">
                      <h4 class="modal-title">비밀번호 변경</h4>
                      <md-button
                        class="md-simple md-just-icon md-round modal-default-button"
                        @click="classicModalHide"
                      >
                        <md-icon>clear</md-icon>
                      </md-button>
                    </template>

                    <template slot="body">
                      <md-field>
                        <label>현재 비밀번호</label>
                        <md-input
                          type="password"
                          v-model="currentPwd"
                          ref="currentpwd"
                        ></md-input>
                      </md-field>
                      <md-field>
                        <label>새 비밀번호</label>
                        <md-input
                          type="password"
                          v-model="newPwd"
                          ref="newpwd"
                        ></md-input>
                      </md-field>
                      <div class="alert alert-warning">
                        <div class="container">
                          <button
                            type="button"
                            aria-hidden="true"
                            class="close"
                            @click="
                              (event) => removeNotify(event, 'alert-warning')
                            "
                          >
                            <md-icon>clear</md-icon>
                          </button>
                          <div class="alert-icon">
                            <md-icon>warning</md-icon>
                          </div>
                          <br />비밀번호 변경 시, 수정 내역은 저장되지 않고 다시
                          로그인 하셔야 합니다.
                        </div>
                      </div>
                    </template>

                    <template slot="footer">
                      <md-button class="md-success md-simple" @click="changePwd"
                        >변경</md-button
                      >
                    </template>
                  </modal>
                </md-field>
              </div>
              <div class="btn">
                <md-button
                  v-if="modifyMode"
                  class="md-success"
                  @click="userModify"
                  >Complete</md-button
                >
                <md-button v-else class="md-success" @click="changeMode"
                  >Edit</md-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Modal } from "@/components";
import { userModify, changePwd } from "@/api/user";
const userStore = "userStore";

export default {
  name: "profile",
  components: {
    Modal,
  },
  bodyClass: "profile-page",
  data() {
    return {
      modifyMode: false,
      classicModal: false,

      inputPwd: "",
      currentPwd: "",
      newPwd: "",
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/HappyApart.jpg"),
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/IconBros.png"),
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    // user() {
    //   console.log(this.loginUser);
    //   http.get(`user/detail/${this.loginUser.userId}`).then((data) => {
    //     if (data.status == "200") {
    //       console.log(data.data.userId);
    //       this.userInfo = data.data;
    //     }
    //   });
    // },
    changeMode() {
      this.modifyMode = true;
    },
    userModify() {
      if (this.inputPwd != this.userInfo.userPwd || this.inputPwd === "") {
        alert("현재 비밀번호를 입력해주세요");
      } else {
        userModify(this.userInfo, (data) => {
          if (data.status == "200") {
            alert("수정 완료");
            this.modifyMode = !this.modifyMode;
          }
        });
      }
    },
    classicModalHide() {
      this.classicModal = false;
    },
    changePwd() {
      if (!this.currentPwd) {
        this.$refs.currentpwd.$el.focus();
        return;
      }
      if (!this.newPwd) {
        this.$refs.newpwd.$el.focus();
        return;
      }

      let pwdInfo = {
        userId: this.userInfo.userId,
        currentPwd: this.currentPwd,
        newPwd: this.newPwd,
      };

      changePwd(
        pwdInfo,
        (data) => {
          if (data.status == "200") {
            alert("비밀번호가 변경되었습니다.");
            this.modifyMode = !this.modifyMode;

            //비밀번호 변경 후 로그아웃
            this.SET_IS_LOGIN(false);
            this.SET_USER_INFO(null);
            sessionStorage.removeItem("access-token");
            if (this.$route.path != "/") this.$router.push({ name: "index" });
          } else {
            alert("비밀번호 변경 중, 오류 발생");
          }
          this.currentPwd = "";
          this.newPwd = "";
          this.classicModal = false;
        },
        (err) => {
          if (err.response.status == 403) {
            alert("현재 비밀번호가 틀렸습니다.");
          }
        },
      );
    },
    removeNotify(e, notifyClass) {
      var target = e.target;
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode;
      }
      return target.parentNode.removeChild(target);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  margin: 10px 0;
}
.brand h3 {
  color: white;
  font-size: 5.5rem;
  font-weight: 600;
  display: inline-block;
  position: relative;
  line-height: 1.15em;
  text-shadow: 0px 15px 102.86px rgb(0 0 0 / 70%),
    0px 15px 40.02px rgb(0 0 0 / 21%);
}
.section {
  padding: 0;
}
.img-bg-white {
  background-color: white;
}
.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>

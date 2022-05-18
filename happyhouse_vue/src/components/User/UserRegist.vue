<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-40 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Regist</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>Name...</label>
                <md-input v-model="user.userName"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>person</md-icon>
                <label>ID...</label>
                <md-input v-model="user.userId"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input v-model="user.userPwd" type="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>smartphone</md-icon>
                <label>Phone...</label>
                <md-input v-model="user.phoneNum"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="user.userEmail" type="email"></md-input>
              </md-field>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="regist"
              >
                Submit
              </md-button>
              <md-button
                slot="footer"
                class="md-simple md-danger md-lg"
                @click="reset"
              >
                Reset
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
import http from "@/api/http";

export default {
  components: {
    LoginCard,
  },
  bodyClass: "login-page",
  data() {
    return {
      user: {
        userName: "",
        userId: "",
        userPwd: "",
        userEmail: "",
        phoneNum: "",
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
  },
  methods: {
    reset() {
      (this.user.userName = ""),
        (this.user.userId = ""),
        (this.user.userPwd = ""),
        (this.user.userEmail = ""),
        (this.user.phoneNum = "");
    },
    regist() {
      http.post(`/user/regist`, this.user).then((response) => {
        if (response.status == "200") {
          alert("회원가입 성공");
          this.$router.push("/user/login");
        } else {
          alret("회원가입 실패");
        }
      });
    },
  },
};
</script>

<style lang="css"></style>

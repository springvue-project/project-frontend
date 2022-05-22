<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show><h3>글보기</h3></b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-left">
          <b-button variant="outline-primary" @click="listArticle"
            >목록</b-button
          >
        </b-col>
        <div v-show="userInfo.manager === 'manager' ? true : false">
          <b-col class="text-right">
            <b-button
              variant="outline-info"
              size="sm"
              class="mr-2"
              @click="moveModifyArticle"
              >글수정</b-button
            >
            <b-button variant="outline-danger" size="sm" @click="deleteArticle"
              >글삭제</b-button
            >
          </b-col>
        </div>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="
              `<h3>${article.no}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`
            "
            class="mb-2"
            border-variant="dark"
            no-body
          >
            <b-card-body class="text-left">
              <div v-html="message"></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle } from "@/api/announce";
import { mapState } from "vuex";

const userStore = "userStore";
export default {
  name: "announcedetail",
  components: {},
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getArticle(
      this.$route.params.no,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      },
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "announcelist" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "announcemodify",
        params: { no: this.article.no },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        deleteArticle(this.article.no, () => {
          this.$router.push({ name: "announcelist" });
        });
      }
    },
  },
};
</script>

<style></style>

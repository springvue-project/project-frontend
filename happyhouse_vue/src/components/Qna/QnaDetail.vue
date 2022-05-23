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
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="
              `<h3>${article.articleno}.
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
      <h5 style="margin-top: 15px">Comment</h5>
      <comment-list style="margin-top: 1em" />
      <comment-input />
    </b-container>
  </div>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle } from "@/api/qna";
import CommentInput from "@/components/Comment/CommentInput.vue";
import CommentList from "@/components/Comment/CommentList.vue";

export default {
  name: "qnadetail",
  components: {
    CommentInput,
    CommentList,
  },
  data() {
    return {
      article: {},
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getArticle(
      this.$route.params.articleno,
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
      this.$router.push({ name: "qnalist" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { articleno: this.article.articleno },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "qnalist" });
        });
      }
    },
  },
};
</script>

<style></style>

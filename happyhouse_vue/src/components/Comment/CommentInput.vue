<template>
  <div>
    <b-form-textarea
      id="textarea-state"
      v-model="comment.content"
      :state="comment.content.length <= 1000"
      maxlength="1000"
      placeholder="댓글 입력..."
      rows="3"
    >
    </b-form-textarea>
    <div class="row" style="margin-top:5px">
      <div class="w-50">
        <p>최대 500자 까지 입력가능합니다</p>
      </div>
      <div class="text-right col w-50">
        <div class="textarea-button">
          <b-button variant="success" @click="confirm()">등록</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { writeComment } from "@/api/comment";
const userStore = "userStore";

export default {
  data() {
    return {
      comment: {
        no: 0,
        articleno: 0,
        writer: "",
        content: "",
      },
    };
  },
  created() {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    confirm() {
      this.comment.writer = this.userInfo.userId;
      this.comment.articleno = this.$route.params.articleno;
      console.log(this.comment);
      if (this.comment.content === "") {
        alert("내용을 입력해주세요!!");
      } else {
        writeComment(
          this.comment,
          (response) => {
            if (response.status == "200") {
              alert("댓글등록 성공!");
              this.comment = [];
              this.$router.go(0);
            }
          },
          (response) => {
            if (response.status != "200") {
              alret("댓글등록 실패");
            }
          },
        );
      }
    },
  },
};
</script>

<style scoped>
textarea-buttons {
  display: flex;
}
</style>

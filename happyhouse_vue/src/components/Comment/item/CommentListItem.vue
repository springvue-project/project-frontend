<template>
  <b-container class="bv-example-row">
    <b-form>
      <b-row>
        <b-col class="text-left"
          ><strong>ID: {{ comment.writer }}</strong></b-col
        >
        <b-col
          v-if="
            comment.writer === this.userInfo.userId ||
              this.userInfo.manager === 'manager'
          "
          class="text-right"
        >
          <b-button variant="outline-danger" @click="remove()">
            삭제
          </b-button>
        </b-col>
        <div class="w-100"></div>
        <b-col class="text-left" style="margin-top:0.5em">{{
          comment.content
        }}</b-col>
        <b-row>
          <b-col class="text-left" style="margin-top:0.5em "
            ><p style="color:gray">
              {{ comment.regtime }}
            </p></b-col
          >
        </b-row>
        <!-- <b-row>
          <div class="text-right">
            <b-button variant="danger">삭제</b-button>
          </div>
        </b-row> -->
        <hr style="margin-top: 0.3em" />
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
//import { mapActions } from "vuex";
import { mapState } from "vuex";
import { deleteComment } from "@/api/comment";
const userStore = "userStore";
export default {
  name: "commentlistitem",
  props: {
    comment: Object,
  },
  methods: {
    remove() {
      deleteComment(
        this.comment.no,
        (response) => {
          if (response.status == "200") {
            alert("댓글삭제 성공!");
            this.$router.go(0);
          }
        },
        (response) => {
          if (response.status != "200") {
            alret("댓글삭제 실패");
          }
        },
      );
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

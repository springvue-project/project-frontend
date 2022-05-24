<template>
  <b-card>
    <b-container v-if="comments && comments.length != 0" class="bv-example-row">
      <b-row class="mt-4 mb-4 text-center">
        <b-col>
          <comment-list-item
            v-for="(comment, index) in comments"
            :key="index"
            :comment="comment"
            style="margin-top:1em"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else class="bv-example-row mt-3">
      <b-row>
        <b-col><b-alert show>댓글이 없습니다.</b-alert></b-col>
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
import CommentListItem from "@/components/Comment/item/CommentListItem.vue";
import { listComment } from "@/api/comment.js";

export default {
  name: "commentlist",
  components: {
    CommentListItem,
  },
  data() {
    return {
      comments: [],
    };
  },
  computed: {},
  created() {
    listComment(
      this.$route.params.articleno,
      (response) => {
        this.comments = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
  },
};
</script>

<style></style>

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
      <b-row style="text-align:center">
        <b-col style="text-align:center">
          <div style="text-align:center">
            <div class="bg-dark" style="width:5em; height:5em; margin:auto;">
              <img :src="crying" />
            </div>
          </div>
          <h3 style="margin-top:0.5em">댓글이 없습니다.</h3>
        </b-col>
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
      crying: require(`@/assets/img/crying.png`),
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

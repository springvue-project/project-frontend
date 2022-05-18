<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <qna-input-item type="register" />
  </b-container>
</template>

<script>
import QnaInputItem from "@/components/Qna/item/QnaInputItem.vue";

export default {
  name: "qnawrite",
  components: {
    QnaInputItem,
  },
};
</script>

<style></style>

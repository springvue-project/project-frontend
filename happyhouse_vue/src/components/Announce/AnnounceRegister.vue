<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <announce-input-item type="register" />
  </b-container>
</template>

<script>
import AnnounceInputItem from "@/components/Announce/item/AnnounceInputItem.vue";

export default {
  name: "announcewrite",
  components: {
    AnnounceInputItem,
  },
};
</script>

<style></style>

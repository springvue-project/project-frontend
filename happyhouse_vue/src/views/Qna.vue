<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand">
            <h1>Happy House</h1>
            <br />
            <br />
            <h3>SSAFY 7th BUK Java Class 4</h3>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-javascript">
        <div class="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Qna",
  bodyClass: "index-page",
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
};
</script>
<style lang="css"></style>

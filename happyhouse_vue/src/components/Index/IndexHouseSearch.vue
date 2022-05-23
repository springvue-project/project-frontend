<template>
  <div class="wrapper">
    <div id="navigation">
      <div class="navigation-example bg-dark" :style="bgImage">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="brand">
              <h1 style="margin-top:0.5em">House Search</h1>
              <div style="text-align:center; margin-top: 8em">
                <h4>
                  설정한 지역에 속하는 아파트를 조회하고, 선택한 아파트의 실거래
                  내역을 볼 수 있습니다!!
                </h4>
                <router-link to="/house">
                  <b-button variant="primary" style="margin-top:1em"
                    >바로가기</b-button
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    image: {
      type: String,
      default: require("@/assets/img/HouseSearch.jpg"),
    },
  },
  computed: {
    bgImage() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
};
</script>

<style lang="css"></style>

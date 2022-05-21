<template>
  <div>
    <b-table striped hover :item="dealitem"></b-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetailListItem",
  data() {
    return {
      isColor: false,
      dealitem: this.housedeal,
    };
  },
  props: {
    housedeal: Object,
  },
  methods: {
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>

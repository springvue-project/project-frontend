<template>
  <div v-if="housedeals && housedeals.length != 0">
    <div class="table-div">
      <b-table striped hover :fields="fields" :items="dealitems"></b-table>
    </div>
  </div>
  <div v-else>
    <b-alert show :v-bind="msg">{{ "아파트를 선택해주세요" }}</b-alert>
  </div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDealList",
  components: {
    //HouseDetailListItem,
  },
  data() {
    return {
      fields: [
        {
          key: "dealYear",
          label: "거래연도",
          sortable: true,
        },
        {
          key: "dealAmount",
          label: "거래 금액(단위 : 만원)",
          sortable: true,
        },
        {
          key: "area",
          label: "면적",
          sortable: true,
        },
        {
          key: "floor",
          label: "층 수",
          sortable: true,
        },
      ],
    };
  },
  props: ["msg"],
  computed: {
    ...mapState(houseStore, ["housedeals"]),
    dealitems() {
      return this.housedeals;
    },
  },
  wathch: {
    dealitems: function() {
      console.log("diq");
      this.moveScroll();
    },
  },
  methods: {
    moveScroll() {
      let el = this.$refs.deallist;
      console.log("deallist", el);
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-div {
  text-align: center;
}
</style>

<template>
  <div v-if="housedeals && housedeals.length != 0">
    <h3 ref="deallist">House Deal Info</h3>
    <p>선택하신 아파트의 거래 내역 입니다.</p>
    <hr class="my-2" />
    <div class="table-div">
      <b-table striped hover :fields="fields" :items="dealitems"></b-table>
    </div>
  </div>
  <div v-else>
    <b-alert show>주택 목록이 없습니다.</b-alert>
  </div>
</template>

<script>
import HouseDetailListItem from "@/components/house/HouseDetailListItem.vue";
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

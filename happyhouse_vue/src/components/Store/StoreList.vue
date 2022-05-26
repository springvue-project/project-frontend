<template>
  <b-container
    v-if="this.stores && this.stores.length != 0"
    class="bv-example-row mt-3"
  >
    <store-list-item
      v-for="(store, index) in stores"
      :key="index"
      :store="store"
    />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col
        ><div class="mt-5" v-if="this.stores.length == 0">
          <div class="alert alert-warning">
            <div class="container">
              <div class="alert-icon">
                <md-icon>warning</md-icon>
              </div>
              <b class="msg"> {{ type }} 정보가 없습니다. </b>
            </div>
          </div>
        </div></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import StoreListItem from "@/components/Store/StoreListItem.vue";
import { mapState } from "vuex";

const storeStore = "storeStore";

export default {
  name: "HouseList",
  components: {
    StoreListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(storeStore, ["stores", "type"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
    //주성생성
  },
};
</script>

<style scoped></style>

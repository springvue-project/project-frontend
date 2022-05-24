<template>
  <b-row class="my-2">
    <b-col cols="12" class="align-self-center">
      <div @click="selectStore" class="apt-div gnb">
        <span
          >{{ store.storeName }}
          <md-tooltip md-direction="top">click! 위치 확인</md-tooltip>
        </span>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

const storeStore = "storeStore";

export default {
  name: "StoreListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    store: Object,
  },
  methods: {
    ...mapActions(storeStore, [
      "getStoreList",
      "cleanStoreList",
      "getStoreDetail",
    ]),
    selectStore() {
      this.getStoreDetail(this.store);
    },
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

.img-thumbnail {
  border: white;
}
.store-icon {
  color: #858585;
}
.apt-div {
  font-weight: bold;
  border-left: 3px solid #000000;
  padding-left: 15px;
}
</style>

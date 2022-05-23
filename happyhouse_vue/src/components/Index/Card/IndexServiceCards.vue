<template>
  <div>
    <b-card-group deck>
      <b-card title="House" style="text-align: center">
        <img :src="findHouse" slot="header" style="width:100%" />
        <b-card-text>
          아파트 및 매매 가격이 알고 싶을 때?
          <b-button @click="moveHouse" variant="primary" style="margin-top:1em">
            상세보기
          </b-button>
        </b-card-text>
      </b-card>

      <b-card title="Parking" style="text-align: center">
        <img :src="findParking" slot="header" style="width:100%" />
        <b-card-text>
          주변 공영주차장 정보를 알고 싶을 때?
          <div>
            <b-button
              @click="moveParking"
              variant="primary"
              style="margin-top:1em"
            >
              상세보기
            </b-button>
          </div>
        </b-card-text>
      </b-card>

      <b-card title="Store" style="text-align: center">
        <img :src="findStore" slot="header" style="width:100%" />
        <b-card-text>
          선택된 위치의 주변 상권을 알고 싶을 때?
          <b-button @click="moveStore" variant="primary" style="margin-top:1em">
            상세보기
          </b-button>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      findHouse: require("@/assets/img/Find.png"),
      findParking: require("@/assets/img/Parking.png"),
      findStore: require("@/assets/img/Store.png"),
    };
  },
  methods: {
    moveParking() {
      this.$router.push("#index_parking_search");
    },
    moveStore() {
      this.$router.push("#index_house_arround");
    },
    moveHouse() {
      this.$router.push("#index_house_search");
    },
  },
};
</script>

<style></style>

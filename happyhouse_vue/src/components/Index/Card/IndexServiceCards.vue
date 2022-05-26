<template>
  <div>
    <b-card-group deck>
      <b-card title="Search House" style="text-align: center">
        <img :src="findHouse" slot="header" style="width:100%" />
        <b-card-text>
          아파트 및 매매 가격 조회
          <div>
            <b-button
              @click="moveHouse"
              variant="outline-success"
              style="margin-top:1em"
            >
              상세보기
            </b-button>
          </div>
        </b-card-text>
      </b-card>

      <b-card title="Search Parking lot" style="text-align: center">
        <img :src="findParking" slot="header" style="width:100%" />
        <b-card-text>
          공영주차장 정보 조회
          <div>
            <b-button
              @click="moveParking"
              variant="outline-success"
              style="margin-top:1em"
            >
              상세보기
            </b-button>
          </div>
        </b-card-text>
      </b-card>

      <b-card title="Search By Marker" style="text-align: center">
        <img :src="findStore" slot="header" style="width:100%" />
        <b-card-text>
          지정한 위치 중심지 주변 정보 조회
          <div>
            <b-button
              @click="moveStore"
              variant="outline-success"
              style="margin-top:1em"
            >
              상세보기
            </b-button>
          </div>
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

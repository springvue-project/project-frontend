<template> </template>

<script>
import { mapState } from "vuex";
import { deleteInterest } from "@/api/interest.js";
const userStore = "userStore";
export default {
  name: "HouseCard",
  props: {
    apartmentName: String,
    aptCode: Number,
    buildYear: Number,
    dongCode: String,
    dong: String,
    gugunName: String,
    sidoname: String,
    lat: String,
    lng: String,
    recentPrice: String,
    roadName: String,
  },
  methods: {
    ...mapState(userStore, ["userInfo"]),
    removeHouse(aptCode) {
      console.log(aptCode);
      const param = {
        userid: this.userInfo.userId,
        aptCode: aptCode,
      };
      deleteInterest(param, (data) => {});
    },
  },
};
</script>

<style></style>

<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="brand">
            <h3>My House</h3>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section profile-content my-section d-flex">
        <div class="container">
          <div class="md-layout w-100">
            <div class="md-layout-item mx-auto mt-3 mb-4">
              <div class="item-cards">
                <div v-if="myHouses && myHouses.length > 0">
                  <table class="table table-hover mt-2">
                    <thead>
                      <tr>
                        <th scope="col">관심 아파트</th>
                        <th>주소</th>
                        <th>최근거래금액</th>
                        <th>건축연도</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody slot="body">
                      <tr v-for="(house, index) in myHouses" :key="index">
                        <td>
                          <span>{{ house.apartmentName }}</span>
                        </td>
                        <td>
                          {{ house.sidoname }} {{ house.gugunName }}
                          {{ house.dong }}
                          {{ house.roadName }}
                        </td>
                        <td>
                          {{ house.recentPrice }}
                        </td>
                        <td>
                          {{ house.buildYear }}
                        </td>
                        <td>
                          <md-button
                            class="md-simple"
                            @click="removeHouse(house.aptCode)"
                            >삭제</md-button
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <b-card
                    v-for="house in myHouses"
                    v-bind:key="house.no"
                    :title="house.apartmentName"
                    tag="article"
                    style="max-width: 20rem;"
                    class="item-card mb-2"
                  >
                    <b-card-text>
                      {{ house.sidoname }} {{ house.gugunName }}
                      {{ house.dong }} <br />
                      {{ house.roadName }}<br />
                      {{ house.recentPrice }}<br />
                      {{ house.buildYear }}<br />
                    </b-card-text>

                    <b-button variant="primary">주변 탐색</b-button>
                    <b-button
                      variant="simple"
                      @click="removeHouse(house.aptCode)"
                      >삭제</b-button
                    >
                  </b-card> -->
                </div>
                <div v-else>
                  <div class="alert alert-success">
                    <div class="container">
                      <div class="alert-icon">
                        <md-icon>check</md-icon>
                      </div>
                      등록된 관심 아파트가 없습니다. 관심아파트를 등록해 주세요!
                    </div>
                  </div>
                </div>
                <md-button class="md-warning md-wd" @click="moveHouseServiece"
                  >아파트 보러가기</md-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { listInterest, deleteInterest } from "@/api/interest.js";
const userStore = "userStore";

export default {
  name: "profile",
  components: {},
  bodyClass: "profile-page",
  data() {
    return {
      classicModal: false,
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/HappyApart.jpg"),
    },
  },
  computed: {
    ...mapState(userStore, ["myHouses"]),

    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.getMyHouse();
  },
  methods: {
    ...mapMutations(userStore, ["ADD_MY_HOUSES", "SET_MY_HOUSES"]),
    getMyHouse() {
      listInterest(
        this.$route.params.id,
        ({ data }) => {
          var apts = [];
          data.forEach((house) => {
            apts.push(house);
          });
          this.SET_MY_HOUSES(apts);
          console.log(this.myHouses);
        },
        (err) => {
          console.log(err);
        },
      );
    },
    removeHouse(aptCode) {
      console.log(aptCode);
      const param = {
        userid: this.$route.params.id,
        aptCode: aptCode,
      };
      console.log(param);
      deleteInterest(
        param,
        (data) => {
          console.log("del", data);
          var apts = [];
          data.data.forEach((house) => {
            apts.push(house);
          });
          this.SET_MY_HOUSES(apts);
        },
        (err) => {
          console.log(err);
        },
      );
    },
    moveHouseServiece() {
      this.$router.push({ name: "house" });
    },
  },
};
</script>

<style lang="scss">
.item-cards {
  //display: flex;
  //flex-wrap: wrap;
  //width: 100%;
  //justify-content: center;
  text-align: center;
}

.item-card {
  flex: 1 0 500px;
  margin: 1rem 0.5rem 0 0.5rem !important;
}

.brand h3 {
  color: white;
  font-size: 5.5rem;
  font-weight: 600;
  display: inline-block;
  position: relative;
  line-height: 1.15em;
  text-shadow: 0px 15px 102.86px rgb(0 0 0 / 70%),
    0px 15px 40.02px rgb(0 0 0 / 21%);
}
.my-section {
  padding: 0 !important;
}
.table td,
.table th {
  vertical-align: middle !important;
}
</style>

<template>
  <div class="wrapper">
    <div class="container">
      <div style="text-align: center">
        <br />설정한 주소 중심지의 반경 2km를 검색합니다.
      </div>
      <table class="table mt-2" v-if="parkings && parkings.length != 0">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="70" />
          <col width="70" />
          <col width="100" />
          <col width="150" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">주차장명</th>
            <th scope="col">주소</th>
            <th scope="col">구분</th>
            <th scope="col">요금</th>
            <th scope="col">주차대수</th>
            <th scope="col">연락처</th>
          </tr>
        </thead>
        <tbody slot="body">
          <tr v-for="(parking, index) in parkings" :key="index">
            <td>{{ parking.parkName }}</td>
            <td>{{ parking.parkAddress }}</td>
            <td>{{ parking.type }}</td>
            <td>{{ parking.pay }}</td>
            <td>{{ parking.count }}</td>
            <td>{{ parking.phone }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <div class="alert alert-danger" style="text-align:center">
          <div class="container">
            <button
              type="button"
              aria-hidden="true"
              class="close"
              @click="(event) => removeNotify(event, 'alert-danger')"
            >
              <md-icon>clear</md-icon>
            </button>
            <div class="alert-icon">
              <md-icon>info_outline</md-icon>
            </div>
            <b> 주차 공간 없음!! </b><br />
            주차 공간이 없어요 ㅜ.ㅜ!!!!
          </div>
        </div>
      </div>
      <parking-map />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ParkingMap from "@/components/Parking/ParkingMap.vue";

const parkingStore = "parkingStore";

export default {
  name: "ParkingList",
  components: {
    ParkingMap,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(parkingStore, ["parkings"]),
  },
  methods: {
    removeNotify(e, notifyClass) {
      var target = e.target;
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode;
      }
      return target.parentNode.removeChild(target);
    },
  },
};
</script>

<style></style>

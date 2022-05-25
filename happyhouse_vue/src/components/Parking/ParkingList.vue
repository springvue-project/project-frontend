<template>
  <div class="wrapper">
    <div class="container">
      <!-- <div style="text-align: center">
        <br />설정한 주소 중심지의 반경 2km를 검색합니다.
      </div> -->
      <table
        class="table table-hover mt-2"
        v-if="parkings && parkings.length != 0"
      >
        <thead>
          <tr>
            <th scope="col">total</th>
            <th>{{ parkings.length }}</th>
          </tr>
          <tr>
            <th scope="col">주차장명</th>
            <th></th>
          </tr>
        </thead>
        <tbody slot="body">
          <tr
            @click="selectParking(parking)"
            v-for="(parking, index) in parkings"
            :key="index"
            style="cursor:pointer;"
          >
            <td>
              <span>{{ parking.parkName }}</span>
            </td>
            <td>
              <i
                @click="openClassicModal(parking)"
                class="store-icon material-icons"
                >search</i
              >
            </td>
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
    </div>
    <modal v-if="classicModal" @close="classicModalHide">
      <template slot="header">
        <h4 class="modal-title">주차장 정보</h4>
        <md-button
          class="md-simple md-just-icon md-round modal-default-button"
          @click="classicModalHide"
        >
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <table class="table  table-hover">
          <tbody slot="body">
            <tr>
              <th>주차장명</th>
              <td>
                {{ parking.parkName }}
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{{ parking.parkAddress }}</td>
            </tr>
            <tr>
              <th>타입</th>
              <td>{{ parking.type }}</td>
            </tr>
            <tr>
              <th>요금정보</th>
              <td>{{ parking.pay }}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{{ parking.phone }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <template slot="footer">
        <md-button @click="classicModalHide" class="md-success md-simple"
          >닫기</md-button
        >
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Modal } from "@/components";

const parkingStore = "parkingStore";

export default {
  name: "ParkingList",
  components: { Modal },
  data() {
    return {
      classicModal: false,
      parking: null,
    };
  },
  computed: {
    ...mapState(parkingStore, ["parkings"]),
  },
  methods: {
    ...mapActions(parkingStore, ["detailParking"]),
    classicModalHide() {
      this.classicModal = false;
    },
    removeNotify(e, notifyClass) {
      var target = e.target;
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode;
      }
      return target.parentNode.removeChild(target);
    },
    openClassicModal(parking) {
      console.log(parking);

      parking.parkAddress =
        parking.parkAddress == "" ? "정보없음" : parking.parkAddress;
      this.parking = parking;
      this.classicModal = true;
    },
    selectParking(parking) {
      this.detailParking(parking);
    },
  },
};
</script>

<style>
.store-icon {
  cursor: pointer;
}
.modal-table {
  width: 100%;
}
.table td,
.table th {
  vertical-align: middle;
}
</style>

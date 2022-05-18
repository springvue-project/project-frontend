<template>
  <div class="wrapper">
    <div id="javascriptComponents">
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <div class="title" style="text-align: center">
            <h3>Summary</h3>
          </div>
          <div style="text-align: center">
            위 프로젝트는 카카오 맵 API와 공공 API를 이용하여 사용자에게 필요한
            정보와 서비스를 제공해준다.<br />

            다음과 같은 기능들을 제공한다.
          </div>
          <md-button
            class="md-success md-block md-simple"
            @click="classicModal = true"
            ><md-icon>library_books</md-icon> Click</md-button
          >
          <div class="md-layout">
            <div class="md-layout-item md-size-33">
              <div class="row text-center"></div>
              <modal v-if="classicModal" @close="classicModalHide">
                <template slot="header">
                  <h4 class="modal-title">Fuction</h4>
                  <md-button
                    class="md-simple md-just-icon md-round modal-default-button"
                    @click="classicModalHide"
                  >
                    <md-icon>clear</md-icon>
                  </md-button>
                </template>

                <template slot="body">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div>House Detail Searching Service</div>
                      <span class="badge badge-primary">New</span>
                    </li>
                    <li class="list-group-item">
                      <div>QnA Board (fuc. CRUD)</div>
                      <span class="badge badge-primary">New</span>
                    </li>
                    <li class="list-group-item">
                      <div>User Services (ex. Login, Join, Profile)</div>
                      <span class="badge badge-primary">New</span>
                    </li>
                  </ul>
                </template>

                <template slot="footer">
                  <md-button
                    class="md-danger md-simple"
                    @click="classicModalHide"
                    >Close</md-button
                  >
                </template>
              </modal>
            </div>
          </div>
          <br />
          <br />
          <div class="md-layout-item md-small-size-100">
            <ul class="list-group">
              <li class="list-group-item">
                <router-link to="/parking/list">
                  <md-button class="md-primary md-wd">
                    <h5>Go to Parking Area Service</h5>
                  </md-button>
                </router-link>
                <router-link to="/qna/qnalist">
                  <md-button class="md-primary md-wd">
                    <h5>Go to QnA Board</h5>
                  </md-button>
                </router-link>

                <router-link to="/house">
                  <md-button class="md-primary md-wd">
                    <h5>Go to House Detail Service</h5>
                  </md-button>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div class="title">
        <h2>KaKao Map</h2>
        <h5 class="description">Show current location using KaKao Map API</h5>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-66 mx-auto md-small-size-100">
          <div id="map" style="width:800px;height:400px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global kakao */
import { Modal } from "@/components";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      map: null,
      classicModal: false,
      latitude: 0,
      longitude: 0,
      markers: [],
      locPosition: null,
      marker: null,
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5bac587b1d037d39e5c1afb5a245aac9&autoload=false&libraries=services`;
      /* global kakao */
      script.addEventListener("load", () => {
        console.log(kakao);
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    classicModalHide() {
      this.classicModal = false;
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: this.map,
        position: locPosition,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(this.map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      this.map.setCenter(locPosition);
    },
    getGeoLocation() {
      let lat = 0;
      let lon = 0;
      this.initMap();
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
          (lat = position.coords.latitude), // 위도
            (lon = position.coords.longitude); // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          // 마커와 인포윈도우를 표시합니다
          var marker = new kakao.maps.Marker({
            position: locPosition,
          });
          console.log(1, this.map);
          console.log(this.markers);
          marker.setMap(this.map);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
          message = "geolocation을 사용할수 없어요..";
        //        this.displayMarker(locPosition, message);
        this.marker = new kakao.maps.Marker({
          position: locPosition,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
}
</style>

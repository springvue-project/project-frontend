<template>
  <div>
    <div id="map" style="height:55vh;"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const parkingStore = "parkingStore";

export default {
  name: "ParkingMap",
  data() {
    return {
      map: null,
      markers: [],
      position: [],
    };
  },
  //받아오는 parkings(pakinglist)가 변경될때마다 마커 다시 생성
  watch: {
    ...mapState(parkingStore, ["parkings"]),
    parkings: function() {
      console.log("computed", this.parkings);

      if (window.kakao) {
        this.removeMarkers();
        this.createMarkers();
      }
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5bac587b1d037d39e5c1afb5a245aac9&autoload=false&libraries=services`;
      /* global kakao */
      script.addEventListener("load", () => {
        console.log("kakao", kakao);
        kakao.maps.load(this.initMap);
        console.log("loaded");
      });
      document.head.appendChild(script);
      console.log("djflaksjdf");
    } else {
      this.initMap();
      console.log("already load");
    }
  },
  computed: {
    ...mapState(parkingStore, ["parkings"]),
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5272243, 126.9955914),
        level: 7,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);

      // 기존 마커 제거
      this.removeMarkers();
      // 마커 생성
      this.createMarkers();
    },
    //마커 배열 돌면서 맵에서 마커 지우고, 마커배열 초기화
    removeMarkers() {
      if (this.markers != undefined) {
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
        }
      }
      this.markers = [];
    },
    //마커 생성
    createMarkers() {
      var bounds = new kakao.maps.LatLngBounds();

      //받아온 parkings배열을 돌면서 markers배열에 추가
      this.parkings.forEach((parking) => {
        this.markers.push(
          new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(parking.lat, parking.lng),
          }),
        ),
          //position배열에 따로 LatLang만 추가
          this.position.push(new kakao.maps.LatLng(parking.lat, parking.lng));
      });

      //position배열의 LatLng를 bounds에 하나씩 확장시킴
      for (var i = 0; i < this.position.length; i++) {
        bounds.extend(this.position[i]);
      }
      //맵의 bounds설정
      this.map.setBounds(bounds);
      //positions배열 초기화
      //초기화 안 하면 마커를 지운 자리까지 bounds로 인식해서 전국지도가 보임!!!!!!
      this.position = [];
    },
  },
};
</script>

<style></style>

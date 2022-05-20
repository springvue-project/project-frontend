<template>
  <div>
    <div style="display:none">{{ houseList }}</div>
    <div id="map" style="height:55vh;"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseMap",
  data() {
    return {
      map: null,
      markers: [],
    };
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
    } else {
      this.initMap();
      console.log("already load");
    }
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
    houseList: function() {
      console.log("computed", this.houses);

      if (window.kakao) {
        this.removeMarkers();
        this.createMarkers();
      }
      return this.houses;
    },
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
      console.log("markers", this.markers);
    },
    removeMarkers() {
      if (this.markers != undefined) {
        if (this.markers.length > 0) {
          this.markers.forEach((marker) => marker.setMap(null));
        }
      }
      this.markers = [];
    },
    createMarkers() {
      this.houses.forEach((house) =>
        this.markers.push(
          new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(house.lat, house.lng),
          }),
        ),
      );
    },
  },
};
</script>

<style></style>

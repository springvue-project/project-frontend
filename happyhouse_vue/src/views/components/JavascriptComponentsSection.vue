<template>
  <div class="wrapper">
    <div id="javascriptComponents">
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100">
          <!-- 서비스 Card 배치 -->
          <div class="title" style="margin-top:3em">
            <h2>대표 기능</h2>
          </div>

          <index-service-cards style="margin-top:1em" />

          <!-- 최근 공지사항 && 자주하는 질문 -->
          <div class="title">
            <h2>게시판</h2>
          </div>
          <index-card />

          <!-- Kakao Map -->
          <div class="title" style="margin-top:3em">
            <h2>KaKao Map</h2>
            <h5 class="description">
              Show current location using KaKao Map API
            </h5>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-size-66 mx-auto md-small-size-100">
              <div id="map" style="width:800px;height:400px;"></div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <br />
      <br />
    </div>
  </div>
</template>

<script>
import IndexCard from "@/components/cards/IndexCard.vue";
import IndexServiceCards from "@/components/Index/Card/IndexServiceCards.vue";

/* global kakao */
export default {
  components: {
    IndexCard,
    IndexServiceCards,
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
      const container = document.getElementById("map");
      var center = new kakao.maps.LatLng(35.09532654, 128.8557671);
      const options = {
        center: center,
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);

      this.displayMarker(center, "SSAFY BUK");
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
      //infowindow.open(this.map, marker);

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

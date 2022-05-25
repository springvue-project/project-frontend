<template>
  <div>
    <md-switch v-model="switch1"
      ><span style="color:black;">교통정보</span></md-switch
    >
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
      infoOverlay: [],
      switch1: null,
    };
  },
  //받아오는 parkings(pakinglist)가 변경될때마다 마커 다시 생성
  watch: {
    ...mapState(parkingStore, ["parkings", "parking"]),
    parkings: function() {
      console.log("computed", this.parkings);

      if (window.kakao) {
        this.removeMarkers();
        this.createMarkers();
      }
    },
    parking: function() {
      console.log("watch", this.parking);
      this.closeOverlay();
      this.createInfoOverlay(this.parking);
      console.log(this.map.getLevel());
      this.map.setLevel(3);
      this.map.panTo(new kakao.maps.LatLng(this.parking.lat, this.parking.lng));
    },
    switch1: function() {
      if (this.switch1) {
        this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
      } else {
        this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
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
    ...mapState(parkingStore, ["parkings", "parking"]),
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
      var imageSrc = require(`@/assets/img/marker/parking_marker.png`);
      ("");
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 32);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      //받아온 parkings배열을 돌면서 markers배열에 추가
      this.parkings.forEach((parking) => {
        this.markers.push(
          new kakao.maps.Marker({
            map: this.map,
            image: markerImage,
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
    createInfoOverlay(parking) {
      var infoContent =
        `<div class="park-mapwrap">` +
        `    <div class="park-mapinfo">` +
        `        <div class="title">` +
        `            ${parking.parkName}` +
        `        </div>` +
        `    </div>` +
        `</div>`;

      this.infoOverlay.push(
        new kakao.maps.CustomOverlay({
          map: this.map,
          position: new kakao.maps.LatLng(parking.lat, parking.lng),
          content: infoContent,
          xAnchor: 0.3,
          yAnchor: 0.91,
        }),
      );
      this.map.panTo(new kakao.maps.LatLng(parking.lat, parking.lng));
    },
    closeOverlay() {
      if (this.infoOverlay) {
        this.infoOverlay.forEach((item) => {
          item.setMap(null);
        });
      }
    },
  },
  traffic() {},
};
</script>

<style>
.park-mapwrap * {
  padding: 0;
  margin: 0;
}
.park-mapwrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 220px;
  height: 50px;
  margin-left: -110px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
}
.park-mapwrap .park-mapinfo {
  height: 78%;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.park-mapwrap .park-mapinfo:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.park-mapinfo .title {
  font-size: 15px;
  text-align: center;
  margin: 0;
  line-height: 2rem;
  padding-top: 5px;
  font-family: "Gothic", "Arial Narrow", Arial, sans-serif;
}
</style>

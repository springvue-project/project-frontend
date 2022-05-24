<template>
  <div>
    <div id="map" style="height:60vh;"></div>
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
      bounds: [],
      infoContent: null,
      infoOverlay: [],
    };
  },
  //props: {
  //   aptimg: {
  //     type: String,
  //     default: require(`@/assets/img/apt/apt${Math.floor(
  //       Math.random() * 2,
  //     )}.png`),
  //   },
  // },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5bac587b1d037d39e5c1afb5a245aac9&autoload=false&libraries=services`;
      /* global kakao */
      script.addEventListener("load", () => {
        console.log("kakao", kakao);
        kakao.maps.load(this.initMap);
        this.removeMarkers(this.markers);
        console.log("loaded");
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
      this.removeMarkers(this.markers);

      console.log("already load");
    }
  },
  computed: {
    ...mapState(houseStore, ["houses", "house", "housedeals"]),
  },
  watch: {
    ...mapState(houseStore, ["houses", "house"]),
    houses: function() {
      console.log("watch", this.houses);

      if (window.kakao) {
        this.removeMarkers(this.markers);

        this.createHouseMarkers(this.houses, this.markers);
        this.setMarkers(this.markers);

        this.setBounds(this.markers);
      }
      return this.houses;
    },
    house: function() {
      console.log(this.house);
      this.closeOverlay();
      this.createInfoOverlay(this.house);
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
      this.removeMarkers(this.markers);
      // 마커 생성
      this.createHouseMarkers(this.houses, this.markers);
      this.setMarkers(this.markers);
      this.setBounds(this.markers);
    },
    removeMarkers(markers) {
      if (markers != undefined) {
        if (markers.length > 0) {
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          this.markers = [];
        }
      }
    },
    createHouseMarkers(houses, markers) {
      houses.forEach((house) => {
        var marker = new kakao.maps.Marker({
          //map: this.map,
          position: new kakao.maps.LatLng(house.lat, house.lng),
          clickable: true,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          console.log("addListener", house);
          // 마커 위에 인포윈도우를 표시합니다
          this.closeOverlay();
          this.createInfoOverlay(house);
        });
        markers.push(marker);
      });
    },

    setMarkers(markers) {
      if (markers != null && markers.length > 0) {
        markers.forEach((marker) => {
          marker.setMap(this.map);
        });
      }
    },
    setBounds(markers) {
      this.bounds = new kakao.maps.LatLngBounds();
      markers.forEach((marker) => {
        this.bounds.extend(marker.getPosition());
      });
      // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
      // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
      this.map.setBounds(this.bounds);
    },
    createInfoOverlay(house) {
      var infoContent =
        `<div class="mapwrap">` +
        `    <div class="mapinfo">` +
        `        <div class="title">` +
        `            ${house.apartmentName}` +
        `        </div>` +
        `        <div class="body">` +
        `            <div class="img">` +
        `                <img src="${this.aptimg()}">` +
        `           </div>` +
        `            <div class="desc">` +
        `                <div class="ellipsis"><p>주소</p>${house.dong}</div>` +
        `                <div class="ellipsis">${house.roadName}</div>` +
        `                <div class="ellipsis"><p>거래액</p>${house.recentPrice} (만원)</div>` +
        `                <div class="ellipsis"><p>건축년도</p>${house.buildYear} 년</div>` +
        `            </div>` +
        `        </div>` +
        `    </div>` +
        `</div>`;

      this.infoOverlay.push(
        new kakao.maps.CustomOverlay({
          map: this.map,
          position: new kakao.maps.LatLng(house.lat, house.lng),
          content: infoContent,
          xAnchor: 0.3,
          yAnchor: 0.91,
        }),
      );
      console.log("addListener", house);
      this.map.panTo(new kakao.maps.LatLng(house.lat, house.lng));
    },
    closeOverlay() {
      if (this.infoOverlay) {
        this.infoOverlay.forEach((item) => {
          item.setMap(null);
        });
      }
    },
    aptimg: function() {
      return require(`@/assets/img/apt/apt.png`);
    },
  },
};
</script>

<style>
.mapwrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 350px;
  height: 210px;
  margin-left: -144px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
}
.mapwrap * {
  padding: 0;
  margin: 0;
}
.mapwrap .mapinfo {
  /* width: 286px;
  height: 120px; */
  height: 96%;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.mapwrap .mapinfo:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.mapinfo .title {
  font-size: 15px;
  text-align: center;
  margin: 0;
  line-height: 2rem;
  padding-top: 5px;
  font-family: "Gothic", "Arial Narrow", Arial, sans-serif;
}
.mapinfo .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.mapinfo .close:hover {
  cursor: pointer;
}
.mapinfo .body {
  position: relative;
  overflow: hidden;
  margin: 0 10px;
  height: 83%;
}
.mapinfo .desc {
  margin-top: 6px;
  width: 50%;
  margin-left: 53%;
  padding: 0 10px;
  font-size: 14px;
}
.desc .ellipsis {
  font-size: 10px!;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .ellipsis p {
  background-color: steelblue;
  color: white;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.mapinfo .img {
  position: absolute;
  margin: 0 10px;
  top: 7px;
  width: 50%;
  height: 90%;
  color: #888;
  overflow: hidden;
}
.mapinfo:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.mapinfo .link {
  color: #5085bb;
}
</style>

<template>
  <div>
    <b-row class="addr-row">
      <div
        class="addr-div"
        v-for="(addr, index) in markedAddr"
        v-bind:key="index"
      >
        <span class="addr"> {{ addr }}</span>
        <i class="material-icons rm-icon" @click="removeAddr(index)">close</i>
      </div>
    </b-row>
    <div id="markmap" style="height:55vh;"></div>
    <b-row>
      <md-button
        class="search-btn md-success md-block mt-3 my-3"
        @click="searchAroundApt"
        >주변 아파트 검색</md-button
      >
    </b-row>
    <b-row v-if="showDetail">
      <b-col cols="12" class="mt-3">
        <h3>House List</h3>
        <p>
          중심 지점을 기준으로 반경 1km 이내 아파트 정보를 입니다.
        </p>
        <hr class="my-2" />
      </b-col>
    </b-row>
    <b-row v-if="showDetail">
      <b-col
        cols="5"
        style="height:500px; overflow:scroll; overflow-x:hidden"
        class="scroll"
      >
        <house-list />
      </b-col>
      <b-col
        cols="7"
        style="height:500px; overflow:scroll; overflow-x:hidden"
        class="scroll"
      >
        <house-detail-list />
      </b-col>
    </b-row>
    <b-row v-if="showDetail">
      <b-col cols="12">
        <store-map />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import HouseList from "@/components/house/HouseList.vue";
import HouseDetailList from "../house/HouseDetailList.vue";
import StoreMap from "@/components/Map/StoreMap.vue";

import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
const storeStore = "storeStore";

export default {
  name: "AroudMarkingMap",
  components: { HouseList, HouseDetailList, StoreMap },
  data() {
    return {
      map: null,
      housemarkers: [],
      markers: [],
      bounds: [],
      infoContent: null,
      infoOverlay: [],
      markedAddr: [],
      lat: "",
      lng: "",
      message: "",
      geocoder: null,
      showDetail: false,
      searchType: true,
    };
  },

  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=5bac587b1d037d39e5c1afb5a245aac9&autoload=false&libraries=services`;
      /* global kakao */
      script.addEventListener("load", () => {
        console.log("kakao", kakao);
        this.getGeolocation();
        kakao.maps.load(this.initMap);
        console.log("loaded");
      });
      document.head.appendChild(script);
    } else {
      //this.getGeolocation();
      this.initMap();
      console.log("already load");
    }
  },
  computed: {
    ...mapState(houseStore, ["houses", "house"]),
  },
  watch: {
    ...mapState(houseStore, ["houses", "house"]),

    mouseLntLng: function() {
      this.setMarkers(this.markers);
    },
    houses: function() {
      console.log("watch", this.houses);

      if (window.kakao) {
        this.removeMarkers(this.housemarkers);
        this.createHouseMarkers(this.houses, this.housemarkers);
        this.setMarkers(this.housemarkers);

        this.setBounds(this.housemarkers);
        this.showDetail = true;
        this.searchType = true;
      }

      return this.houses;
    },
    house: function() {
      this.closeOverlay();
      this.createInfoOverlay(this.house);
    },
  },
  methods: {
    ...mapActions(houseStore, ["getAroundHouseList"]),
    removeAddr(index) {
      console.log(index);
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      this.markedAddr.splice(index, 1);
    },
    getGeolocation() {
      if (!("geolocation" in navigator)) {
        this.message = "Geolocation is not available.";
        return;
      }
      this.message = "Locating...";

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
        },
        (err) => {
          this.message = "현재 위치를 찾을 수 없습니다.";
        },
      );
    },
    initMap() {
      this.geocoder = new kakao.maps.services.Geocoder();

      const container = document.getElementById("markmap");
      const options = {
        center: new kakao.maps.LatLng(this.lat, this.lng),
        level: 8,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      let map = new kakao.maps.Map(container, options);
      this.map = map;

      // 클릭 이벤트
      kakao.maps.event.addListener(this.map, "click", (MouseEvent) => {
        this.clickFunc(MouseEvent);
      });
    },
    clickFunc: function(MouseEvent) {
      if (this.markers && this.markers.length == 5) {
        alert("최대 5개 까지 선택할 수 있습니다.");
        return;
      }

      let latlng = MouseEvent.latLng;
      console.log("MouseEvent.latLng", latlng);
      this.searchDetailAddrFromCoords(latlng, (result, status) => {
        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성하고 리스트에 저장
        this.markers.push(
          new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()), // 마커를 표시할 위치
            title: result[0].address.address_name,
            image: markerImage,
          }),
        );

        // 마킹된 지역 주소 저장
        this.markedAddr.push(result[0].address.address_name);
        this.setMarkers(this.markers);
      });

      //리스트 출력

      // 맵 표시
    },
    searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },
    removeMarkers(markers) {
      if (markers != undefined) {
        if (markers.length > 0) {
          markers.forEach((marker) => marker.setMap(null));
        }
      }
      markers = [];
    },
    createHouseMarkers(houses, markers) {
      houses.forEach((house) => {
        var marker = new kakao.maps.Marker({
          //map: this.map,
          position: new kakao.maps.LatLng(house.lat, house.lng),
          clickable: true,
        });
        markers.push(marker);
        kakao.maps.event.addListener(marker, "click", () => {
          console.log(house);
          // 마커 위에 인포윈도우를 표시합니다
          this.closeOverlay();
          this.createInfoOverlay(house);
        });
      });
    },
    setMarkers(markers) {
      markers.forEach((marker) => {
        marker.setMap(this.map);
      });
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
        `                <img src="${this.aptimg()}"  width="73" height="70">` +
        `           </div>` +
        `            <div class="desc">` +
        `                <div class="ellipsis">법정동 : ${house.dong}</div>` +
        `                <div class="ellipsis">건축년도 : ${house.buildYear}</div>` +
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
      this.map.panTo(new kakao.maps.LatLng(house.lat, house.lng));
    },
    closeOverlay() {
      if (this.infoOverlay) {
        this.infoOverlay.forEach((item) => {
          item.setMap(null);
        });
      }
    },
    // 지도에 인포윈도우 표시하는 함수
    setInfowindow(infowindows, markers, map) {
      for (var i = 0; i < markers.length; i++) {
        // 인포 윈도우 표시
        infowindows[i].open(map, markers[i]);
      }
    },
    aptimg: function() {
      return require(`@/assets/img/apt/apt.png`);
    },
    searchAroundApt() {
      var avgLat = 0,
        avgLng = 0;
      this.markers.forEach((marker) => {
        avgLat += marker.getPosition().getLat();
        avgLng += marker.getPosition().getLng();
      });
      avgLat /= this.markers.length;
      avgLng /= this.markers.length;
      console.log("avg", avgLat, avgLng);
      const latlng = {
        lat: avgLat,
        lng: avgLng,
      };
      this.getAroundHouseList(latlng);
    },
  },
};
</script>

<style scoped>
.addr-row {
  font-size: 13.5px;
  justify-content: center;
}
.addr-div {
  border: 1px solid;
  border-radius: 1rem;
  margin: 0px 5px 7px 0px;
  padding-right: 4px;
}
.addr {
  margin: 0px 10px;
  position: relative;
  bottom: 4px;
}
.rm-icon {
  bottom: -3px;
  position: relative;
}
.search-btn {
  font-size: 1rem;
}
</style>

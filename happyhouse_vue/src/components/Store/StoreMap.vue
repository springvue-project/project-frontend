<template>
  <div class="mt-1">
    <div id="storemap" style="height:60vh;"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
const storeStore = "storeStore";
//
export default {
  data() {
    return {
      map: null,
      markers: [],
      bounds: [],
      infoContent: null,
      infoOverlay: [],
      detailStore: null,
      gasstationimg: require("@/assets/img/GasStation.jpg"),
      cafeimg: require("@/assets/img/Cafe.jpg"),
      estateimg: require("@/assets/img/Estate.jpg"),
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
    ...mapState(storeStore, ["stores", "store", "type"]),
  },
  watch: {
    ...mapState(storeStore, ["stores", "store"]),

    stores: function() {
      if (this.stores != null && this.stores.length > 0) {
        if (window.kakao) {
          this.removeMarkers(this.markers);
          this.closeOverlay();
          this.createStoreMarkers(this.stores, this.markers);
          this.setMarkers(this.markers);
          this.setBounds(this.markers);
        }
      }
      return this.stores;
    },
    store: function() {
      this.closeOverlay();
      this.createInfoOverlay(this.store);
    },
  },
  methods: {
    initMap() {
      const container = document.getElementById("storemap");
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
      this.createStoreMarkers(this.stores, this.markers);
      this.setMarkers(this.markers);
      this.setBounds(this.markers);
    },
    removeMarkers(markers) {
      if (markers != undefined) {
        if (markers.length > 0) {
          markers.forEach((marker) => marker.setMap(null));
        }
      }
      this.markers = [];
      this.infoContent = null;
    },

    createStoreMarkers(stores, markers) {
      stores.forEach((store) => {
        var marker = new kakao.maps.Marker({
          //map: this.map,
          position: new kakao.maps.LatLng(store.lat.trim(), store.lng),
          clickable: true,
        });
        markers.push(marker);
        kakao.maps.event.addListener(marker, "click", () => {
          // 마커 위에 인포윈도우를 표시합니다
          this.closeOverlay();
          this.createInfoOverlay(store);
        });
      });
    },
    setMarkers(markers) {
      markers.forEach((marker) => {
        marker.setMap(this.map);
      });
    },
    setBounds(...markersArr) {
      this.bounds = new kakao.maps.LatLngBounds();
      markersArr.forEach((markers) => {
        markers.forEach((marker) => {
          this.bounds.extend(marker.getPosition());
        });
      });
      // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
      // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
      this.map.setBounds(this.bounds);
    },
    createInfoOverlay(store) {
      var type = this.type;
      var imgsrc = null;
      if (this.type == "카페") {
        imgsrc = require("@/assets/img/Cafe.jpg");
      } else if (this.type == "부동산") {
        imgsrc = require("@/assets/img/Estate.jpg");
      } else {
        imgsrc = require("@/assets/img/GasStation.jpg");
      }
      console.log("this.type", imgsrc);
      var infoContent =
        `<div class="store-mapwrap">` +
        `    <div class="store-mapinfo">` +
        `        <div class="title">` +
        `            ${store.storeName}` +
        `        </div>` +
        `        <div class="body">` +
        `               <div class="img">` +
        `                 <img src="${imgsrc}" style="width:180px;"/>` +
        `               </div>` +
        `        </div>` +
        `            <div class="desc">` +
        `                <div class="ellipsis">주소 : ${store.address}</div>` +
        `                <div><a href="https://search.naver.com/search.naver?where=nexearch&sm=tab_jum&query=${store.storeName}" target="_blank" class="link">네이버 검색</a></div>` +
        `            </div>` +
        `    </div>` +
        `</div>`;

      this.infoOverlay.push(
        new kakao.maps.CustomOverlay({
          map: this.map,
          position: new kakao.maps.LatLng(store.lat, store.lng),
          content: infoContent,
          xAnchor: 0.3,
          yAnchor: 0.91,
        }),
      );
      this.map.panTo(new kakao.maps.LatLng(store.lat, store.lng));
    },
    closeOverlay() {
      if (this.infoOverlay) {
        this.infoOverlay.forEach((item) => {
          item.setMap(null);
        });
      }
    },
    searchDetailStore(storeName) {
      axios
        .get(
          `https://dapi.kakao.com/v2/search/web?query=${storeName}&size=10`,
          {
            headers: {
              Authorization: "KakaoAK 70782a7f3313315f56bf97484f6ed8b1",
            },
          },
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.store-mapwrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 240px;
  margin-left: -144px;
  overflow: hidden;
  font-size: 12px;

  line-height: 1.5;
}
.store-mapwrap * {
  padding: 0;
  margin: 0;
}
.store-mapwrap .store-mapinfo {
  height: 230px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.store-mapwrap .mapinfo:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.store-mapinfo .title {
  font-size: 15px;
  text-align: center;
  margin: 0;
  line-height: 2rem;
  padding-top: 3px;
  font-family: "Gothic", "Arial Narrow", Arial, sans-serif;
}
.store-mapinfo .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.store-mapinfo .close:hover {
  cursor: pointer;
}
.store-mapinfo .body {
  position: relative;
  overflow: hidden;
  margin: 0 10px;
}
.store-mapinfo .desc {
  top: 3px;
  text-align: center;
  position: relative;
  height: 75px;
}
.store-mapinfo .desc .ellipsis {
  font-size: 10px!;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.store-mapinfo .desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.store-mapinfo .img {
  position: relative;
  width: 100%;
  color: #888;
  overflow: hidden;
  text-align: center;
}
.store-mapinfo:after {
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
.map-div {
  display: none;
}
.alert .msg {
  font-size: 1rem;
}
</style>

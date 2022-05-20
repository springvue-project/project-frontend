<template>
  <div class="wrapper">
    <div class="main main-raised">
      <div class="section section-javascript">
        <div class="container">
          <div class="card-body">
            <div class="center">
              <parking-search-bar>
                <span class="text-center" id="spantext"> </span>
              </parking-search-bar>
            </div>
            <table class="table mt-2">
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
                  <th>주차장명</th>
                  <th>주소</th>
                  <th>구분</th>
                  <th>요금</th>
                  <th>주차대수</th>
                  <th>연락처</th>
                </tr>
              </thead>
              <tbody id="searchResult"></tbody>
            </table>
            <div id="map" style="width:500px;height:400px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingSearchBar from "@/components/Parking/ParkingSearchBar.vue";
export default {
  components: {
    ParkingSearchBar,
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5bac587b1d037d39e5c1afb5a245aac9&libraries=services,clusterer,drawing`;

    script.addEventListener("load", () => {
      kakao.maps.load(this.initMap);
    });

    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };

      this.map = new kakao.maps.Map(container, options);
    },
  },
};
</script>

<style></style>

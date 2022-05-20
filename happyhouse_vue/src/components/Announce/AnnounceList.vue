<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show><h3>글목록</h3></b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-right">
          <b-button variant="outline-primary" @click="moveWrite()"
            >글쓰기</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="articles.length">
          <b-table-simple hover responsive>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>글번호</b-th>
                <b-th>제목</b-th>
                <b-th>조회수</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <!-- 하위 component인 ListRow에 데이터 전달(props) -->
              <announce-list-item
                v-for="article in articles"
                :key="article.no"
                v-bind="article"
              />
            </tbody>
          </b-table-simple>
        </b-col>
        <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { listArticle } from "@/api/announce.js";
import AnnounceListItem from "./item/AnnounceListItem.vue";
import { mapState } from "vuex";
const userStore = "userStore";
export default {
  name: "announcelist",
  components: {
    AnnounceListItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
  },
  methods: {
    moveWrite() {
      if (this.userInfo.manager === "manager") {
        this.$router.push({ name: "announcewrite" });
      } else {
        alert("관리자만 공지사항을 등록할 수 있습니다!!!");
      }
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>

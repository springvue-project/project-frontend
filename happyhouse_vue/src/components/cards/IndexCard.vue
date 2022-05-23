<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab no-body title="자주하는 질문" style="margin:1em;">
          <router-link to="/qna">
            <b-button variant="light" style="float:right; margin-bottom:1em"
              ><md-icon>add</md-icon></b-button
            >
          </router-link>
          <b-table-simple hover responsive>
            <b-thead head-variant="dark">
              <b-tr style="margin-top:2em">
                <b-th>글번호</b-th>
                <b-th>제목</b-th>
                <b-th>조회수</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <index-qna-card-item
                v-for="article in qnaarticles"
                :key="article.articleno"
                v-bind="article"
              />
            </tbody>
          </b-table-simple>
          <div style="text-align:center">
            <p>
              조회 수가 높은 QnA입니다.<br />더 많은 QnA는 게시판을
              이용해주세요...
            </p>
          </div>
        </b-tab>
        <b-tab no-body title="최근 공지사항" style="margin:1em;">
          <router-link to="/announce">
            <b-button variant="light" style="float:right; margin-bottom:1em"
              ><md-icon>add</md-icon></b-button
            >
          </router-link>
          <b-table-simple hover responsive>
            <b-thead head-variant="dark">
              <b-tr style="margin-top:2em">
                <b-th>글번호</b-th>
                <b-th>제목</b-th>
                <b-th>조회수</b-th>
                <b-th>작성자</b-th>
                <b-th>작성일</b-th>
              </b-tr>
            </b-thead>
            <tbody>
              <index-announce-card-item
                v-for="article in announcearticles"
                :key="article.no"
                v-bind="article"
              />
            </tbody>
          </b-table-simple>
          <div style="text-align:center">
            <p>
              최신 공지사항입니다.<br />더 많은 공지사항은 게시판을
              참고해주세요...
            </p>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { listtopArticle } from "@/api/qna";
import { listlastArticle } from "@/api/announce";
import IndexQnaCardItem from "@/components/cards/item/IndexQnaCardItem.vue";
import IndexAnnounceCardItem from "@/components/cards/item/IndexAnnounceCardItem.vue";

export default {
  components: {
    IndexQnaCardItem,
    IndexAnnounceCardItem,
  },
  data() {
    return {
      qnaarticles: [],
      announcearticles: [],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listtopArticle(
      param,
      (response) => {
        this.qnaarticles = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
    listlastArticle(
      param,
      (response) => {
        this.announcearticles = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
  },
};
</script>

<style>
.cards {
  display: flex;
  justify-content: space-between;
  margin-left: 5em;
  margin-right: 5em;
}
</style>

import { listComment, deleteComment } from "@/api/comment.js";

const commentStore = {
  namespaced: true,
  state: {
    comments: [],
    comment: null,
  },

  mutations: {
    SET_COMMENT_LIST: (state, comments) => {
      //   console.log(houses);
      state.comments = comments;
    },
    SET_DETAIL_COMMENT: (state, comment) => {
      state.comment = comment;
    },
    DELETE_COMMENT(state, comment) {
      const index = state.comments.indexOf(comment);
      state.comments.splice(index, 1);
    },
  },

  actions: {
    getCommentList: ({ commit }, articleno) => {
      listComment(
        articleno,
        (response) => {
          //console.log(response.data);
          commit("SET_COMMENT_LIST", response.data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    removeComment({ commit }, comment) {
      deleteComment(
        comment.no,
        () => {
          alert("댓글삭제 성공!");
          commit("DELETE_TODO", comment);
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default commentStore;

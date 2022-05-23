<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="https://github.com/springvue-project">
              Team GitHub
            </a>
          </li>
          <li>
            <a href="https://github.com/yeonui-0626">
              About yeonui
            </a>
          </li>
          <li>
            <a href="https://github.com/jeong-chan">
              About chanwoo
            </a>
          </li>
          <li>
            <a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp">
              SSAFY
            </a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, made by BUK_class_4_yeonui_chanwoo.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>

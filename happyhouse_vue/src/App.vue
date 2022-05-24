<template>
  <div id="material-kit">
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div>
        <router-view />
      </div>
      <router-view name="footer" />
    </div>
  </div>
</template>
<style>
.scroll::-webkit-scrollbar {
  width: 6px;
}
.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: gray;
}
.scroll::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}
html {
  scroll-behavior: smooth;
}
.gnb span:before {
  content: "";
  position: absolute; /*부모 요소에는 position: relative를 주어야 함*/
  background-color: steelblue;
  height: 2px;

  width: 0; /*초기에 보이지 않도록*/
  bottom: 0; /*a태그 아래에 위치*/
  transition: 0.3s; /*애니메이션 동작 실행 시간 정의*/
}

.gnb span:hover:before {
  width: 70%;
}
.btn-down {
  left: 50%;
  z-index: 2;
}
</style>

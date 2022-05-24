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
</style>

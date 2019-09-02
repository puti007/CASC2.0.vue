<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    min-width: 1920px;
    min-height: 1080px
}
#app {
  font-family:  Helvetica, Arial, sans-serif,'Avenir';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
    height: 100%;
}
ul,li{
  padding:0;
  margin: 0;
}
li{
  list-style: none;
}
</style>

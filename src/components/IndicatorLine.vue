<template>
  <div class="indicator-line">
    <span class="dot"></span>
    <span class="line"></span>
    <span class="dot"></span>
  </div>
</template>
<script>
export default {
    name:'IndicatorLine'
}
</script>
<style scoped>
.indicator-line {
  position: absolute;
  font-size: 0;
}
.indicator-line .dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: rgba(2, 251, 255, 1);
  border-radius: 50%;
  vertical-align: middle;
}
.indicator-line .line {
  display: inline-block;
  background-color: rgba(2, 251, 255, 0.5);
  height: 1px;
  line-height: 5px;
}
.indicator-line.indicator-line1 .line {
  display: block;
  width: 1px;
  height:30px;
  margin-left:2px;
}
.indicator-line.indicator-line1 {
 top:-10px;
 left:35px;
}
.indicator-line.indicator-line1 .dot:last-child,
.indicator-line.indicator-line3 .dot:last-child,
.indicator-line.indicator-line4 .dot:last-child{
  display: none;
}
.indicator-line.indicator-line2 .line{
  width: 305px;
}
.indicator-line.indicator-line2  .dot:first-child{
  display: none;
}
.indicator-line.indicator-line2{
  right:-310px;
  top:50px;
}
.indicator-line.indicator-line3 .line{
  width: 42px;
}
.indicator-line.indicator-line4 .line{
  width: 68px;
}
.indicator-line.indicator-line3{
  left:-45px;
  top:100px;
}
.indicator-line.indicator-line4{
  left:-73px;
  top:205px;
}
</style>


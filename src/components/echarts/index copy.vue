<template>
  <div :class="`echart-box echart-${classify}`"></div>
</template>
<script>
import init from "./utils";
export default {
  props: {
    classify: {
      //应用那个类型的图表
      type: String
    },
    xdataArray: {
      //折线图渲染数据，数据的每一项都是Number
      type: Array
    },
    ydataArray: {
      type: Array
    },
    axisLabelRotate: {
      type: Number,
      default: 40
    },
    itemStyleColor: {
      type: String,
      default: "rgba(6, 255, 54, 1)"
    },
    itemStyleOpacity: {
      type: String,
      default: "0"
    },
    areaColorStart: {
      type: String
    },
    areaColorEnd: {
      type: String
    },
    lineColorStart: {
      type: String,
      default: "rgba(0, 230, 234, 1)"
    },
    lineColorEnd: {
      type: String,
      default: "rgba(43, 100, 215, 1)"
    },
    yAxisName: {
      type: String
    },
    smooth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  beforeDestroy() {
    //销毁图表实例，避免内存溢出
    // this.myChart.dispose && this.myChart.dispose();
  },
  mounted() {
    //调用utils来绘制图形
    // setTimeout(function() {
      this.myChart = init(this.$el, ...Object.values(this.$props));
    // }, 0);
  }
};
</script>
<style scoped>
@import "../../../src/assets/detail.css";
</style>
<style scoped>
.echart-box {
  width: 100%;
  height: 230px;
}
</style>

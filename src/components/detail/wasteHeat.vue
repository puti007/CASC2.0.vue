<template>
  <div :class="`echart-box echart-${classify}`" ></div>
</template>
<script>
// import init from "./utils";
var echarts = require("echarts");
export default {
  props: {
     serialNo:{},
     echartId:{},
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
      myChart: null,
     power: {
        //发电功率
        lineEchartx: [],
        lineEcharty: [],
      },
    };
  },
  computed: {
    optiondetailLine() {
      var _this = this;
      var obj = {
        grid: {
          top: 40
        },
        tooltip: {
          trigger: "axis",
          formatter: "时间：{b}<br/> 参数值：{c}",
          axisPointer: {
            animation: false
          }
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // name:"时间",
            nameGap: "6",
            data: _this.power.lineEchartx,
            axisLabel: {
              color: "#fff",
              fontSize: "12",
              rotate: _this.axisLabelRotate
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff"
              },
              symbol: ["none", "arrow"]
            },
            axisTick: {
              show: false
            },
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: _this.yAxisName,
            axisLabel: {
              color: "#fff",
              fontSize: "12"
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff"
              },
              symbol: ["none", "arrow"]
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dotted"
              }
            }
          }
        ],
        series: [
          {
            type: "line",
            data: _this.power.lineEcharty,
            label: {
              formatter: params => params.data.name + params.data.value,
              fontSize: 12
            },
            smooth: _this.smooth,
            itemStyle: {
              color: _this.itemStyleColor,
              opacity: _this.itemStyleOpacity
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: _this.areaColorStart
                  },
                  {
                    offset: 1,
                    color: _this.areaColorEnd
                  }
                ],
                global: false
              }
            },
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: _this.lineColorStart // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: _this.lineColorEnd // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      };
      return obj;
    }
  },
  beforeDestroy() {
    //销毁图表实例，避免内存溢出
    this.myChart.dispose && this.myChart.dispose();
  },
  methods: {
    getLineInfo(paramName) {
      this.http
        .get(this.api.detail.lineInfo, {
          params: {
            serialNo: this.serialNo,
            paramName: paramName
          }
        })
        .then(res => {
          var _this = this;
          var timesArray = res.data[0].LINE_INFO.split(";")[0].split(",");
          var valuesArray = res.data[0].LINE_INFO.split(";")[1].split(",");
          for (let i = 0; i < timesArray.length; i++) {
            _this.power.lineEchartx.push(timesArray[i]);
            _this.power.lineEcharty.push(valuesArray[i]);
            
          }
          console.log(_this.power.lineEchartx)
          _this.drawDetailLine();
        });
    },
    drawDetailLine() {
        let _this = this;
      let chartDetailLine = echarts.init(
        document.getElementById(_this.echartId)
      );
      chartDetailLine.setOption(_this.optiondetailLine);
      //建议加上以下这一行代码，不加的话当浏览器窗口缩小的时候echart图会超过div的界限
      window.addEventListener("resize", function() {
        chartDetailLine.resize();
      });
    }
  },
  mounted() {
    this.getLineInfo('余热功率');
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

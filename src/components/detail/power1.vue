<template>
  <div id="power ecahrts-line"></div>
</template>
<style scoped>

</style>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      failureTypeXaxisData: [1, 2, 3, 4, 3, 6, 7, 7],
      failureTypeYaxisData: [
        "变频故障",
        "断路器跳闸",
        "内循环流量低",
        "公共停机报警",
        "故障类型A",
        "故障类型B",
        "故障类型C",
        "故障类型D"
      ]
    };
  },
  mounted() {
    this.drawFailureType();
  },
  computed: {
    optionFailureType() {
      let _this = this;
      let obj = {
        title: {
          show: false
        },
        barWidth: "15",
        tooltip: {},
        grid: {
          top:"40",
          left:"50",
          bottom:"80"
        },
        
        xAxis: [
          {
            type: "category",
            name: "故障类型",
            nameRotate:"90",
            nameTextStyle: {
              color: "#00ffff",
              fontSize: "16"
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
              fontSize: "14",
              rotate:"35"
              // formatter:function(val){
              //   return val.split("").join("\n")
              // }
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff",
                height: "2px"
              },
              symbol: ["none", "arrow"]
            },
            
            data: _this.failureTypeYaxisData
          }
        ],
        yAxis: [
          {
            type: "value",
            position: "top",
            name: "故障类型发生率(1000h/次)",
            nameLocation:"middle",
            nameGap:"25",
            nameTextStyle: {
              color: "#00ffff",
              fontSize: "16",
              
            },
            axisTick:{
              show:true,
              alignWithLabel: true
            },
            axisLabel: {
              color: "#00ffff",
              fontSize: "14"
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff",
                height: "2px"
              }

              // symbol:['none','arrow'],
              // symbolOffset:[0,20]
            },
           splitLine: {
              show: true,
              lineStyle: {
                type: "dotted"
              }
            },
          }
        ],
        series: [
          {
            name: "销量",
            type: "bar",

            data: _this.failureTypeXaxisData,
            label: {
              show: true,
              position: "top",
              color: "#00ffff",
              fontSize: "14"
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(240, 141, 65, 1)" },
                  { offset: 1, color: "rgba(228, 96, 100, 1)" }
                ])
              }
            }
          }
        ]
      };
      return obj;
    }
  },
  methods: {
    drawFailureType() {
      let _this = this;
      let chartFailureType = echarts.init(
        document.getElementById("device-failure-type")
      );
      chartFailureType.setOption(_this.optionFailureType);
      //建议加上以下这一行代码，不加的话当浏览器窗口缩小的时候echart图会超过div的界限
      window.addEventListener("resize", function() {
        chartFailureType.resize();
      });
    }
  }
};
</script>

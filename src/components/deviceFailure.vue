<template>
  <div id="device-failure"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      deviceFailureXaxisData: [],
      deviceFailureYaxisData: []
    };
  },
  mounted() {
    this.errorCount();
  },
  computed: {
    optiondeviceFailure() {
      let _this = this;
      let obj = {
        title: {
          show: false
        },
        barWidth: "15",
        tooltip: {},
        grid: {
          left: "80px"
        },
        xAxis: [
          {
            type: "value",
            position: "top",
            name: "故障率(1000h/次)",
            nameLocation: "middle",
            nameGap: "25",
            nameTextStyle: {
              color: "#00ffff",
              fontSize: "16"
            },
            axisLabel: {
              color: "#00ffff",
              fontSize: "14"
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff",
                height: "2px"
              },
              symbol: ["none", "arrow"]
              // symbolOffset:[0,20]
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dotted"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            name: "设备号",
            boundaryGap: true,
            inverse: true,
            nameLocation: "start",
            nameGap: "25",
            nameTextStyle: {
              color: "#00ffff",
              fontSize: "18"
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              color: "#fff",
              fontSize: "12",
              rotate: "45",
              interval: "0"
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff",
                height: "2px"
              },
              symbol: ["none", "arrow"],
              symbolOffset: [0, -10]
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dotted"
              }
            },
            data: _this.deviceFailureYaxisData
          }
        ],
        series: [
          {
            name: "设备故障",
            type: "bar",
            data: _this.deviceFailureXaxisData,
            label: {
              show: true,
              position: "right",
              color: "#00ffff",
              fontSize: "14"
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#1499f0" },
                  { offset: 1, color: "#00ffff" }
                ]),
                barBorderRadius: [0, 10, 10, 0],
                shadowColor: "rgba(0,255,225,1)",
                shadowBlur: 4
              }
            },
            // markLine: {
            //   silent: true,
            //   symbol: ["none", "none"],
            //   label: { show: false },
            //   lineStyle: {
            //     normal: {
            //       color: "#D2971E",
            //       width: 2,
            //       type: "solid"
            //     }
            //   },
            //   data: [{ xAxis: "3" }]
            // }
          }
        ]
      };
      return obj;
    }
  },
  methods: {
    errorCount() {
      this.http.get(this.api.errorCount)
        .then(res => {
          for(let i=0;i<res.data.length;i++){
            this.deviceFailureYaxisData.push(res.data[i].EQUIPMENT_NO)
            this.deviceFailureXaxisData.push(res.data[i].ERROR_CNT)
          }
          this.drawDevicefailure();
        });
    },
    drawDevicefailure() {
      let _this = this;
      let chartdeviceFailure = echarts.init(
        document.getElementById("device-failure")
      );
      chartdeviceFailure.setOption(_this.optiondeviceFailure);
      //建议加上以下这一行代码，不加的话当浏览器窗口缩小的时候echart图会超过div的界限
      window.addEventListener("resize", function() {
        chartdeviceFailure.resize();
      });
    }
  }
};
</script>

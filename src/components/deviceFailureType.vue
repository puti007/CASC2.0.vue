<template>
  <div id="device-failure-type"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      failureTypeYaxisData: [],
      failureTypeXaxisData: []
    };
  },
  mounted() {
    this.getErrorType()
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
          left:"65",
          bottom:"80"
        },
        
        xAxis: [
          {
            type: "category",
            name: "故障类型",
            nameRotate:"90",
            nameGap:50,
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
              rotate:"40"
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
            
            data: _this.failureTypeXaxisData
          }
        ],
        yAxis: [
          {
            type: "value",
            position: "top",
            name: "故障类型发生率(1000h/次)",
            nameLocation:"middle",
            nameGap:"45",
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
              },
              symbol:['none','arrow'],
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
            name: "故障类型",
            type: "bar",

            data: _this.failureTypeYaxisData,
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
                ]),
                barBorderRadius: [10, 10, 0, 0],
                shadowColor: "rgb(255, 152, 0)",
                shadowBlur: 4
              }
            },
            //  markLine: {
            //   silent: true,
            //   symbol: ["none", "none"],
            //   label:{show:false},
            //   lineStyle: {
            //     normal: {
            //       color: "#D2971E",
            //       width:2,
            //       type: "solid"
            //     }
            //   },
            //   data: [{yAxis: "3"}]
            // }
          }
        ]
      };
      return obj;
    }
  },
  methods: {
    getErrorType(){
      this.http.get(this.api.errorType)
      .then(res => {
        for(let i=0;i<res.data.length;i++){
            this.failureTypeYaxisData.push(res.data[i].ERROR_CNT)
            this.failureTypeXaxisData.push(res.data[i].ERROR_TYPE)
          }
        this.drawFailureType();
      });
    },
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

<template>
  <div id="fault-info-record"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      yaxisData: [],
      seriesData1: [],
      seriesData2: [],
      tooltipBg: "../assets/bgTootip.png"
    };
  },
  mounted() {
    this.getErrorDetail();
  },
  computed: {
    optionFaultInfoRecord() {
      let _this = this;
      let obj = {
        title: {
          show: true,
          text: "NY40",
          textStyle: {
            color: "#00ffff",
            fontSize: "14"
          },
          left: "center",
          top: "30"
        },
        tooltip: {
          trigger: "item",
          // triggerOn: 'click',
          alwaysShowContent: true,
          backgroundColor: "rgba(54,60,94,1)",
          borderColor: "#00ffff",
          borderWidth: 1,
          axisPointer: {
            show: true,
            type: "line"
          },
          textStyle: {
            color: "#00ffff",
          },
          extraCssText:
            "padding:10px 15px;width:130px;white-space:pre-wrap;backgeound:url(../assets/bgTootip.png) no-repeat;background-size:100% 100%;", //额外附加到浮层的 css 样式
          formatter: function(params, ticket, callback) {
            var triangle1 =
              '<div style="top:25px;left:-15px;width: 0;height: 0;border-bottom: 10px solid transparent;\
           border-right: 10px solid #00ffff;border-top: 10px solid transparent;position: relative;">\
           <i style="position:absolute;top:-9px;left:1px;display:inline-block;border-top:9px solid transparent;\
           border-bottom:9px solid transparent;border-right:9px solid rgba(54,60,94,1);border-top:9px solid transparent;"></i>\
           </div>';
           var triangle = '<img src="../assets/bgTooltip.png"/>'
            return (
              params.data.name +
              "<br/>" +
              params.data.errorType +
              "<br/>" +
              params.data.errorTime +
              "<br/>" +
              params.data.shopName
            );
          }
        },
        grid: {
          left: "70px"
        },
        xAxis: [
          {
            type: "value",
            position: "top",
            max: 20,
            splitNumber: "2",
            name: "设备型号",
            nameGap: "10",
            nameRotate: "90",
            nameTextStyle: {
              color: "#00ffff",
              fontSize: "16"
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#00ffff",
                height: "2px"
              },
              symbol: ["none", "arrow"]
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            name: "日期",
            boundaryGap: true,
            inverse: false,
            nameLocation: "end",
            nameGap: "15",
            nameTextStyle: {
              color: "#00ffff",
              fontSize: "18"
            },
            data: _this.yaxisData,
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              color: "#fff",
              fontSize: "12",
              rotate: "45"
            },
            axisLine: {
              lineStyle: {
                color: "#00ffff",
                height: "2px"
              },
              symbol: ["arrow", "none"]
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dotted"
              }
            }
          }
        ],
        series: [
          {
            name: "NY40",
            type: "scatter",
            data: _this.seriesData1,
            symbolSize:'5',
            lineStyle: {
              color: "transparent",
              type: "dotted"
            },
            itemStyle: {
              normal: {
                color: "#00ffff",
              }
            },
            markLine: {
              silent: true,
              label: { show: false },
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#fff",
                  type: "dotted"
                }
              },
              data: [{ xAxis: "10" }]
            },
            tooltip: {
              position: "right",
              borderColor: "#00ffff",
              textStyle: {
                color: "#00ffff"
              }
            }
          },
          {
            name: "NY40",
            type: "scatter",
            data: _this.seriesData2,
            symbolSize:'5',
            lineStyle: {
              color: "transparent",
              type: "dotted"
            },
            itemStyle: {
              normal: {
                color: "#E7910B",
              }
            },
            markLine: {
              silent: true,
              label: { show: false },
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "#fff",
                  type: "dotted"
                }
              },
              data: [{ xAxis: "10" }]
            },
            tooltip: {
              position: "left",
              borderColor: "#E7910B",
              textStyle: {
                color: "#E7910B"
              }
            }
          }
        ]
      };
      return obj;
    }
  },
  methods: {
    getErrorDetail() {
      this.http.get(this.api.errorDetail).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.yaxisData.push(res.data[i].SHORT_ERROR_TIME);
          if (i % 2 == 0) {
            this.seriesData1.push({
              name: res.data[i].EQUIPMENT_NO,
              value: ["10",res.data[i].SHORT_ERROR_TIME],
              errorTime: res.data[i].ERROR_TIME,
              errorType: res.data[i].ERROR_TYPE,
              shopName: res.data[i].SHOP_NAME
            });
          } else {
            this.seriesData2.push({
              name: res.data[i].EQUIPMENT_NO,
              value: ["10",res.data[i].SHORT_ERROR_TIME],
              errorTime: res.data[i].ERROR_TIME,
              errorType: res.data[i].ERROR_TYPE,
              shopName: res.data[i].SHOP_NAME
            });
          }
        }
        // console.log(this.seriesData1);
        // console.log(this.seriesData2);
        this.drawFaultInfoRecord();
      });
    },
    drawFaultInfoRecord() {
      let _this = this;
      let chart = echarts.init(document.getElementById("fault-info-record"));
      chart.setOption(_this.optionFaultInfoRecord);
      var index = 0;
      // 自动循环显示tooltips
      setInterval(function() {
        chart.dispatchAction({
          type: "showTip",
          // x:20,
          // y:10
          seriesIndex: 0, // 显示第几个series
          dataIndex: index // 显示第几个数据
        });
        index++;
        if (index > _this.seriesData1.length) {
          index = 0;
        }
      }, 3000);
      // chart.on('mousedown',)
      //建议加上以下这一行代码，不加的话当浏览器窗口缩小的时候echart图会超过div的界限
      window.addEventListener("resize", function() {
        chart.resize();
      });
    },
    colorList() {
      //tooltips间隔换色
      for (let i = 0; i < seriesData.length; i++) {
        if (i % 2 == 0) {
          //偶数行
          return "#E7910B";
        } else {
          //奇数行
          return "#00ffff";
        }
      }
    }
  }
};
</script>

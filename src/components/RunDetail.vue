<template>
  <div class="bg-main run-detail">
    <el-container>
      <el-header class="header">NY40运行数据监控</el-header>
      <el-main>
        <!--返回按钮-->
        <div class="backTo" @mouseenter="show" @mouseleave="hide">
          <span v-on:click="back" v-show="isShow"></span>
        </div>
        <div class="flex-box">
          <div class="flex-item" style="width:361px;">
            <div class="relative-animate" style="height:282px;">
              <div class="module module-alarm" style="height:282px;">
                <h3>
                  <span class="title">告警信息</span>
                </h3>
                <div class="flex-box">
                  <div class="flex-item">
                    <img src="../assets/alarm01.png" alt />
                  </div>
                  <div class="flex-item info">{{detailAlarm}}</div>
                </div>
                <my-animate class="detail-alarm-animate"></my-animate>
              </div>
            </div>
            <div class="relative-animate" style="height:300px;">
              <div class="module" style="height:300px;">
                <h3>
                  <span class="title">发电功率图表</span>
                  <!-- <span class="num">42</span> -->
                </h3>
                <power
                  :echartId="power.echartId"
                  classify="line"
                  id="power"
                  :serialNo="serialNo"
                  :areaColorStart="power.areaColorStart"
                  :areaColorEnd="power.areaColorEnd"
                  :yAxisName="power.yAxisName"
                ></power>
                <my-animate class="detail-power-animate"></my-animate>
              </div>
            </div>
            <div class="relative-animate" style="height:300px;">
              <div class="module" style="height:300px;">
                <h3>
                  <span class="title">综合利用效率</span>
                  <!-- <span class="num">42</span> -->
                </h3>
                <comprehensive-use
                  :echartId="comprehensiveUse.echartId"
                  classify="line"
                  id="comprehensiveUse"
                  :serialNo="serialNo"
                  :areaColorStart="comprehensiveUse.areaColorStart"
                  :areaColorEnd="comprehensiveUse.areaColorEnd"
                  :yAxisName="comprehensiveUse.yAxisName"
                ></comprehensive-use>
                <my-animate class="detail-comprehensiveUse-animate"></my-animate>
              </div>
            </div>
          </div>
          <div class="flex-item" style="width:994px;">
            <div class="relative-animate" style="height:596px;">
              <div class="module module-main" style="height:596px;">
                <div class="flex-box main-title">
                  <div>产品编号：{{equipmentNo}}</div>
                  <div>网点名称：{{shopName}}</div>
                </div>
                <run-detail-main :shopAddress="shopAddress" :serialNo="serialNo"></run-detail-main>
                <my-animate class="detail-main-animate"></my-animate>
              </div>
            </div>
            <div class="relative-animate" style="height:299px;">
              <div class="module module-save-resources" style="height:299px;">
                <h3>
                  <span class="title" style="margin-left:30px;">累计节约标煤图表</span>
                  <!-- <span class="num" style="float:right;margin-right:50px;">162kg</span> -->
                </h3>
                <totalSaveEnergy
                  :echartId="totalSaveEnergy.echartId"
                  classify="line"
                  id="totalSaveEnergy"
                  :serialNo="serialNo"
                  :axisLabelRotate="totalSaveEnergy.axisLabelRotate"
                  :itemStyleColor="totalSaveEnergy.itemStyleColor"
                  :itemStyleOpacity="totalSaveEnergy.itemStyleOpacity"
                  :areaColorStart="totalSaveEnergy.areaColorStart"
                  :areaColorEnd="totalSaveEnergy.areaColorEnd"
                  :lineColorStart="totalSaveEnergy.lineColorStart"
                  :lineColorEnd="totalSaveEnergy.lineColorEnd"
                  :yAxisName="totalSaveEnergy.yAxisName"
                ></totalSaveEnergy>
                <my-animate class="detail-save-resources-animate"></my-animate>
              </div>
            </div>
          </div>
          <div class="flex-item" style="width:361px;">
            <div class="relative-animate" style="height:282px;">
              <div class="module module-alarm" style="height:282px;">
                <span class="title">故障信息</span>
                <div class="flex-box">
                  <div class="flex-item">
                    <img src="../assets/alarm02.png" alt />
                  </div>
                  <div class="flex-item info">{{detailError}}</div>
                </div>
                <my-animate class="detail-error-animate"></my-animate>
              </div>
            </div>
            <div class="relative-animate" style="height:300px;">
              <div class="module" style="height:300px;">
                <h3>
                  <span class="title">余热功率图表</span>
                  <!-- <span class="num">4.8</span> -->
                </h3>
                <waste-heat
                  :echartId="wasteHeat.echartId"
                  classify="line"
                  id="wasteHeat"
                  :serialNo="serialNo"
                  :areaColorStart="wasteHeat.areaColorStart"
                  :areaColorEnd="wasteHeat.areaColorEnd"
                  :yAxisName="wasteHeat.yAxisName"
                ></waste-heat>
                <my-animate class="detail-wasteHeat-animate"></my-animate>
              </div>
            </div>
            <div class="relative-animate" style="height:300px;">
              <div class="module" style="height:300px;">
                <h3>
                  <span class="title">燃气消耗图表</span>
                  <!-- <span class="num">4.8</span> -->
                </h3>
                <gas
                  :echartId="gas.echartId"
                  classify="line"
                  id="gas"
                  :serialNo="serialNo"
                  :areaColorStart="gas.areaColorStart"
                  :areaColorEnd="gas.areaColorEnd"
                  :lineColorStart="gas.lineColorStart"
                  :lineColorEnd="gas.lineColorEnd"
                  :yAxisName="gas.yAxisName"
                  :smooth="gas.smooth"
                ></gas>
                <my-animate class="detail-gas-animate"></my-animate>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
var echarts = require("echarts");

import power from "@/components/detail/power";
import comprehensiveUse from "@/components/detail/comprehensiveUse";
import totalSaveEnergy from "@/components/detail/totalSaveEnergy";
import wasteHeat from "@/components/detail/wasteHeat";
import gas from "@/components/detail/gas";
import runDetailMain from "@/components/runDetailMain";
import myAnimate from "@/components/myAnimate";
export default {
  name: "Index",
  data() {
    return {
      isShow: false,
      // echarts样式配置
      power: {
        //发电功率
        echartId: "power",
        lineEchartx: [],
        lineEcharty: [],
        areaColorStart: "rgba(0, 255, 255, 0.34)",
        areaColorEnd: "rgba(183, 190, 255, 0.34)",
        yAxisName: "功率/kW"
      },
      comprehensiveUse: {
        //综合利用效率
        echartId: "comprehensiveUse",
        lineEchartx: [],
        lineEcharty: [],
        areaColorStart: "rgba(86, 139, 254, .4)",
        areaColorEnd: "rgba(0, 80, 253, .4)",
        yAxisName: "效率 /%"
      }, //累计节约标煤
      totalSaveEnergy: {
        echartId: "totalSaveEnergy",
        lineEchartx: [],
        lineEcharty: [],
        axisLabelRotate: 0,
        itemStyleColor: "rgba(6, 255, 54, 1)",
        itemStyleOpacity: "1",
        areaColorStart: "transparent",
        areaColorEnd: "transparent",
        lineColorStart: "rgba(6, 255, 54, 1)",
        lineColorEnd: "rgba(6, 255, 54, 1)",
        yAxisName: "标煤 /kg"
      },
      wasteHeat: {
        //余热功率
        echartId: "wasteHeat",
        lineEchartx: ["15:30", "15:40", "16:10", "16:40"],
        lineEcharty: ["15", "18", "20", "40"],
        areaColorStart: "rgba(0, 255, 255, 0.34)",
        areaColorEnd: "rgba(183, 190, 255, 0.34)",
        yAxisName: "功率/kW"
      },
      gas: {
        //燃气消耗
        echartId: "gas",
        lineEchartx: ["15:30", "15:40", "16:10", "16:40"],
        lineEcharty: ["15", "18", "20", "40"],
        areaColorStart: "rgba(236, 68, 0, .5)",
        areaColorEnd: "rgba(217, 39, 37, .5)",
        lineColorStart: "rgba(236, 68, 0, .5)",
        lineColorEnd: "rgba(217, 39, 37, .5)",
        yAxisName: "消耗量 /㎡/h",
        smooth: true
      },
      serialNo: this.$route.query.serialNo,
      equipmentNo: this.$route.query.equipmentNo,
      shopName: this.$route.query.shopName,
      shopAddress: this.$route.query.shopAddress,
      detailAlarm: "", //告警信息
      detailError: "" //故障信息
    };
  },
  components: {
    echarts,
    power,
    comprehensiveUse,
    totalSaveEnergy,
    wasteHeat,
    gas,
    runDetailMain,
    myAnimate
  },
  mounted: function() {
    this.getDetailAlarm();
    this.getDetailError();
    // this.getLineInfo('发电功率');
  },
  computed: {},
  methods: {
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    //告警信息
    getDetailAlarm() {
      this.http
        .get(this.api.detail.detailAlarm, {
          params: { serialNo: this.serialNo }
        })
        .then(res => {
          if (res.data.length == 0) {
            this.detailAlarm = "正常";
          } else {
            this.detailAlarm = res.data[0].ERROR_MSG;
          }
        });
    },
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
            // console.log(echarts.mounted())
          }
          _this.drawDetailLine("power");
        });
    },
    //故障信息
    getDetailError() {
      this.http
        .get(this.api.detail.detailError, {
          params: { serialNo: this.$route.query.serialNo }
        })
        .then(res => {
          if (res.data.length == 0) {
            this.detailError = "正常";
          } else {
            this.detailError = res.data[0].ERROR_MSG;
          }
        });
    },
    drawDetailLine(el) {
      let chartDetailLine = echarts.init(document.getElementById(el));
      chartDetailLine.setOption(_this.optiondetailLine);
    }
  },
  beforeDestroy() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../src/assets/style.css";
@import "../../src/assets/detail.css";
</style>
<style>
.myform {
  height: 32px;
  margin-bottom: 10px;
  padding-left: 14px;
}
.myform .el-form-item--small.el-form-item {
  margin-bottom: 0;
}
.myform input,
.myform .el-button--small {
  font-size: 16px;
  height: 32px;
  line-height: 32px;
}
.myform .submit-btn {
  padding: 0 14px;
}
.myform input.el-input__inner {
  background-color: transparent !important;
  border: 1px solid #0d579a;
  color: #fff;
}
.myform .title input.el-input__inner {
  border: none;
}
.myform .el-range-editor--small.el-input__inner {
  background-color: transparent;
  border: 1px solid #0d579a;
}
.myform .el-range-editor--small .el-range-input {
  font-size: 16px;
  background-color: transparent;

  color: #fff;
}
.myform .el-date-editor .el-range-separator {
  color: #fff;
  font-size: 16px;
}
.formAlarmDisplay {
  margin-top: 10px;
}

.mytable {
  background-color: transparent;
  text-align: center;
}
.mytable .el-table tbody tr {
  color: #fff;
  font-size: 16px;
  background-color: transparent;
}
</style>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.backTo {
  position: absolute;
  top: 5%;
  left: 2%;
  width: 48px;
  height: 48px;
  cursor: pointer;
}
.backTo span {
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(../../src/assets/icon-back.png) no-repeat;
  background-size: contain;
}
</style>

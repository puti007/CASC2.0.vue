<template>
  <div class="index bg-main">
    <el-container>
      <el-header class="header">能源站产品质量中心</el-header>
      <el-main>
        <div class="flex-box">
          <div class="flex-item" style="width:408px;">
            <div class="relative-animate" style="height:385px;">
              <div class="module module-device-failure" style="height:385px;">
                <h3 class="title">设备故障统计</h3>
                <device-failure></device-failure>
                <my-animate class="device-failure-animate"></my-animate>
              </div>
            </div>

            <div class="relative-animate">
              <div class="module" style="height:501px;">
                <h3 class="title">故障类型统计</h3>
                <device-failure-type></device-failure-type>
                <my-animate class="device-failure-type-animate"></my-animate>
              </div>
            </div>
          </div>
          <div class="flex-item " style="width:934px;">
            <device-info></device-info>
          </div>
          <div class="flex-item" style="width:409px;">
            <div class="relative-animate" style="height:387px;">
              <div class="module" id="alarm-display" style="height:387px;">
                <form-alarm-display></form-alarm-display>
                <my-animate class="alarm-display-animate"></my-animate>
              </div>
            </div>
            <div class="relative-animate">
              <div class="module" style="height:498px;">
                <h3 class="title">故障信息记录</h3>
                <fault-info-record></fault-info-record>
                <my-animate class="fault-info-record-animate"></my-animate>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import deviceFailure from "@/components/deviceFailure";
import deviceFailureType from "@/components/deviceFailureType";
import deviceInfo from "@/components/deviceInfo";
import formAlarmDisplay from "@/components/formAlarmDisplay";
import faultInfoRecord from "@/components/faultInfoRecord";
import myAnimate from "@/components/myAnimate";
export default {
  name: "Index",
  data() {
    return {};
  },
  components: {
    deviceFailure,
    deviceFailureType,
    deviceInfo,
    formAlarmDisplay,
    faultInfoRecord,
    myAnimate
  },
  mounted: function() {},
  computed: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../src/assets/style.css";
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
</style>

<template>
  <div>
    <h3 class="title">告警显示</h3>
    <el-form :inline="true" :model="formAlarmDisplay" class="formAlarmDisplay myform">
      <el-form-item>
        <el-input
          placeholder="请输入查询内容"
          prefix-icon="el-icon-search"
          v-model="formAlarmDisplay.keywords"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getAlarm" class="submit-btn alarm-submit-btn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="alarmDiplayData"  
      width="100%"
      max-height="245"
      :stripe="true"
      class="mytable"
      :row-style="tableRowStyle"
      :cell-style="tableCellStyle"
      :header-row-style="tableHeaderRowStyle"
      :header-cell-style="tableHeaderCellStyle"
      >
      <el-table-column  prop="EQUIPMENT_NO" label="设备号" ></el-table-column>
      <el-table-column prop="SHOP_NAME" label="地址" width="118"></el-table-column>
      <el-table-column prop="ERROR_TIME" label="告警时间" width="90"></el-table-column>
      <el-table-column prop="ERROR_MSG" label="告警内容" width="90"></el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
@import "../../src/assets/style.css";
</style>
<style>
 .alarm-submit-btn {
  background-color: rgba(11, 113, 182, 0.4);;
  color: #1fa5ff;
  border-color: #1fa5ff;
}
.el-table tr:hover>td {
		background-color: #134087 !important;
	}
.el-table::before {
  height: 0;
}
.el-table .cell{
  padding:0;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(11, 113, 182, 0.12);
}
</style>

<script>
export default {
  name: "formAlarmDisplay",
  data() {
    return {
      formAlarmDisplay:{
        //告警显示查询表单
        keywords:""
      },
      alarmDiplayData:[]//告警显示表格数据
    };
  },
  mounted(){
    this.getAlarm()
  },
  methods: {
    queryAlarmDisplay() {
      this.getAlarm()
    },
    getAlarm(){
      this.http.get(this.api.alarm,{
        params:{searchStr:this.formAlarmDisplay.keywords}
      }).then(res => {
        this.alarmDiplayData = res.data;
      })
    },
    tableRowStyle(row, rowIndex) {
      return "height:42px;padding:0;color:#ffffff;font-size: 16px;background-color:transparent";
    },
    tableCellStyle() {
      return "border-bottom:none;text-align:center;font-size:14px;";
    },
    tableHeaderRowStyle({ row, column, rowIndex, columnIndex }) {
      //表头样式
      return "background-color:rgba(11, 113, 182, 0.4);";
    },
    tableHeaderCellStyle({ row, column, rowIndex, columnIndex }) {
      //表头样式
      return "height:46px;text-align:center;padding:0;color:#1FA5FF;font-size: 18px;background-color:rgba(11, 113, 182, 0.4);border-bottom:0;";
    }
  }
};
</script>

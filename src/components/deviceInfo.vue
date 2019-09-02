<template>
  <div>
    <div class="relative-animate">
      <div class="module module-earth" style="height:656px;">
        <h3 class="title" style="position:absolute;">{{currentTime}}</h3>
        <div id="earth"></div>
        <div class="save-resource">
          <div class="item">
            <p>{{saveResource.tree.value}}棵</p>
            <div>
              <img src="../assets/tree.png" alt />
            </div>
            <p>{{saveResource.tree.title}}</p>
          </div>
          <div class="item">
            <p>{{saveResource.coal.value}}kg</p>
            <div>
              <img src="../assets/coal.png" alt />
            </div>
            <p>{{saveResource.coal.title}}</p>
          </div>
          <div class="item">
            <p>{{saveResource.co2.value}}kg</p>
            <div>
              <img src="../assets/co2.png" alt />
            </div>
            <p>{{saveResource.co2.title}}</p>
          </div>
        </div>
        <my-animate class="earth-animate"></my-animate>
      </div>
    </div>
    <div class="relative-animate">
      <div class="module" id="device-info" style="height:230px;">
        <el-form :inline="true" :model="formDeviceInfo" class="device-info-form myform">
          <!-- <el-form-item>
          <el-select v-model="formDeviceInfo.deviceNameSelect" placeholder="设备名称" class="title">
            <el-option label="设备1" value="001"></el-option>
            <el-option label="设备2" value="002"></el-option>
          </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-input
              placeholder="请输入查询内容"
              prefix-icon="el-icon-search"
              v-model="formDeviceInfo.searchStr"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="formDeviceInfo.deviceInfoDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getEquipmentInfo"
              class="submit-btn device-submit-btn"
            >查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="deviceInfoData"
          width="100%"
          height="124"
          class="mytable"
          :row-style="tableRowStyle"
          :cell-style="tableCellStyle"
          :header-cell-style="tableHeaderStyle"
        >
          <el-table-column prop="EQUIPMENT_NO" label="设备号" width="100"></el-table-column>
          <el-table-column prop="SHOP_NAME" label="网点名称" width="230"></el-table-column>
          <el-table-column prop="SHOP_ADDRESS" label="详细地址" width="250"></el-table-column>
          <el-table-column prop="TIME_INSTALL" label="安装时间" width="90"></el-table-column>
          <el-table-column prop="TIME_RUN" label="运行时间" width="80"></el-table-column>
          <el-table-column prop="IS_ONLINE" label="状态" width="60"> 
            <template slot-scope="scope">
              <span
                :style="scope.row.IS_ONLINE==='正常' ? 'color:#00FFA0' : 'color:#fff'"
              >{{scope.row.IS_ONLINE}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="EFFICIENCY" label="效率" width="60"></el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <span @click="viewDetail(scope.row)" type="text" class="btn-detail">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout=" prev, pager, next,total, sizes, jumper"
          :total="total"
          class="my-pagination"
        ></el-pagination>
        <my-animate class="device-info-animate"></my-animate>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../src/assets/style.css";
</style>
<style>
.device-submit-btn {
  background-color: #033257;
  color: #00feff;
  border-color: #0d579a;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}
.el-table::before {
  height: 0;
}
.btn-detail {
  color: #00ffff;
  cursor: pointer;
}
.my-pagination {
  margin-top: 10px;
  text-align: right;
}
.my-pagination button,
.el-pagination.is-background .el-pager li {
  background-color: #033257 !important;
  color: #00feff !important;
  border: 1px solid #0d579a !important;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ff9800 !important;
  color: #fff !important;
  border-color: #ff9800 !important;
}
.my-pagination .el-pagination__total,
.my-pagination .el-pagination__jump,
.my-pagination .el-select .el-input .el-select__caret {
  color: #00feff;
}
.my-pagination .el-input__inner {
  height: 22px;
  line-height: 22px;
  color: #00feff;
  background-color: #033257;
  border: 1px solid #0d579a;
}
</style>

<script>
var echarts = require("echarts");
import myAnimate from "@/components/myAnimate";

export default {
  name: "formDeviceInfo",
  components: { myAnimate },
  data() {
    return {
      currentTime: this.refreshClock(),
      saveResource: {
        tree: {
          value: "",
          title: "累计植树量"
        },
        coal: {
          value: "",
          title: "累计节约标煤"
        },
        co2: {
          value: "",
          title: "累计减少CO2排放"
        }
      },
      mapData: [],
      geoCoordMap: {}, //经纬度
      formDeviceInfo: {
        //设备信息查询表单
        deviceNameSelect: "",
        searchStr: "",
        deviceInfoDate: []
      },
      deviceInfoData: [], //设备信息表格数据
      pageSizes: [2, 5, 10], //每页显示条数
      pageSize: 2, //默认每页2条
      total: 0, //总条数
      currentPage: 1, //前往第几页
      startRow: 1,
      endRow: 2
    };
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      //时间
      _this.currentTime = _this.refreshClock();
    }, 1000);

    //设备详细列表
    this.getEquipmentInfo();
    //设备总数和节约能源
    this.http
      .get(this.api.equipmentNum, {
        params: {
          userId: "admin",
          searchStr: this.formDeviceInfo.searchStr
        }
      })
      .then(res => {
        this.total = res.data[0].TOTAL_NUM;
        this.saveResource.tree.value = res.data[0].TOTAL_TREE;
        this.saveResource.coal.value = res.data[0].TOTAL_COAL;
        this.saveResource.co2.value = res.data[0].TOTAL_CO2;
      });
  },
  computed: {
    optionEarth() {
      let _this = this;
      let imgUrl = "image://" + "../../src/assets/earthLegend.png";
      let obj = {
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            return (
              "设备号：" +
              params.data.equipmentNo +
               "<br/>" +
              "网点名称：" +
              params.data.shopName +
              "<br/>" +
              "详细地址：" +
              params.data.address +
              "<br/>" +
              "安装时间：" +
              params.data.timeInstall +
              "<br/>" +
              "运行时间：" +
              params.data.timeRun +
              "<br/>" +
              "状态：" +
              params.data.isOnline +
              "<br/>" +
              "效率：" +
              params.data.efficienty
            );
          }
        },
        color: ["#ffe04b"],
        legend: {
          show: "true",
          orient: "vertical",
          right: "60",
          data: [{ name: "设备位置" }],
          shadowColor: ["rgba(0, 0, 0, 0.5)"],
          shadowBlur: "50",
          shadowOffsetX: "100",
          shadowOffsetY: "100",
          textStyle: {
            color: "#fff",
            fontSize: "16",
            icon: "image://./src/assets/earthLegend.png"
          }
        },
        geo: {
          map: "china",
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#00ffff",
                fontSize: "14"
              }
            },
            emphasis: {
              show: false
            }
          },
          zoom: "1.2",
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "rgba(20,153,240,1)",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#00ffff"
            }
          }
        },
        series: [
          {
            name: "设备位置",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: _this.convertData(_this.mapData),
            // encode: {
            //   value: 2
            // },
            symbolSize: "20",
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      return obj;
    }
  },
  methods: {
    drawEarth() {
      let _this = this;
      let chartEarth = echarts.init(document.getElementById("earth"));
      chartEarth.setOption(_this.optionEarth);
      //建议加上以下这一行代码，不加的话当浏览器窗口缩小的时候echart图会超过div的界限
      window.addEventListener("resize", function() {
        chartEarth.resize();
      });
    },
    convertData(data) {
      var _this = this;
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = _this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].value,
            value: geoCoord.concat(data[i].value),
            equipmentNo: data[i].value,
            shopName: data[i].shopName,
            address: data[i].address,
            timeInstall: data[i].timeInstal,
            timeRun: data[i].timeRun,
            isOnline: data[i].isOnline,
            efficienty: data[i].efficienty
          });
        }
      }
      return res;
    },
    refreshClock() {
      let date = new Date();
      let hours = this.format2Len(date.getHours());
      let minutes = this.format2Len(date.getMinutes());
      let seconds = this.format2Len(date.getSeconds());
      return hours + ":" + minutes + ":" + seconds;
    },
    format2Len(n) {
      return n < 10 ? "0" + n : n;
    },
    getEquipmentInfo() {
      this.http
        .get(this.api.equipmentInfo, {
          params: {
            userId: "admin",
            startRow: this.startRow,
            endRow: this.endRow,
            searchStr: this.formDeviceInfo.searchStr,
            startTime: this.formDeviceInfo.deviceInfoDate[0],
            endTime: this.formDeviceInfo.deviceInfoDate[1],
            source: "pc"
          }
        })
        .then(res => {
          this.deviceInfoData = res.data;
          for (let i = 0; i < res.data.length; i++) {
            this.mapData.push({
              name: res.data[i].EQUIPMENT_NO,
              value: res.data[i].EQUIPMENT_NO,
              shopName:res.data[i].SHOP_NAME,
              address: res.data[i].SHOP_ADDRESS,
              timeInstal: res.data[i].TIME_INSTALL,
              timeRun: res.data[i].TIME_RUN,
              isOnline: res.data[i].IS_ONLINE,
              efficienty: res.data[i].EFFICIENCY
            });
            this.geoCoordMap[res.data[i].EQUIPMENT_NO] = [
              res.data[i].LAT,
              res.data[i].LNG
            ];
          }
          this.drawEarth();
        });
    },
    //查看详情
    viewDetail(row) {
      console.log(row);
      this.$router.push({
        path: "runDetail",
        query: {
          serialNo: row.SERIAL_NO,
          equipmentNo: row.EQUIPMENT_NO,
          shopName: row.SHOP_NAME,
          shopAddress: row.SHOP_ADDRESS
        },
        props: true
      });
    },
    //改变每页条数
    handleSizeChange(val) {
      // console.log(`每页${val}条`);
      this.pageSize = val;
      this.startRow = this.pageSize * (this.currentPage - 1) + 1;
      this.endRow = this.pageSize * this.currentPage;
      this.getEquipmentInfo();
    },
    // 跳至第几页
    handleCurrentChange(val) {
      // console.log(`当前页${val}`);
      this.mapData = [];
      this.currentPage = val;
      this.startRow = this.pageSize * (this.currentPage - 1) + 1;
      this.endRow = this.pageSize * this.currentPage;
      this.getEquipmentInfo();
    },
    //设置element-ui table样式
    tableRowStyle(row, rowIndex) {
      return "height:38px;padding:0;color:#ffffff;font-size: 16px;background-color:transparent";
    },
    tableCellStyle() {
      return "border-bottom:none;padding:0;text-align:center;font-size:16px;";
    },
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      //表头样式
      return "height:46px;text-align:center;    padding:0;color:#00ffff;font-size: 18px;background-color:#033257;border-bottom:0;";
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //vue实例销毁前，清除定时器
    }
  }
};
</script>

<template>
  <div class="run-detail-main">
    <div class="flex-box">
      <div class="flex-item">
        <div class="flex-item-gas">
          <div class="title">
            <img src="../assets/icon-gas.png" alt />燃气
          </div>
          <ul>
            <li>
              <div>燃气温度</div>
              <div class="data">{{values[3]}}</div>
              <div>℃</div>
            </li>
            <li>
              <div>燃气压力</div>
              <div class="data">{{values[4]}}</div>
              <div>kPa</div>
            </li>
            <li>
              <div>燃气消秏</div>
              <div class="data">{{rqhl}}</div>
              <!-- <div class="data">8</div> -->
              <div>㎡/h</div>
            </li>
          </ul>
        </div>
        <div class="flex-item-power">
          <div class="title">
            <img src="../assets/icon-power.png" alt />电力
          </div>
          <ul>
            <li>
              <div>市电电压</div>
              <div class="data">{{values[12]}}</div>
              <div>V</div>
            </li>
            <li>
              <div>市电频率</div>
              <div class="data">{{values[13]}}</div>
              <div>Hz</div>
            </li>
            <li>
              <div>发电功率</div>
              <div class="data">{{values[14]}}</div>
              <div>kW</div>
            </li>
            <li>
              <div>发电效率</div>
              <div class="data">{{fdxl}}</div>
              <div>%</div>
            </li>
            <li>
              <div>功率因数</div>
              <div class="data">{{values[16]}}</div>
              <div style="visibility:hidden;">0</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="middle">
        <div class="middle-top">
          <div class="left">
            <div class="title">
              <img src="../assets/icon-smoke.png" alt />
              排烟温度&nbsp;&nbsp;{{values[0]}}
              <span class="unit">℃</span>
            </div>
            <div class="mainImg-box">
              <indicator-line class="indicator-line1"></indicator-line>
              <indicator-line class="indicator-line2"></indicator-line>
              <indicator-line class="indicator-line3"></indicator-line>
              <indicator-line class="indicator-line4"></indicator-line>
              <img src="../assets/ny40.png" alt />
            </div>
          </div>
          <div class="right">
            <div class="title" style="margin-bottom:20px;">
              <img src="../assets/icon-envir-temp.png" alt />
              环境温度&nbsp;&nbsp;{{values[1]}}
              <span class="unit">℃</span>
            </div>
            <div class="flex-item-supplywater">
              <div class="title">
                <img src="../assets/icon-supply-water.png" alt />供水
              </div>
              <ul>
                <li>
                  <div>供水温度</div>
                  <div class="data">{{values[6]}}</div>
                  <div>℃</div>
                </li>
                <li>
                  <div>供水流量</div>
                  <div class="data">{{values[7]}}</div>
                  <div>㎡/h</div>
                </li>
                <li>
                  <div>余热功率</div>
                  <div class="data">{{yrgl}}</div>
                  <div>KW</div>
                </li>
              </ul>
            </div>
            <div class="title" style="margin-top:12px;">
              <img src="../assets/icon-device-status.png" alt />设备状态&nbsp;&nbsp;运行
            </div>
          </div>
        </div>
        <div class="middle-bottom">
          <div class="title">
            <img src="../assets/icon-loc.png" alt />
            {{shopAddress}}
          </div>
          <ul>
            <li>
              <div class="middle-bottom-left">
                <span class="item-title">累计开机</span>
                <span class="data">{{values[17]}}</span>
                <span class="unit">次</span>
              </div>
              <div class="middle-bottom-right">
                <span class="item-title">累计发电量</span>
                <span class="data">{{values[18]}}</span>
                <span class="unit">kW/h</span>
              </div>
            </li>
            <li>
              <div class="middle-bottom-left">
                <span class="item-title">累计运行</span>
                <span class="data">{{values[19]}}</span>
                <span class="unit">h</span>
              </div>
              <div class="middle-bottom-right">
                <span class="item-title">维护剩余时间</span>
                <span class="data">{{values[20]}}</span>
                <span class="unit">h</span>
              </div>
            </li>
            <li>
              <div class="middle-bottom-left">
                <span class="item-title">累计余热量</span>
                <!-- <span class="data">{{values[21]}}</span> -->
                <span class="data">0</span>
                <span class="unit">kW/h</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-item">
        <div class="flex-item-water-temp">
          <div class="title">
            <img src="../assets/icon-water-temp.png" alt />
            回水温度&nbsp;&nbsp;{{values[2]}}
            <span class="unit">℃</span>
          </div>
          <img src="../assets/water-box.png" alt />
        </div>
        <div class="flex-item-water-box">
          <div class="title">
            <img src="../assets/icon-water-box.png" alt />水箱
          </div>
          <ul>
            <li>
              <div>水箱上层温度</div>
              <div class="data">{{values[9]}}</div>
              <div>℃</div>
            </li>
            <li>
              <div>水箱中层温度</div>
              <div class="data">{{values[10]}}</div>
              <div>℃</div>
            </li>
            <li>
              <div>水箱下层温度</div>
              <div class="data">{{values[11]}}</div>
              <div>℃</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IndicatorLine from "@/components/IndicatorLine";
export default {
  components: { "indicator-line": IndicatorLine },
  data() {
    return {
      websocket: null,
      curSid: 0,
      value: 0,
      values: [], //各项运行数据集合
      gswd: 0, //供水温度
      hswd: 0, //回水温度
      gsll: 0, //供水流量
      yrgl: 0, //余热功率：由上面三个参数计算所得
      rqhl: 0, //燃气秏量
      rqwd: 0, //燃气温度
      fdxl: 0 //发电效率：由上面两个参数计算所得
    };
  },
  props: {
    serialNo: String, //
    shopAddress: String //网点地址
  },
  created() {
    // 页面进入时开启长连接
    this.initWebSocket();
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    //初始化websocket
    initWebSocket() {
      let _this = this;
      const wsurl = process.env.WS_API;//ws地址
      // const wsurl = "ws://47.98.126.34:8234"; //ws地址
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        _this.websocket = new WebSocket(wsurl);
      } else {
        console.log("当前浏览器不支持WebSocket通讯！");
      }
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接WebSocket连接
      var curUserID = "admin";
      this.websocket.send(
        '{"Flag":1747212051,"CmdType":1,"Cmd":1,"Body":[{"User":"' +
          curUserID +
          '","Pwd":"1234"}]}'
      );
    },
    websocketonerror(e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(event) {
      var _this = this;
      var msg = eval("(" + event.data + ")");
      if (msg.Cmd == "1" && msg.CmdType == "2") {
        //alert("用户登录成功");
        _this.monitor();
      } else if (msg.Cmd == "1" && msg.CmdType == "3") {
        alert("用户登录失败");
      } else if (msg.Cmd == "3" && msg.CmdType == "4") {
        //回写监控到的参数值
        _this.getsysParams();
        _this.refreshParamValue(msg);
      } else {
      }
    },
    //关闭WebSocket连接
    websocketclose(e) {
      console.log("connection closed ");
      location.reload();
    },
    //开始监控
    monitor() {
      var serialNo = this.serialNo;
      this.websocket.send(
        '{"Flag":1747212051,"CmdType":1,"Cmd":16,"Body":[{"SerialNo":"' +
          serialNo +
          '","Enable":1}]}'
      );
    },
    //回写监控到的参数值
    refreshParamValue(jsonStr) {
      var p = jsonStr.Body[0].Param;
      var _this = this;
      // console.log(p[i].Sid)
      for (var i = 0; i < p.length; i++) {
        _this.value = p[i].Pvalue;
        if (p[i].Sid == "5") {
          //排烟温度℃
          _this.$set(_this.values, 0, (_this.value * 0.1).toFixed(1));
        } else if (p[i].Sid == "21") {
          //环境温度℃
          _this.$set(_this.values, 1, _this.value);
          _this.$set(_this.values, 11, _this.value);
        } else if (p[i].Sid == "14") {
          //回水温度℃
          _this.$set(_this.values, 2, (_this.value * 0.1).toFixed(1));
          _this.hswd = (_this.value * 0.1).toFixed(1); //回水温度（用于计算余热功率）
        } else if (p[i].Sid == "17") {
          //燃气温度℃
          _this.$set(_this.values, 3, _this.value);
          _this.rqwd = _this.value; //燃气温度（用于计算发电效率）
        } else if (p[i].Sid == "18") {
          //燃气压力kPa
          _this.$set(_this.values, 4, (_this.value * 0.01).toFixed(2));
        } else if (p[i].Sid == "61") {
          //燃气耗量m3/h
          _this.$set(_this.values, 5, _this.value.toFixed(2));
        } else if (p[i].Sid == "13") {
          //供水温度℃
          _this.$set(_this.values, 6, (_this.value * 0.1).toFixed(1));
          _this.gswd = (_this.value * 0.1).toFixed(1); //供水温度(用于计算余热功率)
        } else if (p[i].Sid == "15") {
          //供水流量m3/h
          _this.$set(_this.values, 7, (_this.value * 0.001).toFixed(3));

          _this.gsll = (_this.value * 0.001).toFixed(3); //供水流量（用于计算余热功率）
        }  else if (p[i].Sid == "19") {
          //水箱上层温度℃
          _this.$set(_this.values, 9, _this.value);
        } else if (p[i].Sid == "20") {
          //水箱中层温度℃
          _this.$set(_this.values, 10, _this.value);
        } else if (p[i].Sid == "1") {
          //市电电压V
          _this.$set(_this.values, 12, _this.value);
        } else if (p[i].Sid == "2") {
          //市电频率Hz
          _this.$set(_this.values, 13, (_this.value * 0.01).toFixed(2));
        } else if (p[i].Sid == "3") {
          //发电功率kW
          _this.$set(_this.values, 14, (_this.value * 0.1).toFixed(1));
          _this.fdgl = (_this.value * 0.1).toFixed(1); //发电功率（用于计算发电效率）
        }  else if (p[i].Sid == "4") {
          //功率因数
          _this.$set(_this.values, 16, (_this.value * 0.01).toFixed(2));
        } else if (p[i].Sid == "23") {
          //累计开机次数
          _this.$set(_this.values, 17, _this.value);
        } else if (p[i].Sid == "24") {
          //累计电能kW/h
          _this.$set(_this.values, 18, (_this.value * 0.1).toFixed(1));
        } else if (p[i].Sid == "22") {
          //累计运行h
          _this.$set(_this.values, 19, _this.value);
        } else if (p[i].Sid == "25") {
          //维护剩余时间h
          _this.$set(_this.values, 20, _this.value);
        } else if (p[i].Sid == "-1") {
          //累计余热量kWh
          _this.$set(_this.values, 21, _this.value);
        }
        // console.log(_this.values)
      }
      //余热功率=4.1816*（供水温度-回水温度）*供水流量/3600*（-0.4736*回水温度+1010.1）
      if (3600 * (-0.4736 * _this.hswd + 1010.1) != 0) {
        _this.yrgl =
          ((4.1816 * (_this.gswd - _this.hswd) * _this.gsll) / 3600) *
          (-0.4736 * _this.hswd + 1010.1);
          
        _this.yrgl = _this.yrgl.toFixed(1);
      }
      //发电效率=发电功率*3.6/(燃气耗量*35.5*288.15/（273.15+燃气温度））
      if (_this.rqhl != 0 && 273.15 + _this.rqwd != 0) {
        _this.fdxl =
          (_this.fdgl * 3.6 * 100) /
          ((_this.rqhl * (_this.fdgl / 22.0) * 35.5 * 288.15) / (273.15 + (_this.rqwd - 0)));
        _this.fdxl = _this.fdxl.toFixed(1);
      }
    },
    //获取‘燃气秏量’
    getsysParams(){
      this.http.get(this.api.detail.sysParam,{params:{
        serialNo:this.serialNo
      }}).then(res => {
        this.rqhl = res.data[0].PARAM_VALUE.split(',')[0];
      })
    }
  }
};
</script>

<style scoped>
.flex-col {
  flex-direction: column;
  justify-content: space-around;
}
.flex-box {
  height: 540px;
  display: flex;
  justify-content: space-around;
  align-content: space-between;
  align-items: center;
}
ul {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 220px;
  box-sizing: border-box;
  padding: 0 22px;
}
.flex-item-gas {
  margin-bottom: 29px;
}
.flex-item-gas ul,
.flex-item-supplywater ul,
.flex-item-water-box ul {
  background: url(../assets/border-gas.png) no-repeat;
  background-size: 100% 100%;
  height: 150px;
}
.flex-item-power ul {
  background: url(../assets/border-power.png) no-repeat;
  background-size: 100% 100%;
  height: 233px;
}
ul li {
  position: relative;
  height: 38px;
  border-bottom: 1px solid rgba(0, 251, 255, 0.2);
}
ul li div {
  display: inline-block;
  font-size: 12px;
  line-height: 20px;
  margin-top: 12px;
  color: rgba(64, 124, 255, 1);
}
ul li div:first-child {
  width: 96px;
}
ul li div:last-child {
  position: absolute;
  right: 0;
}
ul li .data {
  display: inline-block;
  width: 30px;
  margin-right: 8px;
  color: #00ffff;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.middle {
  height: 504px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}
.middle-top {
  display: flex;
  justify-content: space-around;
}
.mainImg-box {
  position: relative;
}
.mainImg-box img{
  max-width: 95%;
}
.middle-bottom .title {
  width: 290px;
  /* width: auto; */
  padding: 0 5px;
  margin-top: 5px;
}
.middle-bottom ul {
  width: 470px;
  height: 153px;
  padding: 0 22px;
  background: url(../assets/border-total.png) no-repeat;
  background-size: 100% 100%;
  padding: 0 22px;
}
.middle-bottom ul li div {
  width: 180px;
}
.middle-bottom ul li div .u {
  float: right;
}
.middle-bottom ul li div:last-child {
  position: static;
}
.middle-bottom ul li div.middle-bottom-right {
  position: static;
  float: right;
}
.middle-bottom ul li .unit {
  float: right;
}
.middle-bottom .item-title {
  display: inline-block;
  width: 88px;
}
.title {
  width: 182px;
  height: 36px;
  background: rgba(9, 18, 73, 1);
  border: 2px solid rgba(17, 49, 115, 1);
  border-radius: 7px;
  color: rgba(2, 234, 241, 1);
  font-size: 16px;
  line-height: 36px;
  padding-left: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.title img {
  margin-bottom: 6px;
  margin-right: 9px;
  vertical-align: middle;
}
.title .unit {
  font-size: 12px;
  color: rgba(64, 124, 255, 1);
}
.flex-item-water-temp {
  margin-bottom: 17px;
}
</style>

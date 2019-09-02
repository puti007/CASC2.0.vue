'use strict';
import echarts from 'echarts';

export default (el, classify, ...arg) => {
    const instance = echarts.init(el);
    instance.setOption(allOptions[`${classify}Options`](...arg));
    return instance;
}
const allOptions = {
    //折线图
    lineOptions: (xdataArray, ydataArray, axisLabelRotate, itemStyleColor, itemStyleOpacity, areaColorStart, areaColorEnd, lineColorStart, lineColorEnd, yAxisName, smooth) => {
        return {
            grid: {
                top: 40
            },
            tooltip:{
                trigger:'axis',
                formatter: "时间：{b}<br/> 参数值：{c}",
                axisPointer: {
                    animation: false
                }
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                // name:"时间",
                nameGap: "6",
                data: xdataArray,
                axisLabel: {
                    color: "#fff",
                    fontSize: "12",
                    rotate: axisLabelRotate
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
                splitLine:{show:false}
            }],
            yAxis: [{
                type: 'value',
                name: yAxisName,
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
                },

            }],
            series: [{
                type: 'line',
                data: ydataArray,
                label: {
                    formatter: (params) => (params.data.name + params.data.value),
                    fontSize: 12
                },
                smooth: smooth,
                itemStyle: {
                    color: itemStyleColor,
                    opacity: itemStyleOpacity,
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: areaColorStart
                        }, {
                            offset: 1, color: areaColorEnd
                        }],
                        global: false
                    }
                },
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: lineColorStart // 0% 处的颜色
                        }, {
                            offset: 1, color: lineColorEnd // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }]


        }
    }
}
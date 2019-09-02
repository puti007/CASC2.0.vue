export default{
    equipmentInfo:'/crm.ny40EquipmentInfo.do',//设备详情列表
    equipmentNum:'/crm.ny40EquipmentNum.do',//设备总数量
    errorCount:'/crm.ny40ErrorCount.do',//设备故障统计
    errorType:'/crm.ny40ErrorType.do',//故障类型统计
    errorDetail:'/crm.ny40ErrorDetail.do',//故障信息记录
    alarm:'/crm.ny40Alarm.do',//告警显示
    detail:{
        detailAlarm :'/crm.ny40DetailAlarm.do',//单台设备告警信息
        detailError :'/crm.ny40DetailError.do',//单台设备故障信息
        lineInfo:'/crm.ny40LineInfo.do',//单台设备图表(发电功率、综合效率*、累计节约标煤*、余热功率*、燃气耗量)
        sysParam:'/crm.ny40SysParam.do'//单台设备参数(燃气耗量\节约标煤因子\热电减排因子\植树减排因子)
    },
}
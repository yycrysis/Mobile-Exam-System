/**
 * Created by aiur on 2018/12/24.
 折线图
 */
// 基于准备好的dom，初始化echarts图表
var _chart1 = null;
function initChart1() {
    //alert(recentlist);
    _chart1 = echarts.init(document.getElementById('chart1'));
    /*var listdata = [];
    var listbushudata = [];
    var listbushukll = [];
    var listxinlv = [];


    for(var i=0;i<focuslist.length;i++){
        listdata.push(focuslist[i].ndate);
        listbushukll.push(focuslist[i].xueya);
        listbushudata.push(focuslist[i].xuezhi);
        listxinlv.push(focuslist[i].xinlv);
    }*/


    var option = {
        tooltip : {
            trigger: 'axis'
        },
        /*legend: {
            data:['1','2','3','4','5']
        },*/
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : [1,2,3,4,5]
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'分数',
                type:'line',
                //stack: '总量',
                data:recentlist
            }
        ]
    };


// 为echarts对象加载数据
    _chart1.setOption(option);
}

var dom = document.getElementById("container_one");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    title: {
        text: '青少年近视情况',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0', '小学生', '初中生', '高中生', '大学生']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: "近视占比(%)",
        data: [0, 45.7, 74.4, 83.3, 87.7],
        type: 'line',
        areaStyle: {}
    }]
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
// 柱状图
var dom_t = document.getElementById("container_two");
var myChart_t = echarts.init(dom_t);
var app_t = {};
option_t = null;
option_t = {
    title: {
        text: '筛查中小学近视率',
        left: 'center'
    },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['小学一', '小学二', '小学三', '小学四', '小学五', '小学六', '初一', '初二', '初三'],
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
        name: '学生近视率(%)',
        type: 'bar',
        barWidth: '60%',
        data: [3.85, 11.32, 26.31, 38.97, 49.31, 58.72, 65.85, 73.66, 79.69]
    }]
};
if (option_t && typeof option_t === "object") {
    myChart_t.setOption(option_t, true);
}
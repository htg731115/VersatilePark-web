<template>
    <div id="main" style="width: 100%;height:600px; margin-top:40x"></div>
</template>
<script>
export default {
    data(){
        return{
            data:[]
        }
    },
    mounted(){
        this.getCarFlow();
    },
    methods:{
        init(){
            var data = this.data;
            var myChart = this.$echarts.init(document.getElementById('main'));
            var data_val = [data[5].carNum,data[4].carNum,data[3].carNum,data[2].carNum,data[1].carNum,data[0].carNum],xAxis_val = [data[5].time,data[4].time,data[3].time,data[2].time,data[1].time,data[0].time];
            var data_val1 = [0, 0, 0, 0, 0, 0, 0];
            var option = {
            backgroundColor: '#293042',
            grid: {
                left: 10,
                top: '10%',
                bottom: 20,
                right: 40,
                containLabel: true
            },
            tooltip: {
                show: true,
                backgroundColor: '#384157',
                borderColor: '#384157',
                borderWidth: 1,
                formatter: '{b}:{c}',
                extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
            },
            legend: {
                right: 0,
                top: 0,
                data: ['车流量'],
                textStyle: {
                    color: '#5c6076'
                }
            },
            title: {
                text: '停车场流量统计',
                x: '4.5%',
                top: '1%',
                textStyle: {
                    color: '#5c6076'
                }
            },
            xAxis: {
                data: xAxis_val,
                boundaryGap: false,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#5c6076'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                ayisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#5c6076'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#2e3547'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#384157'
                    }
                }
            },

            series: [{
                    type: 'bar',
                    name: 'linedemo',


                    tooltip: {
                        show: false
                    },
                    animation: false,
                    barWidth: 1.4,
                    hoverAnimation: false,
                    data: data_val,
                    itemStyle: {
                        normal: {
                            color: '#f17a52',
                            opacity: 0.6,
                            label: {
                                show: false
                            }
                        }
                    }
                },
                {
                    type: 'line',
                    name: '车流量',

                    animation: false,
                    symbol: 'circle',

                    hoverAnimation: false,
                    data: data_val1,
                    itemStyle: {
                        normal: {
                            color: '#f17a52',
                            opacity: 0,
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: '#384157',
                            opacity: 1
                        }
                    }
                },
                {
                    type: 'line',
                    name: 'linedemo',
                    smooth: true,
                    symbolSize: 10,
                    animation: false,
                    lineWidth: 1.2,
                    hoverAnimation: false,
                    data: data_val,
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: '#f17a52',
                            shadowBlur: 40,
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#f17a52',

                                }
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#f17a52',
                            opacity: 0.08
                        }
                    }

                }
            ]
        };
            myChart.setOption(option);
        },
        getCarFlow(){
            var _this = this;
            this.$axios.get("/api/get-carFlow").then(res=>{    
                this.data = res.data;
                console.log(this.data);
                this.init();
            })
        }
    }
}
</script>

<style>

</style>


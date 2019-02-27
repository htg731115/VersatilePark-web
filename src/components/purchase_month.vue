<template>
    <div id="main" style="width: 600px;height:400px;"></div>
</template>
<script>
export default {
    data(){
        return{
            montValue:[],
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
           this.$axios.get('/api/purchase-month').then(res=>{
               this.monthValue=res.data;
               this.setTable();
           })
        },
        setTable(){

            var myChart = this.$echarts.init(document.getElementById('main'));
            var xData = function() {
                var data = [];
                for (var i = 1; i < 13; i++) {
                    data.push(i + "月份");
                }
                return data;
            }();

            var option = {
                backgroundColor: "#344b58",
                "title": {
                    "text": "本年套餐销售量统计统计",
                    x: "4%",

                    textStyle: {
                        color: '#fff',
                        fontSize: '22'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '16',
                        
                    },
                },
                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow",
                        textStyle: {
                            color: "#fff"
                        }

                    },
                },
                "grid": {
                    "borderWidth": 0,
                    "top": 110,
                    "bottom": 95,
                    textStyle: {
                        color: "#fff"
                    }
                },
                "legend": {
                    x: '4%',
                    top: '11%',
                    textStyle: {
                        color: '#90979c',
                    },
                    "data": ['销量','销量折线']
                },
                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "data": xData,
                }],
                "yAxis": [{
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "splitArea": {
                        "show": false
                    },

                }],
                "dataZoom": [{
                    "show": true,
                    "height": 30,
                    "xAxisIndex": [
                        0
                    ],
                    bottom: 30,
                    "start": 0,
                    "end": 90,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: "#d3dee5",

                    },
                    textStyle: {
                        color: "#fff"
                    },
                    borderColor: "#90979c"


                }, {
                    "type": "inside",
                    "show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35
                }],
                "series": [{
                        "name": "销量",
                        "type": "bar",
                        "barMaxWidth": 35,
                        "barGap": "10%",
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(255,144,128,1)",
                                "label": {
                                    "show": true,
                                    "textStyle": {
                                        "color": "#fff"
                                    },
                                    "position": "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": [
                            this.monthValue[0],
                            this.monthValue[1],
                            this.monthValue[2],
                            this.monthValue[3],
                            this.monthValue[4],
                            this.monthValue[5],
                            this.monthValue[6],
                            this.monthValue[7],
                            this.monthValue[8],
                            this.monthValue[9],
                            this.monthValue[10],
                            this.monthValue[11],
                        ]},
                        {
                                "name": "销量折线 ",
                                "type": "line",
                                symbolSize:10,
                                symbol:'circle',
                                "itemStyle": {
                                    "normal": {
                                        "color": "rgba(252,230,48,1)",
                                        "barBorderRadius": 0,
                                        "label": {
                                            "show": true,
                                            "position": "top",
                                            formatter: function(p) {
                                                return p.value > 0 ? (p.value) : '';
                                            }
                                        }
                                    }
                                },
                                "data": [
                                    this.monthValue[0],
                                    this.monthValue[1],
                                    this.monthValue[2],
                                    this.monthValue[3],
                                    this.monthValue[4],
                                    this.monthValue[5],
                                    this.monthValue[6],
                                    this.monthValue[7],
                                    this.monthValue[8],
                                    this.monthValue[9],
                                    this.monthValue[10],
                                    this.monthValue[11],
                                ]
                            },
                ]
            }
            myChart.setOption(option);
            console.log(option);

        }
    }
}
</script>

<style>

</style>

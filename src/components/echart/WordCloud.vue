<template>
     <div id="main" style="width: 600px;height:341px;"></div>
</template>
<script>
export default {
    data(){
        return{
            plantCap:[],
        }
    },
    mounted(){
        this.getSomeContent();
    },
    methods:{
        initPie(){
            var _this = this;
            var myChart = this.$echarts.init(document.getElementById('main'));

            var datalist = [{
                offset: [56, 48],
                symbolSize: 120,
                opacity: .95,
                color: '#f467ce'
            }, {
                offset: [35, 80],
                symbolSize: 95,
                opacity: .88,
                color: '#7aabe2'
            }, {
                offset: [20, 43],
                symbolSize: 90,
                opacity: .84,
                color: '#ff7123'
            }, {
                offset: [83, 30],
                symbolSize: 90,
                opacity: .8,
                color: '#ffc400'
            }, {
                offset: [36, 20],
                symbolSize: 65,
                opacity: .75,
                color: '#5e333f'
            }, {
                offset: [64, 10],
                symbolSize: 70,
                opacity: .7,
                color: '#6b3442'
            }, {
                offset: [75, 75],
                symbolSize: 60,
                opacity: .68,
                color: '#8a3647'
            }, {
                offset: [88, 62],
                symbolSize: 50,
                opacity: .6,
                color: '#68333f'
            }];
            var datas = [];
            for (var i = 0; i < this.plantCap.length; i++) {
                var item = this.plantCap[i];
                var itemToStyle = datalist[i];
                datas.push({
                    name: item.name,
                    value: itemToStyle.offset,
                    symbolSize: itemToStyle.symbolSize,
                    itemStyle: {
                        normal: {
                            color: itemToStyle.color,
                            opacity: itemToStyle.opacity
                        }
                    },
                })
            }
            var option = {
                xAxis: {
                    type: 'value',
                     show: false,
                },
                yAxis: {
                    type: 'value',
                     show: false,
                },
                tooltip:[{
                     "trigger": "item",
                     position:"inside"
                }],
                series: [
                    {
                        type: 'scatter', // 这是个『散点图』
                        itemStyle: {
                            opacity: 0.8
                        },
                        
                           label: {
                            normal: {
                            show: true,
                            formatter: '{b}',
                            color: '#fff',
                            textStyle: {
                            fontSize: '18'
                            }
                        },
                            },
                        data:datas, 
                        }
                ]
            }
            myChart.setOption(option);
        },
        getSomeContent(projectId){
            this.$axios.get("/api/get-some-content",{
                params:{
                    projectId:this.$store.state.projectId,
                }
            }).then(res=>{
                console.log(res);
                res.data.forEach(element => {
                    const arr = {
                        name : element
                    }
                    this.plantCap.push(arr);
                });
                this.initPie();
            })
        }  
    }    
}
</script>
<style>

</style>


<template>
    <div>
        <el-row>
            <el-card>
                 <div id="main" style="width: 600px;height:400px;"></div>
            </el-card>            
        </el-row>
        <el-row>
           <el-table
             :data="evaluationData"
             height="500"
             border>
             <el-table-column prop="customer_id" label="用户ID" />
             <el-table-column prop="degress" label="用户ID" />
             <el-table-column prop="handler_status" label="用户ID" />
             <el-table-column prop="create_time" label="用户ID" />

           </el-table>
        </el-row>
    </div>
</template>
<script>
export default{
    data (){
        return {
            evaluationData:[{
                customer_id:1
            }],
            goodEvalNum:0,
            middleEvalNum:0,
            badEvalNum:0,
        }
    },
    mounted(){
        this.getEvalNum();
        this.getEvalList("全部")
    },
    //自运行
    methods:{
        getEvalNum(){
            this.$axios.get("/api/getEvaluationNum").then(res=>{
                this.goodEvalNum = res.data.good;
                this.middleEvalNum = res.data.middle;
                this.badEvalNum = res.data.bad;
                this.setTatable();
            })
        },
        setTatable()
        {
            console.log(this.goodEvalNum);
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title : {
                    text: '所有停车场项目的评价信息',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['好评','中评','差评']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:this.goodEvalNum, name:'好评'},
                            {value:this.middleEvalNum, name:'中评'},
                            {value:this.badEvalNum, name:'差评'},
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var _this=this;
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myChart.on('click', function (params) {
            _this.getEvalList(params.name);
            //传 评价类型到后台
            });//点击事件
         
        },
        getEvalList :function(type){
             this.$axios.get("/api/getEvalList2",{params:{pageNum:1,type:"中评"}}).then(res=>{
                this.evaluationData=res.data.list;
                console.log(this.evaluationData)
            })
        }
        
    }
}
</script>
<style>

</style>
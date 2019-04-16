<template>
    <div>
        <el-row >
            <el-col :span="8" :offset="6">
            <div id="main" style="width: 600px;height:400px;"></div></el-col>
        </el-row>
        <el-row>
            <el-card>
                <el-row style="">
                <el-select v-model="select" @change="searchById(select)" placeholder="请选择停车项目搜索">
                    <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    >
                    </el-option>
                </el-select>
                    <el-input v-model="customer_name" style="width:200px;"  placeholder="请输入客户名称" @keyup.enter.native="searchByName(customer_name,select)" />
                </el-row>
                <el-row>
                <el-table
                :data="evaluationDate"
                height="500"
                border>
                <el-table-column prop="customer_id" label="用户名" />
                <el-table-column prop="degress" label="满意度" width="148">
                    <template slot-scope="scope">
                    <el-tag  v-if="scope.row.degress==1" type="success">好评</el-tag>
                    <el-tag  v-else-if="scope.row.degress==2" type="warning ">中评</el-tag>
                    <el-tag  v-else-if="scope.row.degress==3" type="danger">差评</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  label="处理状态" >
                    <template slot-scope="scope">
                    <span class="el-icon-warning" style="color:red" >未处理</span>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="评价时间" />
                </el-table>
            </el-row>
         
            </el-card>            
        </el-row>

    </div>
</template>
<script>
export default{
    data(){
        return {
            evaluationDate:[],
            goodEvalNum:0,
            middleEvalNum:0,
            badEvalNum:0,
            projectList:[],
            select:'',
            customer_name:'',
        }
    },
    mounted(){
        this.getEvalNum()
        this.getList("全部");
        this.getProjectList();
    },
    methods:{
        getEvalNum(){
            this.$axios.get("/api/getEvaluationNum").then(res=>{
                this.goodEvalNum = res.data.good;
                this.middleEvalNum = res.data.middle;
                this.badEvalNum = res.data.bad;
                this.setTable();
            })
        },
        getList(type){
            var _this=this;
            this.$axios.get("/api/getEvalList",{
                params:{
                    pageNum:10,
                    type:type
                }
            }).then(res=>{       
                this.evaluationDate=res.data.list;
            })

        },
        setTable()
        {
            var myChart = this.$echarts.init(document.getElementById('main'));
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
            myChart.on('click', function (params) {//点击事件
            _this.getList(params.name);
            //传 评价类型到后台
            });
        },
        getProjectList(){
            this.$axios.get("/api/getallproject").then(res=>{
                this.projectList=res.data;
            })
        },
        searchById(project_id){
            this.$axios.get("/api/search-evalbyid",{
                params:{
                    pageNum:1,
                    project_id:project_id,
                }
            }).then(res=>{
                console.log(res)
                this.evaluationDate=res.data.list;
            })
        },
        searchByName(customer_name,project_id){
            if(customer_name!=""){
                this.searchById(select)
            }
            else{
                this.$axios.get("/api/search-evalbyname",{
                params:{
                    pageNum:1,
                    customer_name:customer_name,
                    project_id:project_id
                }
            }).then(res=>{
                this.evaluationDate=res.data.list;
            })
            }
        }
    }
}
</script>
<style>

</style>
<template>
    <div style="margin-top:40px">
          <el-table
                :data="evaluationDate"
                height="500"
                border>
                <el-table-column prop="create_time" label="评价时间" />
                
                <el-table-column prop="customer_id" label="用户名" width="80" />
                <el-table-column prop="degress" label="满意度" width="148">
                    <template slot-scope="scope">
                    <el-tag  v-if="scope.row.degress==1" type="success">好评</el-tag>
                    <el-tag  v-else-if="scope.row.degress==2" type="warning ">中评</el-tag>
                    <el-tag  v-else-if="scope.row.degress==3" type="danger">差评</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="handler_status" label="处理状态" >
                    <template slot-scope="scope">
                        <span class="el-icon-warning" style="color:red" v-if="scope.row.handler_status==1">未处理</span>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="评价描述" />
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button @click="handle(scope.row)">处理</el-button>
                    </template>
                </el-table-column>
                </el-table>
    
    <!-- dialog -->
    <el-dialog title="处理评价内容" :visible.sync="ShowDialog" :v-if="ShowDialog==false" >
       <el-form  label-width="70px" v-model="dialogDate">
         <el-row>
             <el-col :span="10">
                <el-form-item label="项目名称" >
                <el-input :disabled="true"></el-input>
                </el-form-item>
                    <el-form-item label="满意度">
                    <el-input v-if="dialogDate.degress==1" :disabled="true" value="好评"/>
                    <el-input v-else-if="dialogDate.degress==2" :disabled="true" value="中评"/>
                    <el-input v-else-if="dialogDate.degress==3" :disabled="true" value="差评"/>
                </el-form-item>
                <el-form-item label="评价描述" >
                    <el-input type="textarea" v-model="dialogDate.content" :disabled="true"/>
                </el-form-item>
             </el-col>
             <el-col :span="11" :offset="3">
                 <el-form-item label="处理状态">
                     <el-select v-model="dialogDate.handler_status" placeholder="请选择">
                        <el-option :value="1" label="未处理"/>
                        <el-option :value="2" label="待跟进"/>
                        <el-option :value="3" label="已处理"/>
                     </el-select>
                 </el-form-item>
                 <el-form-item label="回访满意度" label-width="100px" style="float:left">
                    <el-select v-model="secondDegress" placeholder="请选择回访满意度">
                        <el-option :value="0" label="未回访"/>
                        <el-option v-if="dialogDate.handler_status!=1" :value="1" label="回访满意度差"/>
                        <el-option v-if="dialogDate.handler_status!=1" :value="2" label="回访满意度一般"/>
                        <el-option v-if="dialogDate.handler_status!=1" :value="3" label="回访满意度满意"/>
                    </el-select>
                 </el-form-item>
                 <el-form-item label="反馈记录">
                     <el-input type="textarea" v-model="managerContent" placeholder=""></el-input>
                 </el-form-item>
             </el-col>
         </el-row>
                <el-form-item>
         <el-button v-on:click="cancel()">取 消</el-button>
         <el-button type="primary" v-on:click="AddProject()">确 定</el-button>
       </el-form-item>
       </el-form>
     </el-dialog>
    <el-row>
        <el-col :offset="4" :span="20">
        <wordCloud/>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import wordCloud from '../../components/echart/WordCloud.vue'
export default {
    components:{wordCloud},
    data(){
        return{
            evaluationDate:[],
            ShowDialog:false,
            dialogDate:[],
            secondDegress:null,
            managerContent:null,
        }
    },
    mounted(){
        this.searchById(this.$store.state.projectId);
    },
    methods:{
         searchById(project_id){
             console.log(this.$store);
            this.$axios.get("/api/search-evalbyid",{
                params:{
                    pageNum:1,
                    project_id:project_id,
                }
            }).then(res=>{
                this.evaluationDate=res.data.list;
            })
        },
        handle(evaluationItem){
            this.secondDegress=null;
            this.ShowDialog=true;

            this.dialogDate=JSON.parse(JSON.stringify(evaluationItem));
         
        },
        cancel(){
            this.ShowDialog=false;
        }
    }
}
</script>

<style>
.el-form-item__label{
    text-align: left;
}
</style>

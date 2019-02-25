<template>
    <div>
        <el-card>
            <el-row>
                        <el-col :span="14" :offset="1" v-for="index in 4 " class="shadow" >
                          <el-row>
                          
                          <el-col :span="7">
                              <el-row class="font">
                                 项目名称：
                              </el-row>
                              <el-row class="font">
                                 车牌号码：
                              </el-row>
                              <el-row class="font">
                                 入场时间：
                              </el-row>
                              <el-row class="font">
                              </el-row>
                          </el-col>
                          <el-col :span="7" :offset="7">
                            <img src="../assets/pic.png" height="150px" style="    box-shadow: rgb(202, 29, 246) 5px 6px 20px 6px; background-color: #c5adad;}"/>
                          </el-col>
                          </el-row>
                        </el-col>
                
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.shadow{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-bottom: 20px;
    width: 40%;
    height: 200px;
    
}
.shadow:hover{
background-image: linear-gradient(176deg, #EAC9C9 0%, #FFFFFF 100%)

}
.font{
    font-size: 1.3vw;
    
}
</style>


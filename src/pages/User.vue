<template>
  <div>
    <el-row>
      <el-col>
        <el-card >
          <el-table
             :data="Projectdata"
             height="759"
             border>
             <el-table-column
               prop="id"
               label="项目ID"
               width="148">
             </el-table-column>
             <el-table-column
               prop="name"
               label="项目名称"
               width="180">
             </el-table-column>
             <el-table-column
               prop="opentime"
               label="开业时间"
               width="140">
             </el-table-column>
             <el-table-column
               prop="managername"
               label="管理员"
               width="140">
             </el-table-column>
             <el-table-column
               prop="state"
               label="运营状态"
               width="140">
               <template slot-scope="scope">
                 <el-tag type="success" v-if="scope.row.state==1">运营中</el-tag>
                 <el-tag type="info" v-if="scope.row.state==0">未运营</el-tag>
              </template>
             </el-table-column>
             <el-table-column
               prop="total_num"
               label="总车位数"
               width="140">
             </el-table-column>
             <el-table-column
               prop="address"
               label="地址">
             </el-table-column>
             <el-table-column
               label="操作"
               width="120">
               <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" v-on:click="AlterProject(scope.row.id)">编辑</el-button>
               </template>
             </el-table-column>
           </el-table>
         </el-card>
       </el-col>

     </el-row>
  </div>
</template>

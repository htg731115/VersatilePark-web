<template>
     <div id="main" style="width: 400px;height:341px;"></div>
</template>
<script>
import 'echarts-liquidfill';
export default {
    data(){
        return{
            freeParkingNum:0,
            percent:0.3,
        }
    },
    mounted(){
        this.initPie();
    },
    methods:{
        initPie(){
            var _this = this;
            var myChart = this.$echarts.init(document.getElementById('main'));
            var option = {
                title: {
                    text: '剩余车位数'+_this.freeParkingNum,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 25,
                        color: 'rgb(97, 142, 205)'
                    },
                },
                tooltip:{
                    show:true,
                    formatter: function(a){
                        return ('停车场剩余车位:'+_this.freeParkingNum);
                    }
                },
                series: [{
                    name: '无记录',
                    type: 'liquidFill',
                    data: [_this.percent],
                }],
                
            };
            myChart.setOption(option);
        },  
        getFreeParking(projectId){
            this.$axios.get("/api/get-free-parking",{
                params:{
                    projectId:projectId,
                }
            }).then(res=>{
               this.percent = res.data.percent;
               this.freeParkingNum =  res.data.freeParkingNum

               this.initPie();
            })
        }
    }    
}
</script>
<style>

</style>


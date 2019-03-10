<template>
     <div id="main" style="width: 400px;height:400px;"></div>
</template>
<script>
import 'echarts-liquidfill';
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.initPie();
    },
    methods:{
        initPie(){
            var myChart = this.$echarts.init(document.getElementById('main'));
            var value = 0.50
            var data = []
            data.push(value)
            data.push(value)
            data.push(value)
            data.push(value)
            data.push(value)
            // var option = {
            //     backgroundColor: '#FFFFFF',
            //     title: {
            //         text: '停车位剩余',
            //         textStyle: {
            //             fontWeight: 'normal',
            //             fontSize: 25,
            //             color: 'rgb(97, 142, 205)'
            //         }
            //     },
            //     series: [{
            //         type: 'liquidFill',
            //         radius: '80%',
            //         data: data,
            //         backgroundStyle: {
            //             borderWidth: 5,
            //             borderColor: 'rgb(255,0,255,0.9)',
            //             color: 'rgb(255,0,255,0.01)'
            //         },
            //         label: {
            //             normal: {
            //                 formatter: value * 100 + '%',
            //                 textStyle: {
            //                     fontSize: 50
            //                 }
            //             }
            //         }
            //     }]
            // }
            var option = {
                title: {
                    text: '该停车场剩余车位百分比',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 25,
                        color: 'rgb(97, 142, 205)'
                    },
                },
                series: [{
                    type: 'liquidFill',
                    data: [0.6]
                }]
            };
            myChart.setOption(option);
        }
    }    
}
</script>
<style>

</style>


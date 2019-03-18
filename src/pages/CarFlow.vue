<template>
    <div>
        <div class="carFlowWord">显示所有停车项目的停车场流量</div>
        <CarFlowEchart/>
    </div>
</template>
<script>
import CarFlowEchart from '../components/echart/CarFlow.vue'
export default {
    components:{CarFlowEchart},

}
</script>
<style>
.carFlowWord{
    font-size: 3vw;
}
</style>

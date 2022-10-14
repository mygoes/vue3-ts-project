<template>
  <div class="my-chart-page-box">
    <div ref="chartDom" class="charts-box"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUpdated } from "vue";
import { useChartStore } from "@/stores/chart";
import * as echarts from "echarts";

const chartStore = useChartStore();

const eChartsData = computed(() => chartStore.getChartsData);

/* echart 图表 */
const chartDom = ref(); // 使用ref创建虚拟DOM引用，使用时用chartDom.value

function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(chartDom.value);

  myChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "整体数据",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: eChartsData.value,
      },
    ],
  });
}
// onMounted(() => {
//   init();
// });
onUpdated(() => {
  init();
});
</script>
<style lang="scss" scoped>
.my-chart-page-box {
  width: 100%;
  height: 100%;

  > .charts-box {
    height: 571px;
  }
}
</style>

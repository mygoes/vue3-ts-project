<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chart-container">
    <el-card>
      <ul class="circle-box">
        <li class="circle-item" v-for="(item, index) in circles" :key="index">
          <div
            class="circle"
            :style="{ color: item.color, borderColor: item.color }"
          >
            {{ chart_num_new(item.chart_num) }}
          </div>
          <span>{{ item.chart_title }}</span>
        </li>
      </ul>
    </el-card>
    <el-card class="card-main">
      <ChartCake :eChartsData="eChartsData"></ChartCake>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { charGet } from "@/api/chart";
import { useChartStore } from "@/stores/chart";
import ChartCake from "@/components/ECharts/DoughnutChartwithRoundedCorner.vue"; // ECharts 封装

const chartStore = useChartStore();

const chart_num_new = computed(() => (item: number) => {
  if (item >= 10000) {
    return `${Math.floor(item / 10000)}w+`;
  } else {
    return item;
  }
});

const chart_color = ref<string[]>([
  "#5470c6",
  "#91cc75",
  "#fac858",
  "#ee6666",
  "#73c0de",
]);

interface ICircles {
  chart_num: number;
  chart_title: string;
  color?: string;
}
const circles = ref<ICircles[]>([]); // 要循环渲染的数据

interface IEChartsData {
  value: number;
  name: string;
}
const eChartsData = ref<IEChartsData[]>([]); // ECharts 要用到的数据

const queryCharGet = () => {
  charGet().then((res) => {
    if (res.data.code === 200) {
      const eCharts_data = res.data.data.map((i: ICircles) => {
        return {
          value: i.chart_num,
          name: i.chart_title,
        };
      });
      chartStore.setChartsData(eCharts_data);
      localStorage.setItem(
        "chart",
        JSON.stringify({ chartsData: eCharts_data })
      ); // 本地存储：Pinia 持久化有时会失效

      eChartsData.value = eCharts_data;

      circles.value = res.data.data.map((i: ICircles, index: number) => {
        return {
          chart_title: i.chart_title,
          chart_num: i.chart_num,
          color: chart_color.value[index],
        };
      });
    }
  });
};
queryCharGet();
</script>

<style lang="scss" scoped>
.chart-container {
  .el-card__body {
    padding-top: 10px;
  }

  .circle-box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .circle {
      width: 99px;
      height: 99px;
      border: 2px solid black;
      border-radius: 50%;
      font-size: 35px;
      text-align: center;
      line-height: 99px;
    }

    .circle-item {
      span {
        font-size: 16px;
        margin-top: 10px;
        color: #737373;
        display: block;
        margin-top: 10px;
        text-align: center;
      }
    }
  }

  .card-main {
    margin-top: 19px;
    position: relative;
  }
}
</style>

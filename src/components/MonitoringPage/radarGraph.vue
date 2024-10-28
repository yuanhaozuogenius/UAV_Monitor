<template>
  <div ref="radarGraph" id="radargraph" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Register the required components
echarts.use([RadarChart, TitleComponent, LegendComponent, CanvasRenderer])

const radarGraph = ref(null); // Define the radar chart container reference
let myRadarChart = null;
let intervalId = null;

// Initial radar chart option for Euler angles (Roll, Pitch, Yaw)
const option = {
  title: {
    // text: 'Euler Angles (Roll, Pitch, Yaw)'
  },
  legend: {
    data: ['Current Orientation']
  },
  radar: {
    indicator: [
      { name: 'Roll', max: 180, min: -180 }, // Roll angle (−180° to 180°)
      { name: 'Pitch', max: 90, min: -90 },  // Pitch angle (−90° to 90°)
      { name: 'Yaw', max: 180, min: -180 }   // Yaw angle (−180° to 180°)
    ]
  },
  series: [
    {
      name: 'Orientation',
      type: 'radar',
      data: [
        {
          value: [0, 0, 0], // Initial values for Roll, Pitch, and Yaw
          name: 'Current Orientation'
        }
      ]
    }
  ]
};

onMounted(() => {
  // Initialize the radar chart
  myRadarChart = echarts.init(radarGraph.value);
  myRadarChart.setOption(option);

  // Dynamic data update for the Euler angles
  intervalId = setInterval(() => {
    const roll = (Math.random() * 360) - 180;  // Random Roll between -180° and 180°
    const pitch = (Math.random() * 180) - 90;  // Random Pitch between -90° and 90°
    const yaw = (Math.random() * 360) - 180;   // Random Yaw between -180° and 180°

    myRadarChart.setOption({
      series: [
        {
          data: [
            {
              value: [roll, pitch, yaw], // Update Roll, Pitch, and Yaw
              name: 'Current Orientation'
            }
          ]
        }
      ]
    });
  }, 1000); // Update every 1 second

  // Resize chart when window size changes
  window.addEventListener('resize', () => {
    if (myRadarChart) {
      myRadarChart.resize();
    }
  });
});

// Cleanup interval and event listeners when the component is unmounted
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  window.removeEventListener('resize', () => {
    if (myRadarChart) {
      myRadarChart.resize();
    }
  });
});
</script>

<style lang="scss" scoped>
#radargraph {
  //height: 400px;
  height: 100%;
  width: 100%;
}
</style>

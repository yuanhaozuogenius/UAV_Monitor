<script setup>
import { ref, onMounted } from 'vue'
import * as BABYLON from 'babylonjs'
// 导入gltf加载器
import 'babylonjs-loaders'
const canvas = ref(null)

onMounted(() => {
  // 创建引擎
  const engine = new BABYLON.Engine(canvas.value, true)
  // // 创建场景--（容器）
  const scene = new BABYLON.Scene(engine)
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
  // scene.clearColor = new BABYLON.Color4(0, 0, 1, 1)
  // 创建相机
  const camera = new BABYLON.ArcRotateCamera(
    'camera', // 相机名称
    0, // 相机的alpha值，水平旋转角度
    0, // 相机的beta值，垂直旋转角度
    10, // 相机的半径 --控制相机距离目标点的远近
    BABYLON.Vector3(0, 0, 0), // 相机的目标点 设置为原点 相机会围绕这个目标点旋转
    scene // 相机所在场景
  )

  // 把相机附加到画布上 通过鼠标输入来控制相机移动
  camera.attachControl(canvas)
  // 创建光源
  // eslint-disable-next-line no-unused-vars
  const light = new BABYLON.DirectionalLight(
    'light', // 光源的名称
    new BABYLON.Vector3(0, 0, 1), // 光源的方向
    scene // 光源所在场景
  )

  console.log('加载模型')
  BABYLON.SceneLoader.Append(
    'models/',
    // '汽轮机与操纵座总装图-12.24.STL',
    '汽轮机与操纵座总装图.STL',
    scene,
    () => {
      // 自动取景
      scene.createDefaultCamera(true, true, true)
    }
  )
  // 渲染场景
  engine.runRenderLoop(() => {
    scene.render()
  })
  console.log('模型加载完成')

  // 自动取景
  scene.createDefaultCamera(true, true, true)
  // 监听窗口大小的改变
  window.addEventListener('resize', () => {
    engine.resize()
  })
})

// 创建球

// eslint-disable-next-line no-unused-vars
// const sphere = BABYLON.MeshBuilder.CreateSphere(
//   'sphere', // 球的名称
//   { diameter: 2 }, // 球的直径
//   scene // 球所在场景
// )
// 加载模型
// BABYLON.SceneLoader.Append('models/', '装配体2 - 锥套-1.STL', scene)

// BABYLON.SceneLoader.Append('models/', '装配体2 - 零件1-1-1.STL', scene)
// BABYLON.SceneLoader.Append(
//   'models/',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 12mm钢管长100-1.STEP-1.STL',
//   scene
// )

// const stlFiles = [
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 12mm钢管长100-1.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 12mm钢管长100-1.STEP-2.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 18mm钢管长100mm-1.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 18mm钢管长100mm-1.STEP-2.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 18mm钢管长100mm-1.STEP-3.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 18mm钢管长100mm-1.STEP-4.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 18mm钢管长100mm-1.STEP-5.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-1 28mm管夹-1.STEP-1 管夹体-1_28mm.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-1 28mm管夹-1.STEP-1 管夹底板-1_28mm.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-1 28mm管夹-1.STEP-1 管夹盖板-1_28mm.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-1 空心方管40X40X3-1.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-2 28mm管夹-1.STEP-1 管夹体-1_28mm.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-2 28mm管夹-1.STEP-1 管夹底板-1_28mm.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-2 28mm管夹-1.STEP-1 管夹盖板-1_28mm.STEP-1.STL',
//   '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 28mm管夹组件-1.STEP-2 空心方管40X40X3-1.STEP-1.STL'
// ]
// stlFiles.forEach((filePath) => {
//   BABYLON.SceneLoader.Append('models/', filePath, '', scene)
// })
//   BABYLON.SceneLoader.Append(
//     'models/',
//     '汽轮机与操纵座总装图-12.24 - 汽轮机与操纵座总装图-12.24.STEP-1 D660BK-589000D-1.STEP-1 12mm钢管长100-1.STEP-1.STL',
//     scene
// )

// BABYLON.SceneLoader.Append('models/', '123.STL', scene)
// BABYLON.SceneLoader.Append(
//   'models/',
//   'new_model - _X2_6c7d8f6e673a4e0e960095e888c5914d56fe_X0_-1 _X2_960095e8_X0_-1-1.STL',
//   scene
// )
// BABYLON.SceneLoader.Append(
//   'models/',
//   'new_model - _X2_6c7d8f6e673a4e0e960095e888c5914d56fe_X0_-1 _X2_960095e8_X0_-1-2.STL',
//   scene
// )
// BABYLON.SceneLoader.Append(
//   'models/',
//   'new_model - _X2_6c7d8f6e673a4e0e960095e888c5914d56fe_X0_-1 _X2_960095e8_X0_-1-3.STL',
//   scene
// )
// BABYLON.SceneLoader.Append(
//   'models/',
//   'new_model - _X2_6c7d8f6e673a4e0e960095e888c5914d56fe_X0_-1 _X2_960095e8_X0_-1-4.STL',
//   scene
// )
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
/* div {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
} */

canvas {
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
}
</style>

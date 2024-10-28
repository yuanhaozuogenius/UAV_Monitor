# 临时存储函数


 上部分：设备状态等信息
                <div class="panel line">
                  <h2>系统状态</h2>
                  <div class="devicelist">
                    <ul class="clearfix">
                      <!-- ECharts 折线图容器 -->
                      <div ref="chartRef" style="width: 600px; height: 400px;"></div>
                    </ul>
                  </div>
                  <div class="panel-footer"></div>
                </div>
                <div class="panel">
                  <h2>设备健康度曲线</h2>
                  <div class="healthDegree">
                    <curveGraph></curveGraph>
                  </div>
                  <div class="panel-footer"></div>
                </div>
                <div class="panel pie line">
                  <h2>系统故障发生概率</h2>
                  <div class="probability">
                    <troubleGauge></troubleGauge>
                  </div>
                  <div class="panel-footer"></div>
                </div>


<!--         中部分：3D模型或其他展示 -->
                <div class="panel model">
                  <h2>3D模型展示</h2>
                  <!-- 中间展示内容，可以是3D模型或者图片 -->
                  <img src="/src/assets/wurenji.svg" alt="" class="modelPng"/>
                  <div class="panel-footer"></div>
                </div>



      <el-col :span="12">
              <div class="datashow-title">传感器数据曲线图</div>
              <div class="select">
                <el-row>
                  <el-col :span="12" :offset="6">
                    <el-date-picker
                      :popper-append-to-body="false"
                      popper-class="selectStyle"
                      style="
                        width: 100%;
                        box-sizing: border-box;
                        background-color: #2b3467;
                        border: 0.5px solid #d2e0fb;
                        box-shadow: none;
                      "
                      @change="handleRTTime"
                      v-model="timeselectCurve"
                      type="datetimerange"
                      :shortcuts="shortcuts"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :default-time="defaultTime"
                      value-format="YYYY-MM-DD HH:mm:ss"
                  /></el-col>
                  <el-col :offset="2" :span="2">
                    <el-select
                      multiple
                      @change="handleRTQuantity"
                      v-model="quantitySelect"
                      placeholder="请选择"
                      :popper-append-to-body="false"
                    >
                      <el-option
                        v-for="item in quantityList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      /> </el-select
                  ></el-col>
                </el-row>
              </div>
              <div class="timecurve" ref="timecurve" style="width: 100%"></div
            ></el-col>



// .itemBottom {
    //   position: relative;
    //   flex: 168;
    //   justify-content: center;
    //   /* background-color: #fff; */
    // }
    // .circle {
    //   position: absolute;
    //   top: calc(15 * var(--flexHeight));
    //   left: 12.4rem;
    //   width: 5.5rem;
    //   height: 5.5rem;
    //   border: #00dfda calc(3 * var(--flexHeight)) solid;
    //   border-radius: 50%;
    //   /* box-sizing: border-box; */
    // }
    // .circle::after {
    //   content: '';
    //   position: absolute;
    //   right: 0;
    //   left: 0;
    //   top: 0;
    //   bottom: 0;
    //   margin: auto;
    //   width: 2.8rem;
    //   height: calc(32 * var(--flexHeight));
    //   background: url('@/assets/imgs/monitoringPage/stateIcon.png') no-repeat 0
    //     0/100% 100%;
    // }
    // .circle::before {
    //   content: '';
    //   position: absolute;
    //   right: 0;
    //   left: 0;
    //   margin: auto;
    //   top: calc(100% + calc(3 * var(--flexHeight)));
    //   width: 0.3rem;
    //   height: calc(22 * var(--flexHeight));
    //   background-color: #00dfda;
    // }
    // .circle:nth-child(2) {
    //   top: calc(96 * var(--flexHeight));
    // }
    // .circle:nth-child(2):after {
    //   width: 3.5rem;
    //   height: calc(35 * var(--flexHeight));
    //   background-image: url('@/assets/imgs/monitoringPage/timeIcon.png');
    // }
    // .circle:nth-child(2)::before {
    //   display: none;
    // }
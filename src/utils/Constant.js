import {ref} from 'vue'

// Constant.js

// 生成时间 t 和相应的随机变量数据，时间按每秒变化
export const generateTimeSeriesData = (numPoints) => {
  const times = [];
  const variable1 = [];
  const variable2 = []; // 存储变量2的数据
  const variable3 = []; // 存储变量3的数据


  // 当前时间为基准
  let currentTime = new Date();

  for (let i = 0; i < numPoints; i++) {
    // 时间每秒递增
    const time = new Date(currentTime.getTime() + i * 1000);
    times.push(time.toISOString().slice(11, 19)); // 仅保留时分秒部分

    // 随机生成变量的数据
    variable1.push(Math.floor(Math.random() * 100));
    variable2.push(Math.floor(Math.random() * 100));
    variable3.push(Math.floor(Math.random() * 100));

  }

  return { times, variable1, variable2, variable3};
};


// 随机生成一个包含指定数量数据的对象，每个键的值是一个数组
export const generateRandomData = (numEntries) => {
  let obj = {};
  for (let i = 0; i < numEntries; i++) {
    // 生成随机值并将其添加到对象中
    // 保证每个键的值是数组
    obj[`key${i}`] = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
  }
  return obj;
}

// slice改为用safeSlice
// 1.属性不存在或未定义：
// 某些对象属性可能未在 obj 中定义，例如 obj['1GFR001MN_AVALUE'] 或 obj['1GRE117MM_AVALUE']。如果这些属性为 undefined，调用 slice 方法时就会抛出错误。
// 2.属性类型不正确：
// slice 方法只能应用于数组或字符串类型的对象。如果 obj['1GFR001MN_AVALUE'] 或类似属性的值是数字、null 或其他不支持 slice 方法的类型，也会导致错误。
export function safeSlice(value, start, end) {
  return value !== undefined && value.slice !== undefined ? value.slice(start, end) : [];
}
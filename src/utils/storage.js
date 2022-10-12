/*
    *本地存储方法封装
*/

// 获取本地存储数据
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 向本地存储存入数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 移除本地存储数据
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

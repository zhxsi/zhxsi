// 格式化时间（毫秒转秒）
export const formatTimeToSecond = (time) => {
  return time / 1000;
};
// 格式化时间（秒转分）
export const formatTimeToMinute = (time) => {
  const date = new Date(time);
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
};

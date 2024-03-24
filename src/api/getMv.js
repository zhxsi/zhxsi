import request from "@/utils/request";
// 全部 mv
export function getMv(data) {
  return request({
    url: "/mv/all",
    method: "post",
    params: data,
  });
}
// 获取 mv 数据
export function getMvDetail(data) {
  return request({
    url: "/mv/url",
    method: "post",
    params: data,
  });
}

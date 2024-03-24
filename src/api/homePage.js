import request from "@/utils/request";
// 首页-发现
export function homeDiscovery(data) {
  return request({
    url: "/homepage/block/page",
    method: "post",
    params: data,
  });
}
// 首页-发现-圆形图标入口列表
export function homeIconList(data) {
  return request({
    url: "/homepage/dragon/ball",
    method: "post",
    params: data,
  });
}
// banner
export function homeBanner(data) {
  return request({
    url: "/banner",
    method: "post",
    params: data,
  });
}

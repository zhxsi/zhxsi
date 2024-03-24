import request from "@/utils/request";
// 国家编码列表
export function getCountryCode(data) {
  return request({
    url: "/countries/code/list",
    method: "post",
    params: data,
  });
}

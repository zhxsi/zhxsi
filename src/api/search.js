import request from "@/utils/request";
// 搜索
export function search(data) {
  return request({
    url: "/cloudsearch",
    method: "post",
    params: data,
  });
}
// 搜索建议
export function searchsuggest(data) {
  return request({
    url: "/search/suggest",
    method: "post",
    params: data,
  });
}
// 搜索多重匹配
export function searchmultimatch(data) {
  return request({
    url: "/search/multimatch",
    method: "post",
    params: data,
  });
}

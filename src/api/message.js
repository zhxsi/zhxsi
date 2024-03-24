import request from "@/utils/request";
// 私信和通知接口
export function getMessage(data) {
  return request({
    url: "/pl/count",
    method: "post",
    params: data,
  });
}

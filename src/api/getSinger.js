import request from "@/utils/request";
export function getSingerA(data) {
  return request({
    url: "/top/artists",
    method: "post",
    params: data,
  });
}

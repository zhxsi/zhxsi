import request from "@/utils/request";
// 获取歌曲详情
export function getSongDetail(data) {
  return request({
    url: "/song/detail",
    method: "get",
    params: data,
  });
}
// 获取音乐 url
export function getSongUrl(data) {
  return request({
    url: "/song/url",
    method: "get",
    params: data,
  });
}
// 获取逐字歌词
export function getLyric(data) {
  return request({
    url: "/lyric/new",
    method: "get",
    params: data,
  });
}

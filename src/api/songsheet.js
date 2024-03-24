import request from "@/utils/request";
// 推荐歌单
export function personalized(data) {
  return request({
    url: "/personalized",
    method: "post",
    params: data,
  });
}

// 获取歌单详情
export function playlistDetail(data) {
  return request({
    url: "/playlist/detail",
    method: "GET",
    params: data,
  });
}
// 所有榜单
export function toplist() {
  return request({
    url: "/toplist",
    method: "GET",
  });
}

// 歌单分类
export function playlistCatlist() {
  return request({
    url: "/playlist/catlist",
    method: "POST",
  });
}
// 热门歌单分类
export function playlistHot() {
  return request({
    url: "/playlist/hot",
    method: "POST",
  });
}
// 歌单 ( 网友精选碟 )
export function topPlaylist(data) {
  return request({
    url: "/top/playlist",
    method: "POST",
    params: data,
  });
}

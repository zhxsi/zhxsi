import request from "@/utils/request";
// 游客登录
export function visitorLogin(data) {
  return request({
    url: "/register/anonimous",
    method: "post",
    params: data,
  });
}
// 邮箱登录
export function emailLogin(data) {
  return request({
    url: "/login",
    method: "post",
    params: data,
  });
}
// 手机登录
export function phoneLogin(data) {
  return request({
    url: "/login/cellphone",
    method: "post",
    params: data,
  });
}
// 发送验证码
export function sendCaptcha(data) {
  return request({
    url: "/captcha/sent",
    method: "post",
    params: data,
  });
}
// 刷新登录
export function refreshCookie(data) {
  return request({
    url: "/login/refresh",
    method: "post",
    params: data,
  });
}

// 退出登录
export function logout(data) {
  return request({
    url: "/logout",
    method: "post",
  });
}
// 退出登录
export function loginStatus(data) {
  return request({
    url: "/login/status",
    method: "post",
  });
}
// 二维码 key 生成接口
export function qrCodekey(data) {
  return request({
    url: "/login/qr/key",
    method: "post",
  });
}
// 二维码生成接口
export function qrcodeGeneration(data) {
  return request({
    url: "/login/qr/create",
    method: "post",
    data,
  });
}
// 二维码检测扫码状态接口
export function qrCodeCheck(data) {
  return request({
    url: "/login/qr/check",
    method: "post",
    params: data,
  });
}

export const urlConfig = {
  // baseUrl: "http://127.0.0.1:8088/api", // 本地环境-前端解决跨域
  // baseUrl: "http://127.0.0.1:8088", // 本地环境-后端解决跨域
  baseUrl: "http://43.138.252.217:8088", // 线上环境
  baseUrlUpload: "http://43.138.252.217:8066", // 已上传文件的线上环境（如：图片）

  uploadUrlAvatar: "/user/editAvatar", // 头像上传接口
  uploadUrlBgImg: "/user/editBgImg", // 背景图片上传接口
};

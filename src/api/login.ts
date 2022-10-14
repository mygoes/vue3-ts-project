import request from "@/utils/request";

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 用户注册
 * @param {string} username 用户名称
 * @param {string} paone 电话
 * @param {string} email 邮箱
 * @param {string} password 密码
 */
export const loginSignUp = (data?: object) => {
  return request({
    url: "/login/signUp",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 用户登录
 * @param {string} username 用户名称
 * @param {string} password 密码
 */
export const loginSignIn = (data?: object) => {
  return request({
    url: "/login/signIn",
    method: "post",
    data,
  });
};

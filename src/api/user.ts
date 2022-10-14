import request from "@/utils/request";

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 列表查询
 */
export const userGetList = (params?: object) => {
  return request({
    url: "/user/getList",
    method: "get",
    params,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 筛选查询
 * @param {string} username 用户名称
 * @param {string} phone 电话
 * @param {number} currentPage 当前页
 * @param {number} pageSize 页容量
 */
export const userGetOne = (params?: object) => {
  return request({
    url: "/user/getOne",
    method: "get",
    params,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 新增用户
 * @param {string} username 用户名称
 * @param {string} phone 电话
 * @param {string} email 邮箱
 * @param {string} role 权限
 * @param {string} note 备注
 * @param {string} state 状态
 */
export const userAddOne = (data?: object) => {
  return request({
    url: "/user/addOne",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 删除用户
 * @param {string} id
 */
export const userDelOne = (data?: object) => {
  return request({
    url: "/user/delOne",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 修改用户信息
 * @param {string} username 用户名称
 * @param {string} phone 电话
 * @param {string} email 邮箱
 * @param {string} role 权限
 * @param {string} note 备注
 * @param {string} state 状态
 */
export const userEditOne = (data?: object) => {
  return request({
    url: "/user/editOne",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 修改状态
 * @param {string} id
 */
export const userEditState = (data?: object) => {
  return request({
    url: "/user/editState",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 查询个人用户
 * @param {string} id
 */
export const userGetUserInfo = (params?: object) => {
  return request({
    url: "/user/getUserInfo",
    method: "get",
    params,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 修改头像
 * @param {string} id
 * @param {any} file
 */
export const userEditAvatar = (data?: object) => {
  return request({
    url: "/user/editAvatar",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 修改背景图
 * @param {string} id
 * @param {any} file
 */
export const userEditBgImg = (data?: object) => {
  return request({
    url: "/user/editBgImg",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 验证密码是否正确
 * @param {munber} id
 * @param {munber} password 密码
 */
export const userValidatePsw = (data?: object) => {
  return request({
    url: "/user/validatePsw",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 验证密保问题是否正确
 * @param {string} id
 * @param {string} encryptedOneAnswer 密保问题 1 的答案
 * @param {string} encryptedTwoAnswer 密保问题 2 的答案
 */
export const userValidateEncrypted = (data?: object) => {
  return request({
    url: "/user/validateEncrypted",
    method: "post",
    data,
  });
};

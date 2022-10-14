import request from "@/utils/request";

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 新增留言
 * @param {string} user_id 用户 id
 * @param {string} content 内容
 */
export const messageAddOne = (data?: object) => {
  return request({
    url: "/message/addOne",
    method: "post",
    data,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 获取留言列表
 * @param {string} currentPage 当前页
 * @param {string} pageSize 页大小
 */
export const messageGetList = (params?: object) => {
  return request({
    url: "/message/getList",
    method: "get",
    params,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 获取留言的回复
 * @param {string} currentPage 当前页
 * @param {string} pageSize 页大小
 * @param {string} message_id 留言的 id
 */
export const messageGetReply = (params?: object) => {
  return request({
    url: "/message/getReply",
    method: "get",
    params,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 获取违禁词
 */
export const messageGetBannedWords = (params?: object) => {
  return request({
    url: "/message/getBannedWords",
    method: "get",
    params,
  });
};

/**
 * @author mygoes mynameiszhayu@163.com
 * @description: 新增留言的回复
 * @param {string} message_id 外键（对应留言表主键 id）
 * @param {string} content 回复内容
 * @param {string} user_id 回复人 user_id
 * @param {string} target_id 回复目标 user_id
 * @param {string} reply_type 回复的类型（1-针对评论 message 的回复；2-针对回复 reply 的回复）
 * @param {string} father_id 父元素的 id（若 reply_type 为 message，father_id 为 message_id；若 reply_type 为 reply，father_id 为这条回复的父回复的 id）
 */
export const messageAddReply = (data?: object) => {
  return request({
    url: "/message/addReply",
    method: "post",
    data,
  });
};

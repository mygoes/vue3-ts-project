import request from "@/utils/request";

export const charGet = (params?: object) => {
  return request({
    url: "/chart/get",
    method: "get",
    params,
  });
};

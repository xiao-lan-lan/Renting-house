import http from "../../utils/http";

// 登录
export const login = (body) => {
  return http({
    method: "post",
    url: "/user/login",
    data:body
  });
};

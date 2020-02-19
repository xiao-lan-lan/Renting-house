import http from "../../utils/http";

// 个人资料
export const user = () => {
  return http({
    method: "get",
    url: "/user",
    headers:{
      authorization :window.localStorage.getItem('token')
    }
  });
};
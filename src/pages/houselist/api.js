import http from "../../utils/http";

// 房屋列表
export const getHouses = (cityId) => {
  return http({
    method: "get",
    url: "/houses?cityId="+cityId
  });
};
import http from "../../../../utils/http";

// 房屋筛选条件
export const getHousesCondition = (value) => {
  return http({
    method: "get",
    url: "/houses/condition?id="+value
  });
};


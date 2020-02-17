import http from "../../utils/http";

// 所有城市
export const getCityList = () => {
  return http({
    method: "get",
    url: "/area/city?level=1"
  });
};

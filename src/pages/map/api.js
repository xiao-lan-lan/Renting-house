import http from "../../utils/http";

// 地图找房
export const getMapHouse = (id) => {
  return http({
    method: "get",
    url: "/area/map?id="+id
  });
};
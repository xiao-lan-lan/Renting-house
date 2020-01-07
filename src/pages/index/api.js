import http from "../../utils/http";

export const getSwiper = () => {
  return http({
    method: "get",
    url: "/home/swiper"
  });
};

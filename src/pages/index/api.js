import http from "../../utils/http";

// 轮播图
export const getSwiper = () => {
  return http({
    method: "get",
    url: "/home/swiper"
  });
};

// 宫格
export const getGrid = () => {
  return http({
    method: "get",
    url: "/home/groups?area=AREA%7C88cff55c-aaa4-e2e0"
  });
};

// 新闻
export const getNews = () => {
  return http({
    method: "get",
    url: "/home/news?area=AREA%7C88cff55c-aaa4-e2e0"
  });
};

// 城市id
export const getCityInfo = (cityname) => {
  return http({
    method: "get",
    url: "/area/info?name="+cityname
  });
};

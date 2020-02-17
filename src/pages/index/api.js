import http from "../../utils/http";

// 轮播图
export const getSwiper = () => {
  return http({
    method: "get",
    url: "/home/swiper"
  });
};

// 宫格
export const getGrid = (cityvalue) => {
  return http({
    method: "get",
    url: "/home/groups?area="+cityvalue
  });
};

// 新闻
export const getNews = (cityvalue) => {
  return http({
    method: "get",
    url: "/home/news?area="+cityvalue
  });
};

// 城市id
export const getCityInfo = (cityname) => {
  return http({
    method: "get",
    url: "/area/info?name="+cityname
  });
};

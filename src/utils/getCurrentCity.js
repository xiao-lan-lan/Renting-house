import { getCityInfo } from "../pages/index/api";

export function getCurrentCity(cb) {
  const currcity = JSON.parse(window.localStorage.getItem("hkzf_current_city"));
  if (!currcity) {
    const { BMap } = window;
    const myCity = new BMap.LocalCity();
    myCity.get(async result => {
      const cityName = result.name;
      const { data } = await getCityInfo(cityName);
      cb(currcity);
      window.localStorage.setItem(
        "hkzf_current_city",
        JSON.stringify(data.body)
      );
    });
  } else {
    cb(currcity);
  }
}

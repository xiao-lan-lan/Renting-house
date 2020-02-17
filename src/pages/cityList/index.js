import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { getCityList, getHotList } from "./api";
import { getCurrentCity } from "../../utils/getCurrentCity";

class CityList extends React.Component {
  // 获取城市列表
  getCityList = async () => {
    // 获取所有城市
    const { data } = await getCityList();
    const { cityList, cityIndex } = this.formatCity(data.body);

    // 获取热门城市
    const { data: dataHot } = await getHotList();
    cityList["hot"] = dataHot.body;
    cityIndex.unshift("Hot");

    // 获取定位城市
    getCurrentCity((currcity) => {
      cityList['#']=[currcity];
      cityIndex.unshift("#");
    })
    
    console.log(cityList, cityIndex);
  };

  // 二次处理所有城市接口返回数据格式
  formatCity = citydata => {
    let cityList = {};
    let cityIndex = [];

    citydata.forEach(city => {
      const letter = city.short.slice(0, 1);
      if (!Object.keys(cityList).includes(letter)) {
        cityList[letter] = [city];
      } else {
        cityList[letter].push(city);
      }
    });

    cityIndex = Object.keys(cityList).sort();

    return {
      cityList,
      cityIndex
    };
  };

  componentDidMount() {
    this.getCityList();
  }

  render() {
    return (
      <div className="map">
        {/* 顶部返回导航 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>
      </div>
    );
  }
}

export default CityList;

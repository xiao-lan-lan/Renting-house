import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { getCityList } from "./api";

class CityList extends React.Component {
  // 获取所有城市
  getCityList = async () => {
    const { data } = await getCityList();
    console.log(data);
    if (data.status === 200) {
      const {cityList,cityIndex} = this.formatCity(data.body);
      console.log(cityList,cityIndex);
    }
  };

  // 二次处理所有城市接口返回数据格式
  formatCity = citydata => {
    let cityList = {};
    let cityIndex = [];

    citydata.forEach(city => {
      const letter = city.short.slice(0,1)
      if (!Object.keys(cityList).includes(letter)) {
        cityList[letter]=[city]
      }else {
        cityList[letter].push(city)
      }
    })

    cityIndex = Object.keys(cityList).sort()

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

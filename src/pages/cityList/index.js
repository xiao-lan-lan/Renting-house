import React from "react";
import { NavBar, Icon,Toast } from "antd-mobile";
import { getCityList, getHotList } from "./api";
import { getCurrentCity } from "../../utils/getCurrentCity";
import "./index.scss";
// virtualized 列表组件
import { List, AutoSizer } from "react-virtualized";

class CityList extends React.Component {
  state = {
    cityList: {}, //字母对应城市
    cityIndex: [] //字母数组
  };

  // 获取城市列表
  getCityList = async () => {
    // 获取所有城市
    const { data } = await getCityList();
    const { cityList, cityIndex } = this.formatCity(data.body);

    // 获取热门城市
    const { data: dataHot } = await getHotList();
    cityList["hot"] = dataHot.body;
    cityIndex.unshift("hot");

    // 获取定位城市
    getCurrentCity(currcity => {
      cityList["#"] = [currcity];
      cityIndex.unshift("#");
    });

    this.setState({
      cityList,
      cityIndex
    });
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

  // 渲染列表行
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style // Style object to be applied to row (to position it)
  }) => {
    const letter = this.state.cityIndex[index];

    return (
      <div key={key} style={style} className="city">
        <div className="title">{letter.toUpperCase()}</div>
        {this.state.cityList[letter].map(city => {
          return (
            <div
              className="name"
              key={city.value}
              onClick={() => {
                if (["北京", "上海", "广州", "深圳"].includes(city.label)) {
                  window.localStorage.setItem(
                    "hkzf_current_city",
                    JSON.stringify(city)
                  );
                  this.props.history.goBack();
                }else {
                  Toast.info('该城市暂无房源 !!!', 2);
                }
              }}
            >
              {city.label}
            </div>
          );
        })}
      </div>
    );
  };

  // 计算行高:高=字母高度+每个城市高度*城市个数
  rowHeight = ({ index }) => {
    const letter = this.state.cityIndex[index];
    const H = 36 + 50 * this.state.cityList[letter].length;
    return H;
  };

  componentDidMount() {
    this.getCityList();
  }

  render() {
    return (
      <div className="citylist">
        {/* 顶部返回导航 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>

        {/* 城市列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.rowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default CityList;

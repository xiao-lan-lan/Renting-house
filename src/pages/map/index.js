import React from "react";
import { NavBar, Icon } from "antd-mobile";
import "./index.scss";
import { getCurrentCity } from "../../utils/getCurrentCity";

class Map extends React.Component {
  // 初始化地图
  initMap() {
    const { BMap } = window;
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);

    // 添加地图控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    // 获取当前城市
    let city
    getCurrentCity((currcity)=>{
      city = currcity
    })
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      city,
      function(point) {
        if (point) {
          map.centerAndZoom(point, 16);
          // 覆盖物
          map.addOverlay(new BMap.Marker(point));
        }
      },
      city
    );
  }
  componentDidMount() {
    this.initMap();
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
          地图找房
        </NavBar>
        {/* 地图容器 */}
        <div id="container"></div>
      </div>
    );
  }
}

export default Map;

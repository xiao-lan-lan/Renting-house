import React from "react";
import { NavBar, Icon } from "antd-mobile";
import "./index.scss";

class Map extends React.Component {
  initMap() {
    const { BMap } = window;
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
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

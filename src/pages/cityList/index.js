import React from 'react';
import { NavBar, Icon } from "antd-mobile";

class CityList extends React.Component {
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

export default CityList
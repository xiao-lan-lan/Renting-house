import React from "react";
import { NavBar, Icon } from "antd-mobile";
import "./index.scss";
import { getCurrentCity } from "../../utils/getCurrentCity";
import { getMapHouse } from "./api";

class Map extends React.Component {
  // 初始化地图
  initMap() {
    const { BMap } = window;
    var map = new BMap.Map("container");

    // 添加地图控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder();
    // 获取当前城市
    let city;
    getCurrentCity(currcity => {
      city = currcity;
    });

    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      "天安门",
      async function(point) {
        if (point) {
          map.centerAndZoom(point, 11);

          // 请求行政区房源信息,编辑创建多个覆盖物
          const { data } = await getMapHouse(city.value);
          if (data.status === 200) {
            data.body.forEach(item => {
              // 添加覆盖物
              const housePoint = new BMap.Point(
                item.coord.longitude,
                item.coord.latitude
              );//行政区经纬度
              const opts = {
                position: housePoint, // 指定文本标注所在的地理位置
                offset: new BMap.Size(0, 0) //设置文本偏移量
              };
              const label = new BMap.Label("", opts); // 创建文本标注对象
              // 覆盖物内容设置标签
              label.setContent(
                `<div class=bubble><p class=name>${item.label}</p><p>${item.count}套</p></div>`
              );
              label.setStyle({
                color: "red",
                fontSize: "12px",
                height: "20px",
                lineHeight: "20px",
                fontFamily: "微软雅黑",
                background: "transparent",
                border: "none"
              });
              // 点击事件,放大,清除,重绘
              label.addEventListener("click",function() {
                map.centerAndZoom(housePoint, 13);
                setTimeout(()=>{
                  map.clearOverlays()
                },0)  
              })
              map.addOverlay(label);
            });
          }
        }
      },
      city.label
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

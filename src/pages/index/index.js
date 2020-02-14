import React from "react";
// 请求
import { getSwiper, getGrid } from "./api.js";
import "./index.scss";
// 导航图片
import navimg1 from "../../assets/images/nav-1.png";
import navimg2 from "../../assets/images/nav-2.png";
import navimg3 from "../../assets/images/nav-3.png";
import navimg4 from "../../assets/images/nav-4.png";
// antd组件
import { Carousel, Flex, Grid } from "antd-mobile";

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: navimg1,
    name: "整租",
    path: "/home/a"
  },
  {
    id: 2,
    img: navimg2,
    name: "合租",
    path: "/home/b"
  },
  {
    id: 3,
    img: navimg3,
    name: "地图找房",
    path: "/home/c"
  },
  {
    id: 4,
    img: navimg4,
    name: "去出租",
    path: "/home/d"
  }
];

// 宫格数据
// const data = Array.from(new Array(4)).map((_val, i) => ({
//   icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
//   text: `name${i}`
// }));

class Index extends React.Component {
  state = {
    swiperList: [],//轮播图
    imgHeight: 176,
    isloading: false,
    gridList:[]//宫格
  };

  // 请求轮播图
  loadSwiper = async () => {
    const { data: res } = await getSwiper();
    // 失败
    if (res.status !== 200) {
      console.log("获取轮播图失败");
    }
    // 成功，修改数据
    this.setState({
      swiperList: res.body
    });
  };

  // 请求宫格数据
  loadGrid = async () => {
    const {data} = await getGrid();
    if (data.status===200) {
      this.setState({
        gridList:data.body
      })
    }
  };

  componentDidMount() {
    this.loadSwiper();
    this.loadGrid()
  }

  render() {
    return (
      <div className="home-index">
        {/* 轮播图 */}
        <Carousel autoplay={this.state.isloading} infinite>
          {this.state.swiperList.map(swiper => (
            <a
              key={swiper.id}
              href="http://www.baidu.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={`http://localhost:8080${swiper.imgSrc}`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto", isloading: true });
                }}
              />
            </a>
          ))}
        </Carousel>

        {/* 顶部搜索 */}
        {/* 四个导航 */}
        <Flex className="navs">
          {navs.map(item => {
            return (
              <Flex.Item
                className="nav-item"
                key={item.id}
                onClick={() => {
                  this.props.history.push(item.path);
                }}
              >
                <img src={item.img} alt="" />
                <p>{item.name}</p>
              </Flex.Item>
            );
          })}
        </Flex>
        {/* 四个宫格 */}
        <Flex className="group" justify="between">
          <h3>{"租房小组"}</h3>
          <span>{"更多"}</span>
        </Flex>
        <Grid
          className="grid"
          data={this.state.gridList}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={dataItem => (
            <div className="grid-item">
              <div>
                <h5>{dataItem.title}</h5>
                <span>{dataItem.desc}</span>
              </div>
              <img
                src={"http://localhost:8080"+dataItem.imgSrc}
                alt=""
              />
            </div>
          )}
        />
        {/* 列表资讯 */}
      </div>
    );
  }
}

export default Index;

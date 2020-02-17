import React from "react";
// 请求
import { getSwiper, getGrid, getNews } from "./api.js";
import "./index.scss";
// 导航图片
import navimg1 from "../../assets/images/nav-1.png";
import navimg2 from "../../assets/images/nav-2.png";
import navimg3 from "../../assets/images/nav-3.png";
import navimg4 from "../../assets/images/nav-4.png";
// antd组件
import { Carousel, Flex, Grid, NavBar, Icon } from "antd-mobile";

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
    path: "/map"
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
    swiperList: [], //轮播图
    imgHeight: 176,
    isloading: false,
    gridList: [], //宫格
    newsList: [] ,//资讯
    currentCity:''//定位当前城市
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
    const { data } = await getGrid();
    if (data.status === 200) {
      this.setState({
        gridList: data.body
      });
    }
  };

  // 请求新闻资讯
  loadNews = async () => {
    const { data } = await getNews();
    if (data.status === 200) {
      this.setState({
        newsList: data.body
      });
    }
  };

  // 定位当前城市
  getCurrentCity = () => {
    const {BMap} = window;
    // 1.实例化定位当前城市方法
    const myCity = new BMap.LocalCity();
    const that = this;
    // 3.定位myFun函数
    function myFun(result) {
      // 4.拿到城市名字
      const cityName = result.name;
      // 5.修改状态数据，注意this指向
      that.setState(() => {
        return {
          currentCity:cityName
        }
      })
    }
    // 2.调用get方法传入myFun函数，get方法会给myFun传入一个定位数据的实参对象
    myCity.get(myFun);

    // 原生获取定位经纬度
    // if (navigator.geolocation) {
    //   //判断是否支持Geolocation API
    //   navigator.geolocation.getCurrentPosition(showPosition);
    // }
    // function showPosition(position) {
    //   console.log(position);
    //   var lat = position.coords.latitude; //获取纬度
    //   var lon = position.coords.longitude; //获取经度
    //   alert("您的纬度是:" + lat + "，经度是：" + lon);
    // }
  };

  componentDidMount() {
    this.loadSwiper();
    this.loadGrid();
    this.loadNews();
    this.getCurrentCity();
  }

  render() {
    return (
      <div className="home-index">
        {/* 顶部搜索 */}
        <div>
          <NavBar
            className="navbar"
            mode="light"
            leftContent={this.state.currentCity}
            icon={<Icon type="down" />}
            onLeftClick={() => console.log("onLeftClick")}
            rightContent={[
              <Icon
                key="1"
                type="ellipsis"
                onClick={() => {
                  this.props.history.push("/map");
                }}
              />
            ]}
          >
            <Icon type="search" className="navbar-search" />
            <div className="navbar-search">{"请输入小区或地址"}</div>
          </NavBar>
        </div>

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
              <img src={"http://localhost:8080" + dataItem.imgSrc} alt="" />
            </div>
          )}
        />

        {/* 列表资讯 */}
        <Flex className="group" justify="between">
          <h3>{"最新资讯"}</h3>
        </Flex>
        <div className="news">
          {this.state.newsList.map(news => {
            return (
              <div className="news-item" key={news.id}>
                <img src={"http://localhost:8080" + news.imgSrc} alt="" />
                <div>
                  <p>{news.title}</p>
                  <div>
                    <span>{news.from}</span>
                    <span>{news.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Index;

import React from "react";
import axios from "axios";

// 轮播图
import { Carousel } from "antd-mobile";

class Index extends React.Component {
  state = {
    swiperList: [],
    imgHeight: 176
  };

  // 请求轮播图
  loadSwiper = async () => {
    const {data:res} = await axios({
      method: "get",
      url: "http://localhost:8080/home/swiper"
    });
    // 失败
    if (res.status!==200) {
      console.log('获取轮播图失败');
    }
    // 成功，修改数据
    this.setState({
      swiperList:res.body
    })
    
  };

  componentDidMount() {
    this.loadSwiper()
  }

  render() {
    return (
      <div className="home-index">
        {/* 轮播图 */}
        <Carousel autoplay={true} infinite>
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
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>

        {/* 顶部搜索 */}
        {/* 四个导航 */}
        {/* 四个宫格 */}
        {/* 列表资讯 */}
      </div>
    );
  }
}

export default Index;

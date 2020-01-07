import React from "react";

// 轮播图
import { Carousel } from "antd-mobile";

class Index extends React.Component {
  state = {
    data: ["1", "2", "3"],
    imgHeight: 176
  };

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          "AiyWuByWklrrUDlFignR",
          "TekJlZRVCjLFexlOCuWn",
          "IJOtIlfsYdTyaDTRVrLI"
        ]
      });
    }, 100);
  }

  render() {
    return (
      <div className="home-index">
        {/* 轮播图 */}
          <Carousel
            autoplay={true}
            infinite
          >
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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

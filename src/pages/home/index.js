/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// 引入路由组件
import { Route } from "react-router-dom";

// 引入二级路由组件
import Index from "../index";
import Houselist from "../houselist";
import Message from "../message";
import Profile from "../profile";

// 引入tabbar
import { TabBar } from "antd-mobile";

// 引入字体图标
import "../../assets/fonts/iconfont.css";

class Home extends React.Component {
  // 状态数据
  state = {
    selectedTab: this.props.location.pathname,
    hidden: false
  };

  render() {
    return (
      <div className="home">
        {/* link导航不需要,用 tabbar 代替 */}
        {/* <div>
          <Link to="/home/index">home</Link>
          <Link to="/home/houselist">houselist</Link>
          <Link to="/home/message">message</Link>
          <Link to="/home/profile">profile</Link>
        </div> */}

        <div className="route">
          <Route path="/home" exact component={Index} />
          <Route path="/home/houselist" component={Houselist} />
          <Route path="/home/message" component={Message} />
          <Route path="/home/profile" component={Profile} />
        </div>

        {/* tabbar */}
        <div
          style={{ position: "fixed",  width: "100%", bottom: 0 }}
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#0eb36f"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="Life"
              icon={<i className="iconfont icon-ind"></i>}
              selectedIcon={<i className="iconfont icon-ind"></i>}
              selected={this.state.selectedTab === "/home"}
              onPress={() => {
                // 路由跳转
                this.props.history.push('/home')
                // 选中tabbae
                this.setState({
                  selectedTab: "/home"
                });
              }}
              data-seed="logId"
            ></TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-findHouse" />}
              selectedIcon={<i className="iconfont icon-findHouse" />}
              title="找房"
              key="Koubei"
              selected={this.state.selectedTab === "/home/houselist"}
              onPress={() => {
                this.props.history.push('/home/houselist')
                this.setState({
                  selectedTab: "/home/houselist"
                });
              }}
              data-seed="logId1"
            ></TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-mess" />}
              selectedIcon={<i className="iconfont icon-mess" />}
              title="资讯"
              key="Friend"
              selected={this.state.selectedTab === "/home/message"}
              onPress={() => {
                this.props.history.push('/home/message')
                this.setState({
                  selectedTab: "/home/message"
                });
              }}
            ></TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-my" />}
              selectedIcon={<i className="iconfont icon-my" />}
              title="我的"
              key="my"
              selected={this.state.selectedTab === "/home/profile"}
              onPress={() => {
                this.props.history.push('/home/profile')
                this.setState({
                  selectedTab: "/home/profile"
                });
              }}
            ></TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}

export default Home;

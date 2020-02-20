import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Grid, Button, Modal } from "antd-mobile";

import styles from "./index.module.css";

import { user } from "./api";

// 菜单数据
const menus = [
  { id: 1, name: "我的收藏", iconfont: "icon-coll", to: "/favorate" },
  { id: 2, name: "我的出租", iconfont: "icon-ind", to: "/rent" },
  { id: 3, name: "看房记录", iconfont: "icon-record" },
  {
    id: 4,
    name: "成为房主",
    iconfont: "icon-identity"
  },
  { id: 5, name: "个人资料", iconfont: "icon-myinfo" },
  { id: 6, name: "联系我们", iconfont: "icon-cust" }
];

// 默认头像
const DEFAULT_AVATAR = "http://localhost:8080/img/profile/avatar.png";

export default class Profile extends Component {
  state = {
    isToken: window.localStorage.getItem("token"),
    userinfo: {
      nickname: "",
      avatar: ""
    }
  };

  // 是否有token,决定显示哪个组件
  isLogin = () => {
    if (this.state.isToken) {
      /* 登录后展示： */
      return (
        <>
          <div className={styles.auth}>
            <span onClick={this.logout}>退出</span>
          </div>
          <div className={styles.edit}>
            编辑个人资料
            <span className={styles.arrow}>
              <i className="iconfont icon-arrow" />
            </span>
          </div>
        </>
      );
    } else {
      // 未登录显示
      return (
        <div className={styles.edit}>
          <Button
            type="primary"
            size="small"
            inline
            onClick={() => this.props.history.push("/login")}
          >
            去登录
          </Button>
        </div>
      );
    }
  };

  // 个人资料
  getUser = async () => {
    const { data } = await user();
    this.setState({
      userinfo: { ...this.state.userinfo, ...data.body }
    });
  };

  // 退出登录
  logout = () => {
    const alert = Modal.alert;
    const alertInstance = alert("提示", "确定要退出么?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "default"
      },
      {
        text: "OK",
        onPress: () => {
          this.setState({
            isToken: "",
            userinfo: {
              nickname: "",
              avatar: ""
            }
          });
          window.localStorage.setItem("token", "");
        }
      }
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log("auto close");
      alertInstance.close();
    }, 500000);
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={"http://localhost:8080/img/profile/bg.png"}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={
                  this.state.userinfo.avatar
                    ? "http://localhost:8080" + this.state.userinfo.avatar
                    : DEFAULT_AVATAR
                }
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{this.state.userinfo.nickname}</div>
              {this.isLogin()}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={"http://localhost:8080/img/profile/join.png"} alt="" />
        </div>
      </div>
    );
  }
}

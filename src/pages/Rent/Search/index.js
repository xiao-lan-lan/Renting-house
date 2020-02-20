import React, { Component } from "react";

import { SearchBar } from "antd-mobile";

import { getCurrentCity } from "../../../utils/getCurrentCity";

import styles from "./index.module.css";

import http from "../../../utils/http";

export default class Search extends Component {
  state = {
    // 搜索框的值
    searchTxt: "",
    tipsList: [],
    cityId: getCurrentCity(city => {
      return city.value;
    })
  };

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state;

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ));
  };

  handleValue = async v => {
    if (v.trim().length === 0) {
      return this.setState({
        tipsList: [],
        searchTxt: ""
      });
    }
    this.setState({
      searchTxt: v
    });

    const res = await http.get("/area/community", {
      params: {
        name: v,
        id: this.state.cityId
      }
    });
    this.setState({
      tipsList: res.data.body
    });
  };

  render() {
    const { history } = this.props;
    const { searchTxt } = this.state;

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          showCancelButton={true}
          onCancel={() => history.replace("/rent/add")}
          onChange={this.handleValue}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    );
  }
}

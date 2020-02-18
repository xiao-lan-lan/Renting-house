import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import styles from "./index.module.css";

// 条件筛选栏标题数组：
const titleSelectedState = {
  area: false,
  mode: true,
  price: true,
  more: false
};
export default class Filter extends Component {
  state = {
    titleSelectedState
  };

  // 子传父，点击高亮
  onTitleClick = type => {
    this.setState(() => {
      return {
        titleSelectedState: { ...titleSelectedState, [type]: true }
      };
    });
  };

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedState={this.state.titleSelectedState}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    );
  }
}

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
    titleSelectedState, //选中的筛选栏
    opentype: "" //打开弹层
  };

  // 子传父，点击高亮
  onTitleClick = type => {
    this.setState(() => {
      return {
        titleSelectedState: {
          ...titleSelectedState,
          [type]: true
        },
        opentype: type
      };
    });
  };

  // 点击取消按钮和蒙层，关闭弹层
  onCancle = () => {
    this.setState(() => {
      return {
        opentype: ""
      };
    });
  };

  // 点击确定，关闭弹层
  onSave = () => {
    this.setState(() => {
      return {
        opentype: ""
      };
    });
  };

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(this.state.opentype === "area" ||
          this.state.opentype === "mode" ||
          this.state.opentype === "price") && (
          <div className={styles.mask} onClick={this.onCancle} />
        )}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedState={this.state.titleSelectedState}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {(this.state.opentype === "area" ||
            this.state.opentype === "mode" ||
            this.state.opentype === "price") && (
            <FilterPicker onCancle={this.onCancle} onSave={this.onSave} />
          )}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    );
  }
}

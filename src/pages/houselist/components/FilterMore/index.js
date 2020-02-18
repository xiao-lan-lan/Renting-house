import React, { Component } from "react";

import FilterFooter from "../../../../components/FilterFooter";

import styles from "./index.module.css";

export default class FilterMore extends Component {
  // 渲染标签
  renderFilters(filterType) {
    // 高亮类名： styles.tagActive
    return filterType.map(item => {
      return (
        <span className={[styles.tag].join(" ")} key={item.value}>
          {item.label}
        </span>
      );
    });
  }

  render() {
    const { onCancle, HousePickerData } = this.props;
    const { roomType, oriented, floor, characteristic } = HousePickerData;
    const data = { roomType, oriented, floor, characteristic };

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div
          className={styles.mask}
          onClick={() => {
            onCancle();
          }}
        />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(data.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(data.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(data.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>
              {this.renderFilters(data.characteristic)}
            </dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          onCancle={this.props.onCancle}
          onSave={this.props.onSave}
        />
      </div>
    );
  }
}

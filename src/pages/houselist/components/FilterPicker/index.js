import React, { Component } from "react";

import { PickerView } from "antd-mobile";

import FilterFooter from "../../../../components/FilterFooter";

export default class FilterPicker extends Component {
  // 渲染筛选弹出层
  renderFilterPicker = () => {
    const { HousePickerData, opentype } = this.props;
    console.log(HousePickerData, opentype);

    let data;
    let cols = 1;
    switch (opentype) {
      case "area":
        data = [HousePickerData.area, HousePickerData.subway];
        cols = 3;
        break;
      case "mode":
        data = HousePickerData.rentType;
        break;
      case "price":
        data = HousePickerData.price;
        break;
      default:
        break;
    }
    return <PickerView data={data} value={null} cols={cols} />;
  };
  render() {
    return (
      <>
        {/* 选择器组件： */}
        {this.renderFilterPicker()}

        {/* 底部按钮 */}
        <FilterFooter
          onCancle={this.props.onCancle}
          onSave={this.props.onSave}
        />
      </>
    );
  }
}

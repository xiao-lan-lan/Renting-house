import React from "react";

import { Flex } from "antd-mobile";

import Filter from "./components/Filter";

import { getHouses } from "./api";

import HouseItem from './HouseItem';

// 导入样式
import styles from "./index.module.css";

// 获取当前定位城市信息
const { label } = JSON.parse(window.localStorage.getItem("hkzf_current_city"));

export default class HouseList extends React.Component {
  state = {
    HousesList:[]//房屋列表
  }
  // 获取全部城市列表
  getAllHouses = async () => {
    const cityID = JSON.parse(window.localStorage.getItem("hkzf_current_city"))
      .value;
      console.log(cityID);
      
    const { data } = await getHouses(cityID);
    this.setState({
      HousesList:data.body.list
    })
  };

  componentDidMount() {
    this.getAllHouses()
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter />
        {/*  */}
        {this.state.HousesList.map(house => {
          return (
            <HouseItem house={house} key={house.houseCode}/>
          )
        })}
      </div>
    );
  }
}

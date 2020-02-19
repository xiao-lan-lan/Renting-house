import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from "antd-mobile";

import { Link } from "react-router-dom";

import styles from "./index.module.css";

import { login } from "./api";

import { withFormik } from "formik";
import * as yup from "yup";

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/;
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/;

class Login extends Component {
  state = {};

  // 点击登录按钮
  login = async () => {
    const { data } = await login(this.state);
    if (data.status === 200) {
      window.localStorage.setItem("token", data.body.token);
      Toast.success(data.description, 2);
      this.props.history.goBack();
    } else if (data.status === 400) {
      Toast.fail(data.description, 2);
    }
  };

  render() {
    console.log(this.props);
    
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar className={styles.navHeader} mode="dark">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form>
            <div className={styles.formItem}>
              <input
                onBlur={this.props.handleBlur}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                value={this.props.username}
                onChange={this.props.handleChange}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {this.props.touched.username && this.props.errors.username && (
              <div className={styles.error}>{this.props.errors.username}</div>
            )}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                onBlur={this.props.handleBlur}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                value={this.props.password}
                onChange={this.props.handleChange}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {this.props.touched.password && this.props.errors.password && (
              <div className={styles.error}>{this.props.errors.password}</div>
            )}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button
                className={styles.submit}
                type="button"
                onClick={this.props.handleSubmit}
              >
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({ username: "", password: "" }),

  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required("用户名为必填项")
      .matches(REG_UNAME, "长度为5到8位，只能出现数字、字母、下划线"),
    password: yup
      .string()
      .required("密码为必填项")
      .matches(REG_PWD, "长度为5到12位，只能出现数字、字母、下划线")
  }),

  handleSubmit: async (values, formikBag) => {
    const { data } = await login(values);
    if (data.status === 200) {
      window.localStorage.setItem("token", data.body.token);
      Toast.success(data.description, 2);
      formikBag.props.history.goBack();
    } else if (data.status === 400) {
      Toast.fail(data.description, 2);
    }
  },

  displayName: "BasicForm"
})(Login);

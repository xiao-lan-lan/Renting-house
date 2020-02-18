import React from "react";

import { Flex } from "antd-mobile";
import PropTypes from "prop-types";

import styles from "./index.module.css";

function FilterFooter({ className, style, onCancle, onSave }) {
  return (
    <Flex style={style} className={[styles.root, className || ""].join(" ")}>
      {/* 取消按钮 */}
      <span
        className={[styles.btn, styles.cancel].join(" ")}
        onClick={() => {
          onCancle();
        }}
      >
        取消
      </span>

      {/* 确定按钮 */}
      <span
        className={[styles.btn, styles.ok].join(" ")}
        onClick={() => {
          onSave();
        }}
      >
        确定
      </span>
    </Flex>
  );
}

// props校验
FilterFooter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default FilterFooter;

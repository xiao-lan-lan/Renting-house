import React from "react";
// 引入路由组件
import { Link, Route } from "react-router-dom";

// 引入二级路由组件
import Index from '../index';
import Houselist from '../houselist';
import Message from '../message';
import Profile from '../profile';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div>
          <Link to="/home/index">home</Link>
          <Link to="/home/houselist">houselist</Link>
          <Link to="/home/message">message</Link>
          <Link to="/home/profile">profile</Link>
        </div>
        <div className="route">
          <Route path="/home/index" component={Index} />
          <Route path="/home/houselist" component={Houselist} />
          <Route path="/home/message" component={Message} />
          <Route path="/home/profile" component={Profile} />
        </div>
      </div>
    );
  }
}

export default Home;

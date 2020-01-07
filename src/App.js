import React from "react";

// 引入路由组件
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// 一级路由组件
import Home from "./pages/home";
import citylist from "./pages/cityList";

function App() {
  return (
    <div className="App">
      {/* 配置路由 */}
      <Router>
        <nav>
          {/* <Link to="/home">home</Link>
          <Link to="/citylist">citylist</Link> */}
        </nav>
        <div className="route">

          {/* 重定向到首页 */}
          <Route path="/" exact render={() => {
            return <Redirect to="/home"></Redirect>
          }} />
          
          {/* home中配置二级路由组件 */}
          <Route path="/home" component={Home} />
          <Route path="/citylist" component={citylist} />
        </div>
      </Router>
    </div>
  );
}

export default App;

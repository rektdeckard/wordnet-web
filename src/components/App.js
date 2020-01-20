import React from "react";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";

import Explore from "./explore/Explore";
import Play from "./play/Play";
import Learn from "./learn/Learn";

const { Header, Content, Footer } = Layout;

const App = props => {
  return (
    <Layout>
      <Header
        className="header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[props.location.pathname.split("/")[1]]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="play">
            <Link to="/play">Play</Link>
          </Menu.Item>
          <Menu.Item key="explore">
            <Link to="/explore">Explore</Link>
          </Menu.Item>
          <Menu.Item key="learn">
            <Link to="/learn">Learn</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "64px 50px", flexGrow: 1 }}>
        <Switch>
          <Route path="/play" component={Play} />
          <Route path="/explore" component={Explore} />
          <Route path="/learn" component={Learn} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        iWordNet ©2020 Created by Mark Chang & Tobias Fried
      </Footer>
    </Layout>
  );
};

export default withRouter(App);

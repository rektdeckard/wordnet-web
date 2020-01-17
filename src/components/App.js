import React from "react";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";

import Network from "./Network";

const { Header, Content, Footer } = Layout;

const App = props => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[props.location.pathname]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/play">
            <Link to="/play">Play</Link>
          </Menu.Item>
          <Menu.Item key="/explore">
            <Link to="/explore">Explore</Link>
          </Menu.Item>
          <Menu.Item key="/learn">
            <Link to="/learn">Learn</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/explore" component={Network} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        iWordNet ©2020 Created by Mark Chang & Tobias Fried
      </Footer>
    </Layout>
  );
};

export default withRouter(App);

import React, { useEffect } from "react";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import Amplify, { Analytics, Storage } from 'aws-amplify';
import { S3Album, S3Image } from 'aws-amplify-react';

import Explore from "./explore/Explore";
import Play from "./play/Play";
import Learn from "./learn/Learn";

const uploadFile = async event => {
  const file = event.target.files[0];
  // const name = file.name + "_" + Date.now();
  const name = "sm"
  const response = await Storage.put(`profile/${name}`, file, { contentType: 'image/*', level: 'protected' });
  console.log(response);
};

const { Header, Content, Footer } = Layout;

const App = props => {
  useEffect(() => {
    Analytics.record('Amplify_CLI');
  }, []);

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
          <Menu.SubMenu
            style={{ float: 'right' }}
            title={<span><Icon type="setting" /></span>}
            // title={<S3Album style={{ height: 60, width: 60 }} level="protected" path='profile' />}
            // title={<S3Image level="protected" imgKey="profile/sm" /> }
          >
            <Menu.Item key="account">
              <Link to="/account">Account</Link>
            </Menu.Item>
            <Menu.Item key="display">
              <Link to="/display">Display</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: "64px 50px", flexGrow: 1 }}>
        <div className="App">
          <p> Pick a file</p>
          <input type="file" accept="image/*" onChange={uploadFile} />
        </div>
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

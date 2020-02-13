import React, { useEffect, useMemo } from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { Analytics, Auth } from "aws-amplify";

import Crumb from "./Crumb";
import Explore from "./explore/Explore";
import Play from "./play/Play";
import PlayConnected from "./play/PlayConnected";
import Learn from "./learn/Learn";
import Account from "./settings/Account";
import Settings from "./settings/Settings";
import Missing from "./Missing";
import Home from "./Home";

const { Header, Content, Footer } = Layout;

const App = props => {
  const {location} = props;
  // Add analytics tracker
  useEffect(() => {
    Analytics.record("page_load");
  }, []);

  // Get final path segment to show active menu item
  const segment = useMemo(() => location.pathname.split("/")[1], [location]);

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
          selectedKeys={[segment]}
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
            selectedKeys={[location.pathname.split("/").pop()]}
            style={{ float: "right" }}
            title={
              <span>
                <Icon type="setting" />
              </span>
            }
          >
            <Menu.Item key="account">
              <Link to="/account">Account</Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="signout">
              <Link to="/" onClick={() => Auth.signOut()}>
                Sign Out
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: "64px 50px", minHeight: "100vh" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route render={Crumb} />
        </Switch>
        <Switch>
          <Route path="/play" component={PlayConnected} />
          <Route path="/explore" component={Explore} />
          <Route path="/learn" component={Learn} />
          <Route path="/account" component={Account} />
          <Route path="/settings" component={Settings} />
          <Route exact path="/" component={null}/>
          <Route render={() => <Missing style={{ marginTop: 52}}/>} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        iWordNet ©2020 Created by Mark Chang & Tobias Fried
      </Footer>
    </Layout>
  );
};

export default withRouter(App);

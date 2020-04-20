import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons"
import { Analytics } from "aws-amplify";
import "antd/dist/antd.css";

import Crumb from "./Crumb";
import Explore from "./explore/Explore";
import Play from "./play/Play";
import Learn from "./learn/Learn";
import Account from "./settings/Account";
import Settings from "./settings/Settings";
import Missing from "./Missing";
import Home from "./Home";
import Navigation from "./Navigation";

const { Header, Content, Footer } = Layout;

const App = () => {
  // Add analytics tracker
  useEffect(() => {
    Analytics.record("page_load");
  }, []);

  return (
    <Layout>
      <Header
        className="header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <div className="logo" />
        <Navigation />
      </Header>
      <Content style={{ padding: "64px 50px", minHeight: "100vh" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route render={Crumb} />
        </Switch>
        <Switch>
          <Route path="/play" component={Play} />
          <Route path="/explore" component={Explore} />
          <Route path="/learn" component={Learn} />
          <Route path="/account" component={Account} />
          <Route path="/settings" component={Settings} />
          <Route exact path="/" component={null} />
          {/* Can use path="*" to match also... perf? */}
          <Route render={Missing} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <a href="https://github.com/rektdeckard/wordnet-web"><GithubOutlined style={{ color: "black"}} /></a>
        <div>Copyright © 2020 iWordNet, created by Mark Chang & Tobias Fried</div>
      </Footer>
    </Layout>
  );
};

export default App;

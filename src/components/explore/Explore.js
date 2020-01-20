import React, { useState } from "react";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Breadcrumb, Switch as Toggle } from "antd";

import Network from "./Network";
import History from "./History";
import Learn from "../learn/Learn";

const Explore = props => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/explore">Explore</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/explore/history">History</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Jan 15</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: "24px 0", background: "#fff" }}>
        <Switch>
          <Route exact path="/explore" component={Network} />
          <Route exact path="/explore/history" component={History} />
          <Route exact path="/explore/learn" component={Learn} />
        </Switch>
      </Layout>
    </>
  );
};

export default withRouter(Explore);

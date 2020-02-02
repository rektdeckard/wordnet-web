import React, { useState } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Empty, Button } from "antd";

const Missing = ({ match }) => {
  return (
    <Empty
      // image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      // imageStyle={{
      //   height: 60,
      // }}
      description={<span>Whoops. That doesn't exist.</span>}
    >
      <Button type="primary">
        <Link to={match.path}>Go back</Link>
      </Button>
    </Empty>
  );
};

export default withRouter(Missing);

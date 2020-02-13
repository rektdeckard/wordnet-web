import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Empty, Button } from "antd";

const Missing = ({ match, style  }) => {
  return (
    <Empty
      style={style}
      description={<span>Whoops. That doesn't exist.</span>}
    >
      <Button type="primary" shape="round">
        <Link to={match.path}>Go back</Link>
      </Button>
    </Empty>
  );
};

export default withRouter(Missing);

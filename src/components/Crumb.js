import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { withRouter, Link } from "react-router-dom";

const Crumb = ({ location, match }) => {
  const crumbs = useMemo(() => {
    const segments = location.pathname.split("/").slice(1);
    return segments.map((s, i) => {
      const path = "/" + segments.slice(0, i + 1).join("/");
      const segment = s
        .replace(/^(.)/, (c) => c.toUpperCase())
        .replace(/_/g, " ");
      return (
        <Breadcrumb.Item key={i}>
          {i === segments.length - 1 ? (
            segment
          ) : (
            <Link to={path}>{segment}</Link>
          )}
        </Breadcrumb.Item>
      );
    });
  }, [location]);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>{crumbs}</Breadcrumb>
  );
};

export default withRouter(Crumb);

import React, { useMemo } from "react";
import { withRouter, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Menu } from "antd";

const mainMenuItems = [
  { key: "play", value: "Play", to: "/play" },
  { key: "explore", value: "Explore", to: "/explore" },
  { key: "learn", value: "Learn", to: "/learn" },
];
const settingsMenuItems = [
  { key: "account", value: "Account", to: "/account" },
  { key: "settings", value: "Preferences", to: "/settings" },
  { key: "signout", value: "Sign Out", to: "/", onClick: () => Auth.signOut() },
];

const Navigation = ({ location }) => {
  // Get final path segment to show active menu item
  const segment = useMemo(() => location.pathname.split("/")[1], [location]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[segment]}
      style={{ lineHeight: "64px" }}
    >
      {mainMenuItems.map(({ key, value, to, ...restProps }) => (
        <Menu.Item key={key}>
          <Link to={to} {...restProps}>
            {value}
          </Link>
        </Menu.Item>
      ))}
      <Menu.SubMenu
        selectedKeys={[location.pathname.split("/").pop()]}
        style={{ float: "right" }}
        title="Settings"
      >
        {settingsMenuItems.map(({ key, value, to, ...restProps }) => (
          <Menu.Item key={key}>
            <Link to={to} {...restProps}>
              {value}
            </Link>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );
};

export default withRouter(Navigation);

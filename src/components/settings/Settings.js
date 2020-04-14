import React from "react";
import { Layout } from "antd";

import NetworkGraphInteractive from "../NetworkGraphInteractive";
import SettingsSider from "./SettingsSider";
import { useGraph } from "../../utils";
import { Colors } from "../../data/constants";
import data from "../../data/sample3.json";

const { Content } = Layout;

const Settings = () => {
  const { nodes, links } = useGraph(data);

  return (
    <Layout style={{ background: Colors.CARD_BACKGROUND }}>
      <SettingsSider />
      <Content>
        <NetworkGraphInteractive
          graph={{ nodes, links }}
          style={{ height: "76vh" }}
        />
      </Content>
    </Layout>
  );
};

export default Settings;

import React from "react";
import { connect } from "react-redux";
import { Layout, Button } from "antd";

import NetworkGraphInteractive from "../NetworkGraphInteractive";
import SettingsSider from "./SettingsSider";
import { restoreDefaults } from "../../actions"
import { useGraph } from "../../utils";
import { Colors } from "../../data/constants";
import data from "../../data/sample3.json";

const { Content } = Layout;

const Settings = ({ settings, restoreDefaults }) => {
  const { nodes, links } = useGraph(data);

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  return (
    <>
      <Layout style={{ background: Colors.CARD_BACKGROUND }}>
        <SettingsSider />
        <Content>
          <NetworkGraphInteractive
            graph={{ nodes, links }}
            style={{ height: 832 }}
          />
        </Content>
      </Layout>
      <Button type="primary" onClick={saveSettings}>Save Settings</Button>
      <Button onClick={restoreDefaults}>Restore Defaults</Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, { restoreDefaults })(Settings);

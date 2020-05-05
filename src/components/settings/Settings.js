import React from "react";
import { connect } from "react-redux";
import { Layout, Typography, Divider, Button, Result, message } from "antd";

import NetworkGraphInteractive from "../NetworkGraphInteractive";
import ErrorBoundary from "../ErrorBoundary";
import SettingsSider from "./SettingsSider";
import Download from "../explore/Download";
import { restoreDefaults } from "../../actions";
import { useGraph } from "../../utils";
import { Colors } from "../../data/constants";

import data from "../../data/sample.json";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Settings = ({ settings, restoreDefaults }) => {
  const { nodes, edges } = useGraph(data);

  const handleSaveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    message.success("Settings saved");
  };

  const handleRestoreDefaults = () => {
    restoreDefaults();
    message.success("Settings restored");
  };

  return (
    <>
      <Title level={2}>Graph Visualization</Title>
      <Layout style={{ background: Colors.CARD_BACKGROUND }}>
        <ErrorBoundary
          fallback={
            <Result
              status="warning"
              title="Error building graph"
              subTitle="Don't panic! This error has been reported."
            />
          }
        >
          <SettingsSider />
          <Content>
            <NetworkGraphInteractive
              graph={{ nodes, edges }}
              style={{ height: 832 }}
            />
          </Content>
        </ErrorBoundary>
      </Layout>
      <Divider />
      <Title level={2}>Download Data</Title>
      <Download
        all
        render={({ loading, onClick }) => (
          <Button size="small" loading={loading} onClick={onClick}>
            .xlsx
          </Button>
        )}
      />
      <Button size="small" disabled>
        .csv
      </Button>
      <Divider />
      <Title level={2}>Other Setting</Title>
      <Button type="primary" onClick={handleSaveSettings}>
        Save Settings
      </Button>
      <Button onClick={handleRestoreDefaults}>Restore Defaults</Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, { restoreDefaults })(Settings);

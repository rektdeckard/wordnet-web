import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Result, message } from "antd";

import NetworkGraphInteractive from "../NetworkGraphInteractive";
import ErrorBoundary from "../ErrorBoundary";
import SettingsSider from "../settings/SettingsSider";
import SessionDetails from "./SessionDetails";

import { fetchSession, clearSession } from "../../actions";
import { useTraversableGraph } from "../../utils";
import { Colors } from "../../data/constants";

const { Content } = Layout;

const Session = ({ graph, fetchSession, clearSession }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState({});
  const traversableGraph = useTraversableGraph(graph);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchSession(id);
      } catch (e) {
        console.error(e);
        if (e.message) message.warn(e.message);
        else if (e.errors) message.error(e.errors?.[0]?.message.split("(")[0]);
        else message.error("Error resolving session");
        clearSession();
      }
      setLoading(false);
    };
    if (id) load();
  }, [id, fetchSession]);

  return (
    <>
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
          <SettingsSider defaultCollapsed />
          <Content>
            <NetworkGraphInteractive
              graph={traversableGraph}
              loading={loading}
              hovered={hovered}
            />
          </Content>
        </ErrorBoundary>
      </Layout>
      <SessionDetails
        graph={traversableGraph}
        loading={loading}
        hovered={hovered}
        onHoverChanged={setHovered}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { graph: state.history.currentSession };
};

export default connect(mapStateToProps, { fetchSession, clearSession })(Session);

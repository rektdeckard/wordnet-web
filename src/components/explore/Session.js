import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";

import GraphViewer from "../GraphViewer";
import { fetchSession } from "../../actions";
import { useGraph } from "../../utils";

const { Content } = Layout;

const Session = ({ graph, fetchSession }) => {
  const { id } = useParams();
  const { nodes, links } = useGraph(graph);

  useEffect(() => {
    if (id) fetchSession(id);
  }, [id, fetchSession]);

  return (
    <Layout style={{ background: "#fff" }}>
      <Content>
        <GraphViewer
          graph={{ nodes, links }}
          // header={}
          // settings={}
          // transforOptions={}
        />
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { graph: state.history.currentSession };
};

export default connect(mapStateToProps, { fetchSession })(Session);

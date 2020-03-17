import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Tabs, Table } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { formatDistance } from "date-fns"

import GraphViewer from "../GraphViewer";
import { fetchSession } from "../../actions";
import { useGraph } from "../../utils";

const { Content } = Layout;
const { TabPane } = Tabs;

const responseColumns = [
  {
    title: <ClockCircleOutlined />,
    dataIndex: "createdAt",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend",
    render: response => new Date(response).toLocaleString()
  },
  {
    title: "Prompt Word",
    dataIndex: ["source", "value"],
    sorter: (a, b) => a.source.value.localeCompare(b.source.value),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend"
  },
  {
    title: "Response",
    dataIndex: "value",
    width: "50%",
    sorter: (a, b) => a.value.localeCompare(b.value),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend"
  },
  {
    title: "Response Time",
    dataIndex: "responseTime",
    align: "right",
    sorter: (a, b) => a.responseTime - b.responseTime,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: response => `${response} ms`
    // render: (text, record) => formatDistance(new Date(record.createdAt), new Date(new Date(record.createdAt) + record.responseTime))
  }
];

const wordColumns = [
  {
    title: <ClockCircleOutlined />,
    dataIndex: "createdAt",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend",
    render: response => new Date(response).toLocaleString()
  },
  {
    title: "Prompt Word",
    dataIndex: "source",
    sorter: (a, b) => a.source.localeCompare(b.source),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend"
  },
  {
    title: "Target Word",
    dataIndex: "target",
    width: "50%",
    sorter: (a, b) => a.target.localeCompare(b.target),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend"
  },
  {
    title: "Distance",
    dataIndex: "distance",
    align: "right",
    sorter: (a, b) => a.distance - b.distance,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "ascend"
  }
];

const Session = ({ graph, fetchSession }) => {
  const { id } = useParams();
  const { nodes, links, responses } = useGraph(graph);

  useEffect(() => {
    if (id) fetchSession(id);
  }, [id, fetchSession]);

  return (
    <>
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
      <Tabs defaultActiveKey="1" size="small" animated={false} style={{ marginTop: 8 }}>
        <TabPane tab="Responses" key="1">
        <Table
            // style={{ marginTop: 16 }}
            columns={responseColumns}
            dataSource={responses.map(response => ({ ...response, key: response.id }))}
            size="small"
            scroll={{ y: "26vh" }}
            pagination={false}
          />
        </TabPane>
        <TabPane tab="Words" key="2">
          <Table
            // style={{ marginTop: 16 }}
            columns={wordColumns}
            dataSource={links.map(link => ({ ...link, key: link.id }))}
            size="small"
            scroll={{ y: "26vh" }}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

const mapStateToProps = state => {
  return { graph: state.history.currentSession };
};

export default connect(mapStateToProps, { fetchSession })(Session);

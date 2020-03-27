import React, { useEffect, useRef, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Tabs, Descriptions, Table, Input, Button, Spin } from "antd";
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import GraphViewer from "../GraphViewer";
import Download from "./Download";
import { fetchSession } from "../../actions";
import { useGraph, uniqueTokensFromEntry, useDensity } from "../../utils";

const { Content } = Layout;
const { TabPane } = Tabs;

const Session = ({ graph, fetchSession }) => {
  const { id } = useParams();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [hovered, setHovered] = useState({});

  const { nodes, links, responses, createdAt } = useGraph(graph);
  const { density } = useDensity(graph);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSession(id);
      setLoading(false);
    };
    if (id) load();
  }, [id, fetchSession]);

  const searchableColumn = useMemo(
    () => dataIndex => {
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTerm(selectedKeys[0]);
        setSearchColumn(dataIndex);
      };

      const handleReset = clearFilters => {
        clearFilters();
        setSearchTerm("");
      };

      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={inputRef}
              placeholder={`Search ${dataIndex} words`}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => inputRef.current.select());
          }
        },
        render: text =>
          searchColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: "#97E3D5", padding: 0 }}
              searchWords={[searchTerm]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          )
      };
    },
    [searchColumn, searchTerm]
  );

  const responseColumns = useMemo(
    () => [
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
        defaultSortOrder: "ascend",
        ...searchableColumn("source")
      },
      {
        title: "Response",
        dataIndex: "target",
        width: "50%",
        sorter: (a, b) => a.target.localeCompare(b.target),
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "ascend",
        ...searchableColumn("target")
      },
      {
        title: "Response Time",
        dataIndex: "responseTime",
        align: "right",
        sorter: (a, b) => a.responseTime - b.responseTime,
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "descend",
        render: response => `${response} ms`
      }
    ],
    [searchableColumn]
  );

  const nodeColumns = useMemo(
    () => [
      {
        title: <ClockCircleOutlined />,
        dataIndex: "createdAt",
        sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "ascend",
        render: createdAt => new Date(createdAt).toLocaleString()
      },
      {
        title: "Word",
        dataIndex: "id",
        width: "50%",
        sorter: (a, b) => a.id.localeCompare(b.id),
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "ascend",
        ...searchableColumn("id")
      },
      {
        title: "Degree",
        dataIndex: "degree",
        align: "right",
        sorter: (a, b) => a.degree - b.degree,
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "descend"
      },
      {
        title: "Depth",
        dataIndex: "depth",
        align: "right",
        sorter: (a, b) => a.depth - b.depth,
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "descend"
      }
    ],
    [searchableColumn]
  );

  const edgeColumns = useMemo(
    () => [
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
        defaultSortOrder: "ascend",
        ...searchableColumn("source")
      },
      {
        title: "Target Word",
        dataIndex: "target",
        width: "50%",
        sorter: (a, b) => a.target.localeCompare(b.target),
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "ascend",
        ...searchableColumn("target")
      },
      {
        title: "Distance",
        dataIndex: "distance",
        align: "right",
        sorter: (a, b) => a.distance - b.distance,
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "ascend"
      }
    ],
    [searchableColumn]
  );

  return (
    <>
      <Layout style={{ background: "#fff" }}>
        <Content>
          <GraphViewer
            graph={loading ? { nodes: [], links: [] } : { nodes, links }}
            loading={loading}
            hovered={hovered}
          />
        </Content>
      </Layout>
      <Tabs
        defaultActiveKey="overview"
        size="small"
        animated={false}
        style={{ marginTop: 8 }}
      >
        <TabPane tab="Overview" key="overview">
          {loading ? (
            <div
              style={{
                background: "#FAFAFA",
                padding: 64,
                textAlign: "center"
              }}
            >
              <Spin />
            </div>
          ) : (
            <Descriptions
              title="Session Info"
              size="small"
              style={{ background: "#FAFAFA", padding: 16 }}
            >
              <Descriptions.Item label="Session ID" span={3}>
                {id}
              </Descriptions.Item>
              <Descriptions.Item
                label="Session Date"
                span={3}
                children={new Date(graph?.createdAt).toLocaleString()}
              />
              <Descriptions.Item label="Nodes" children={nodes.length} />
              <Descriptions.Item label="Edges" children={links.length} />
              <Descriptions.Item
                label="Responses"
                children={responses.length}
              />
              <Descriptions.Item
                label="Density"
                children={density?.toFixed(4) ?? "Unknown"}
              />
              <Descriptions.Item label="Diameter" children={"Unknown"} />
              <Descriptions.Item label="Other" children={"Unknown"} />
              <Descriptions.Item label="Download Data" span={3}>
                <Download
                  graph={{ nodes, links, responses, createdAt }}
                  render={({ loading, onClick }) => (
                    <Button size="small" loading={loading} onClick={onClick}>
                      .xlsx
                    </Button>
                  )}
                />
                <Button size="small" disabled>
                  .csv
                </Button>
              </Descriptions.Item>
            </Descriptions>
          )}
        </TabPane>
        <TabPane tab="Responses" key="responses">
          <Table
            // style={{ marginTop: 16 }}
            columns={responseColumns}
            dataSource={responses.map(response => ({
              ...response,
              key: response.createdAt
            }))}
            size="small"
            scroll={{ y: "26vh" }}
            pagination={false}
            loading={loading}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {}, // click row
                onDoubleClick: () => {}, // double click row
                onContextMenu: () => {}, // right button click row
                onMouseEnter: () => {
                  setHovered({
                    source: record.source,
                    targets: uniqueTokensFromEntry(record.target ?? ""),
                    showConnections: true
                  });
                }, // mouse enter row
                onMouseLeave: () => {
                  setHovered({});
                } // mouse leave row
              };
            }}
          />
        </TabPane>
        <TabPane tab="Nodes" key="nodes">
          <Table
            // style={{ marginTop: 16 }}
            columns={nodeColumns}
            dataSource={nodes.map(node => ({
              ...node,
              key: node.id
            }))}
            size="small"
            scroll={{ y: "26vh" }}
            pagination={false}
            loading={loading}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {}, // click row
                onDoubleClick: () => {}, // double click row
                onContextMenu: () => {}, // right button click row
                onMouseEnter: () => {
                  setHovered({
                    source: record.id,
                    showConnections: true
                  });
                }, // mouse enter row
                onMouseLeave: () => {
                  setHovered({});
                } // mouse leave row
              };
            }}
          />
        </TabPane>
        <TabPane tab="Edges" key="edges">
          <Table
            // style={{ marginTop: 16 }}
            columns={edgeColumns}
            dataSource={links.map(link => ({ ...link, key: link.id }))}
            size="small"
            scroll={{ y: "26vh" }}
            pagination={false}
            loading={loading}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {}, // click row
                onDoubleClick: () => {}, // double click row
                onContextMenu: () => {}, // right button click row
                onMouseEnter: () => {
                  setHovered({
                    source: record.source,
                    targets: [record.target],
                    showConnections: false
                  });
                }, // mouse enter row
                onMouseLeave: () => {
                  setHovered({});
                } // mouse leave row
              };
            }}
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

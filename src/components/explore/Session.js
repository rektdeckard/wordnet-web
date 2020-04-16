import React, { useEffect, useRef, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Tabs,
  Descriptions,
  Table,
  Input,
  Button,
  Result,
  Empty,
  Select,
  Tag,
} from "antd";
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import saveFile from "js-file-download";

import NetworkGraphInteractive from "../NetworkGraphInteractive";
import ErrorBoundary from "../ErrorBoundary";
import SettingsSider from "../settings/SettingsSider";
import Download from "./Download";
import { fetchSession } from "../../actions";
import {
  uniqueTokensFromEntry,
  useTraversableGraph,
  useDensity,
  useDiameter,
} from "../../utils";
import { Colors } from "../../data/constants";

const { Content } = Layout;
const { TabPane } = Tabs;

const Session = ({ graph, fetchSession }) => {
  const { id } = useParams();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [hovered, setHovered] = useState({});
  const [source, setSource] = useState();
  const [target, setTarget] = useState();

  const {
    nodes,
    links,
    responses,
    createdAt,
    bfs,
    shortestPath,
  } = useTraversableGraph(graph);
  const density = useDensity(graph);
  const diameter = useDiameter(graph, bfs);

  const path = useMemo(() => shortestPath(source, target) ?? [], [
    source,
    target,
    shortestPath,
  ]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSession(id);
      setLoading(false);
    };
    if (id) load();
  }, [id, fetchSession]);

  const handleSourceChanged = (value) => {
    setSource(value);
    setHovered({
      source: value,
      targets: shortestPath(value, target),
      showConnections: false,
      isPath: true,
    });
  };

  const handleTargetChanged = (value) => {
    setTarget(value);
    setHovered({
      source: value,
      targets: shortestPath(source, value),
      showConnections: false,
      isPath: true,
    });
  };

  const renderPath = () => {
    return path?.length ? (
      path.map((c) => <Tag key={c}>{c}</Tag>)
    ) : (
      <Tag>No Path</Tag>
    );
  };

  const searchableColumn = useMemo(
    () => (dataIndex) => {
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTerm(selectedKeys[0]);
        setSearchColumn(dataIndex);
      };

      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchTerm("");
      };

      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={inputRef}
              placeholder={`Search ${dataIndex} words`}
              value={selectedKeys[0]}
              onChange={(e) =>
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
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{ color: filtered ? Colors.ACTIVE : undefined }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => inputRef.current.select());
          }
        },
        render: (text) =>
          searchColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: Colors.HIGHLIGHT, padding: 0 }}
              searchWords={[searchTerm]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
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
        sortDirections: ["ascend", "descend"],
        defaultSortOrder: "ascend",
        render: (response) => new Date(response).toLocaleString(),
      },
      {
        title: "Prompt Word",
        dataIndex: "source",
        sorter: (a, b) => a.source.localeCompare(b.source),
        sortDirections: ["ascend", "descend"],
        ...searchableColumn("source"),
      },
      {
        title: "Response",
        dataIndex: "target",
        width: "50%",
        sorter: (a, b) => a.target.localeCompare(b.target),
        sortDirections: ["ascend", "descend"],
        ...searchableColumn("target"),
      },
      {
        title: "Response Time",
        dataIndex: "responseTime",
        align: "right",
        sorter: (a, b) => a.responseTime - b.responseTime,
        sortDirections: ["descend", "ascend"],
        render: (response) => `${response} ms`,
      },
    ],
    [searchableColumn]
  );

  const nodeColumns = useMemo(
    () => [
      {
        title: <ClockCircleOutlined />,
        dataIndex: "createdAt",
        sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        sortDirections: ["ascend", "descend"],
        defaultSortOrder: "ascend",
        render: (createdAt) => new Date(createdAt).toLocaleString(),
      },
      {
        title: "Word",
        dataIndex: "id",
        width: "50%",
        sorter: (a, b) => a.id.localeCompare(b.id),
        sortDirections: ["ascend", "descend"],
        ...searchableColumn("id"),
      },
      {
        title: "Degree",
        dataIndex: "degree",
        align: "right",
        sorter: (a, b) => a.degree - b.degree,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Depth",
        dataIndex: "depth",
        align: "right",
        sorter: (a, b) => a.depth - b.depth,
        sortDirections: ["descend", "ascend"],
      },
    ],
    [searchableColumn]
  );

  const edgeColumns = useMemo(
    () => [
      {
        title: <ClockCircleOutlined />,
        dataIndex: "createdAt",
        sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        sortDirections: ["ascend", "descend"],
        defaultSortOrder: "ascend",
        render: (response) => new Date(response).toLocaleString(),
      },
      {
        title: "Prompt Word",
        dataIndex: "source",
        sorter: (a, b) => a.source.localeCompare(b.source),
        sortDirections: ["ascend", "descend"],
        ...searchableColumn("source"),
      },
      {
        title: "Target Word",
        dataIndex: "target",
        width: "50%",
        sorter: (a, b) => a.target.localeCompare(b.target),
        sortDirections: ["ascend", "descend"],
        ...searchableColumn("target"),
      },
      {
        title: "Distance",
        dataIndex: "distance",
        align: "right",
        sorter: (a, b) => a.distance - b.distance,
        sortDirections: ["descend", "ascend"],
      },
    ],
    [searchableColumn]
  );

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
              graph={{ nodes, links }}
              loading={loading}
              hovered={hovered}
            />
          </Content>
        </ErrorBoundary>
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
                background: Colors.PANEL_BACKGROUND,
                padding: 64,
                textAlign: "center",
              }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            <Descriptions
              title="Session Info"
              size="small"
              style={{ background: Colors.PANEL_BACKGROUND, padding: 16 }}
            >
              <Descriptions.Item
                label="Starting Word"
                span={3}
                children={<Tag>{nodes.find((n) => n.depth === 1)?.id}</Tag>}
              />
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
              <Descriptions.Item label="Diameter" children={diameter} />
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
                <Button
                  size="small"
                  onClick={() =>
                    saveFile(
                      JSON.stringify(graph),
                      `wordnet-session-${id}.json`,
                      "application/json"
                    )
                  }
                >
                  .json
                </Button>
              </Descriptions.Item>
            </Descriptions>
          )}
        </TabPane>
        <TabPane tab="Responses" key="responses">
          <Table
            // style={{ marginTop: 16 }}
            columns={responseColumns}
            dataSource={responses}
            rowKey={(response) => response.createdAt}
            size="small"
            scroll={{ y: "25vh" }}
            pagination={false}
            loading={loading}
            rowSelection={{
              selectedRowKeys: [hovered.key],
              columnWidth: 0,
              renderCell: null,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  if (hovered.key === record.createdAt) {
                    // setSource(null);
                    setHovered({});
                  } else {
                    // setSource(record.source);
                    setHovered({
                      source: record.source,
                      targets: uniqueTokensFromEntry(record.target ?? ""),
                      showConnections: true,
                      key: record.createdAt,
                    });
                  }
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab="Nodes" key="nodes">
          <Table
            columns={nodeColumns}
            dataSource={nodes}
            rowKey={(node) => node.id}
            size="small"
            scroll={{ y: "25vh" }}
            pagination={false}
            loading={loading}
            rowSelection={{
              selectedRowKeys: [hovered.key],
              columnWidth: 0,
              renderCell: null,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  if (hovered.key === record.id) {
                    // setSource(null);
                    setHovered({});
                  } else {
                    // setSource(record.id);
                    setHovered({
                      source: record.id,
                      showConnections: true,
                      key: record.id,
                    });
                  }
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab="Edges" key="edges">
          <Table
            columns={edgeColumns}
            dataSource={links}
            rowKey={(link) => link.id}
            size="small"
            scroll={{ y: "25vh" }}
            pagination={false}
            loading={loading}
            rowSelection={{
              selectedRowKeys: [hovered.key],
              columnWidth: 0,
              renderCell: null,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  if (hovered.key === record.id) {
                    // setSource(null);
                    // setTarget(null);
                    setHovered({});
                  } else {
                    // setSource(record.source);
                    // setTarget(record.target);
                    setHovered({
                      source: record.source,
                      targets: [record.target],
                      showConnections: false,
                      key: record.id,
                    });
                  }
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab="Relationships" key="relationships">
          <div style={{ background: Colors.PANEL_BACKGROUND, padding: 16 }}>
            <Descriptions title="Geodesic Distance">
              <Descriptions.Item
                label="Source Node"
                span={1}
                children={
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    placeholder="Source Node"
                    value={source}
                    onChange={handleSourceChanged}
                  >
                    {nodes.map((n) => (
                      <Select.Option key={n.id}>{n.id}</Select.Option>
                    ))}
                  </Select>
                }
              />
              <Descriptions.Item
                label="Target Node"
                span={2}
                children={
                  <Select
                    style={{ width: 200 }}
                    showSearch
                    placeholder="Target Node"
                    value={target}
                    onChange={handleTargetChanged}
                  >
                    {nodes.map((n) => (
                      <Select.Option key={n.id}>{n.id}</Select.Option>
                    ))}
                  </Select>
                }
              />
              <Descriptions.Item
                label="Path"
                span={3}
                children={renderPath()}
              />
              <Descriptions.Item
                label="Distance"
                children={path.length ? path.length - 1 : 0}
              />
            </Descriptions>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

const mapStateToProps = (state) => {
  return { graph: state.history.currentSession };
};

export default connect(mapStateToProps, { fetchSession })(Session);

import React, { useEffect, useRef, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Tabs, Table, Input, Button } from "antd";
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import GraphViewer from "../GraphViewer";
import { fetchSession } from "../../actions";
import { useGraph } from "../../utils";

const { Content } = Layout;
const { TabPane } = Tabs;

const Session = ({ graph, fetchSession }) => {
  const { id } = useParams();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const { nodes, links, responses } = useGraph(graph);

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
        dataIndex: "response",
        width: "50%",
        sorter: (a, b) => a.value.localeCompare(b.value),
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "ascend",
        ...searchableColumn("response")
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
    ],
    [searchableColumn]
  );

  const wordColumns = useMemo(
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
          />
        </Content>
      </Layout>
      <Tabs
        defaultActiveKey="1"
        size="small"
        animated={false}
        style={{ marginTop: 8 }}
      >
        <TabPane tab="Responses" key="1">
          <Table
            // style={{ marginTop: 16 }}
            columns={responseColumns}
            dataSource={responses.map(response => ({
              ...response,
              source: response.source.value,
              response: response.value,
              key: response.id
            }))}
            size="small"
            scroll={{ y: "26vh" }}
            pagination={false}
            loading={loading}
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
            loading={loading}
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

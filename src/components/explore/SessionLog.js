import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Layout, Typography, Table } from "antd";

const { Title, Paragraph, Text } = Typography;

const columns = [
  {
    title: "Session Date",
    dataIndex: "createDate",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: (text, record) => <Link to={`/explore/sessions/${record.createdAt.split("T")[0]}`}>{text}</Link>,
    width: "25%"
  },
  {
    title: "Session Time",
    dataIndex: "createTime",
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: (text, record) => (
      <Link to={`/explore/sessions/id/${record.id}`}>{text}</Link>
    ),
    width: "50%"
  },
  {
    title: "Words",
    dataIndex: "words",
    sorter: (a, b) => a.words - b.words,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    width: "25%"
  }
];

const SessionLog = () => {
  const { date } = useParams();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  // TODO: use to generate composite WordNets from multiple sessions
  const [selectedSessionKeys, setSelectedSessionKeys] = useState([]);

  useEffect(() => {
    const fetchSessions = async date => {
      setLoading(true);
      const res = await API.graphql(
        graphqlOperation(
          /* GraphQL */ `
            query SessionsForDay(
              $filter: ModelWordNetFilterInput
              $limit: Int
            ) {
              listWordNets(filter: $filter, limit: $limit) {
                items {
                  id
                  nodes(limit: $limit) {
                    items {
                      value
                    }
                  }
                  createdAt
                }
              }
            }
          `,
          { filter: date ? { createdAt: { contains: date } } : null, limit: 1000 }
        )
      );

      const data = res.data.listWordNets.items
        .map(({ id, createdAt, nodes }) => {
          const date = new Date(createdAt);
          return {
            id,
            createdAt,
            createDate: date.toDateString(),
            createTime: date.toTimeString(),
            words: nodes.items.length,
            key: id
          };
        })
        .filter(session => session.words > 1);
      setSessions(data);
      setLoading(false);
    };

    // if (date) {
      fetchSessions(date);
    // }
  }, [date]);

  return (
    <Layout>
      <Typography>
        <Title level={2}>{date ?? "All Sessions"}</Title>
        <Table
          columns={columns}
          dataSource={sessions}
          pagination={false}
          loading={loading}
          // scroll={{ y: 720 }}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
              setSelectedSessionKeys(selectedRowKeys);
            },
            // getCheckboxProps: record => ({
            //   disabled: record.words <= 0 // Column configuration not to be checked
            // })
          }}
        />
      </Typography>
    </Layout>
  );
};

export default SessionLog;

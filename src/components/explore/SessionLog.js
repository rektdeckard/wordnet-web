import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Layout, Typography, Divider, Table } from "antd";

const { Title, Paragraph, Text } = Typography;

const columns = [
  {
    title: "Date",
    dataIndex: "createDate",
    sorter: (a, b) => a.createdAt > b.createdAt,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend"
  },
  {
    title: "Time",
    dataIndex: "createTime",
    sorter: (a, b) => a.createdAt > b.createdAt,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend"
  },
  {
    title: "Words",
    dataIndex: "words",
    sorter: (a, b) => a.words - b.words,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend"
  }
];

const SessionLog = () => {
  const { date } = useParams();
  // const correctedDate = new Date(date).

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async date => {
      const res = await API.graphql(
        graphqlOperation(
          `query SessionsForDay(
        $filter: ModelWordNetFilterInput
      ) {
        listWordNets(filter: $filter) {
          items {
            id
            nodes {
              items {
                value
              }
            }
            createdAt
          }
        }
      }`,
          { filter: { createdAt: { contains: date } } }
        )
      );
      console.log(res.data);

      const data = res.data.listWordNets.items.map(
        ({ id, createdAt, nodes }) => {
          const date = new Date(createdAt);
          return {
            id,
            createdAt,
            createDate: date.toDateString(),
            createTime: date.toTimeString(),
            words: nodes.items.length,
            key: id
          };
        }
      );
      setSessions(data);
    };

    if (date) {
      fetchSessions(date);
    }
  }, [date]);

  return (
    <Layout>
      <Typography>
        <Title level={2}>{date}</Title>
        <Table
          columns={columns}
          dataSource={sessions}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
            getCheckboxProps: record => ({
              disabled: record.name === "Disabled User", // Column configuration not to be checked
              name: record.name
            })
          }}
        />
      </Typography>
    </Layout>
  );
};

export default SessionLog;

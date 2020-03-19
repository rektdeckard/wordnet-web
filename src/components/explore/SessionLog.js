import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Layout, Typography, Table, message } from "antd";
import { parse, getUnixTime, format } from "date-fns";

const { Title, Paragraph, Text } = Typography;

const columns = [
  {
    title: "Session Date",
    dataIndex: "date",
    sorter: (a, b) => a.date - b.date,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: (text, record) => (
      <Link to={`/explore/sessions/${format(record.date, "yyyy-MM-dd")}`}>
        {text.toDateString()}
      </Link>
    ),
    width: "25%"
  },
  {
    title: "Session Time",
    dataIndex: "date",
    sorter: (a, b) => a.date - b.date,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
    render: (text, record) => (
      <Link to={`/explore/sessions/${format(record.date, "yyyy-MM-dd")}/${record.id}`}>
        {text.toTimeString()}
      </Link>
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
  const [startTimestamp, endTimestamp] = useMemo(() => {
    const time = getUnixTime(parse(date, "yyyy-MM-dd", new Date()));
    return [time, time + 86400];
  }, [date]);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  // TODO: use to generate composite WordNets from multiple sessions
  const [selectedSessionKeys, setSelectedSessionKeys] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
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
                    timestamp
                  }
                }
              }
            `,
            {
              filter: date
                ? {
                    and: [
                      { timestamp: { ge: startTimestamp } },
                      { timestamp: { le: endTimestamp } }
                    ]
                  }
                : null,
              limit: 1000
            }
          )
        );

        const data = res.data.listWordNets.items.map(
          ({ id, createdAt, nodes }) => {
            const date = new Date(createdAt);
            return {
              id,
              date: new Date(createdAt),
              words: nodes.items.length,
              key: id
            };
          }
        )
        .filter(session => session.words > 1);
        setSessions(data);
      } catch (e) {
        message.error("Error fetching records");
      }
      setLoading(false);
    };

    fetchSessions();
  }, [date, startTimestamp, endTimestamp]);

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
            }
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

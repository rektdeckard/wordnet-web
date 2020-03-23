import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { parse, getUnixTime } from "date-fns";
import moment from "moment";
import {
  Layout,
  Typography,
  DatePicker,
  Table,
  Tag,
  message,
  Button
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./SessionLog.css";

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const SessionLog = ({ initialDate, setInitialDate }) => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [startTimestamp, endTimestamp] = useMemo(() => {
    const start = startDate
      ? getUnixTime(parse(startDate, "yyyy-MM-dd", new Date()))
      : 100000;
    const end = endDate
      ? getUnixTime(parse(endDate, "yyyy-MM-dd", new Date())) + 86400
      : start + 86400000;
    return [start, end];
  }, [startDate, endDate]);

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  // TODO: use to generate composite WordNets from multiple sessions
  const [selectedSessionKeys, setSelectedSessionKeys] = useState([]);

  const handleDateClear = e => {
    e.preventDefault();
    setStartDate(null);
    setEndDate(null);
    setInitialDate(null);
  };

  const columns = useMemo(() => {
    const handleDateSelect = (_dates, [start, end]) => {
      setStartDate(start);
      setEndDate(end);
      setInitialDate();
    };

    return [
      {
        title: "Session Date",
        dataIndex: "date",
        sorter: (a, b) => a.date - b.date,
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "descend",
        render: (text, _record) => text.toDateString(),
        width: "25%",
        filterDropdown: () => (
          <div style={{ padding: 8 }}>
            <RangePicker
              value={[
                startDate && moment(startDate),
                endDate && moment(endDate)
              ]}
              onChange={handleDateSelect}
              allowClear={true}
            />
          </div>
        ),
        filterIcon: () => (
          <CalendarOutlined
            style={{ color: startDate || endDate ? "#1890ff" : undefined }}
          />
        )
      },
      {
        title: "Session Time",
        dataIndex: "date",
        sorter: (a, b) => a.date - b.date,
        sortDirections: ["descend", "ascend"],
        defaultSortOrder: "descend",
        render: (text, _record) => text.toTimeString(),
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
  }, [startDate, endDate, setInitialDate]);

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
              filter:
                startDate && endDate
                  ? {
                      and: [
                        startTimestamp
                          ? { timestamp: { ge: startTimestamp } }
                          : null,
                        endTimestamp
                          ? { timestamp: { le: endTimestamp } }
                          : null
                      ]
                    }
                  : null,
              limit: 1000
            }
          )
        );

        const data = res.data.listWordNets.items.map(
          ({ id, createdAt, nodes }) => {
            return {
              id,
              date: new Date(createdAt),
              words: nodes.items.length,
              key: id
            };
          }
        );
        // .filter(session => session.words > 1);
        setSessions(data);
      } catch (e) {
        message.error("Error fetching records");
      }
      setLoading(false);
    };

    fetchSessions();
  }, [startDate, endDate, startTimestamp, endTimestamp]);

  const renderFilterTags = () => {
    if (startDate) {
      return (
        <Tag
          closable
          onClose={handleDateClear}
          style={{ margin: 16 }}
        >{`${startDate}${endDate ? " to " + endDate : null}`}</Tag>
      );
    }
    return <Tag style={{ margin: 16 }}>All</Tag>;
  };

  return (
    <Layout>
      <Title level={2}>Sessions</Title>
      <Paragraph type="secondary">Viewing: {renderFilterTags()}</Paragraph>
      <Table
        id="session-log"
        columns={columns}
        dataSource={sessions}
        pagination={false}
        loading={loading}
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
        onRow={(record, _index) => {
          return {
            onClick: () => history.push(`/explore/sessions/${record.id}`)
          };
        }}
      />
    </Layout>
  );
};

export default SessionLog;

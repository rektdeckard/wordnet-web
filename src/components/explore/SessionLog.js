import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
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
  Descriptions,
  Button,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import { setInitialDate } from "../../actions";
import Download from "./Download";
import "./SessionLog.css";
import { Colors } from "../../data/constants";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const ONE_DAY = 86400;
const ONE_YEAR = ONE_DAY * 365;

const SessionLog = ({ initialDate, setInitialDate }) => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [startTimestamp, endTimestamp] = useMemo(() => {
    const start = startDate
      ? getUnixTime(parse(startDate, "yyyy-MM-dd", new Date()))
      : 0;
    const end = endDate
      ? getUnixTime(parse(endDate, "yyyy-MM-dd", new Date())) + ONE_DAY
      : start + ONE_YEAR * 3;
    return [start, end];
  }, [startDate, endDate]);

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  // TODO: use to generate composite WordNets from multiple sessions
  const [selectedSessionKeys, setSelectedSessionKeys] = useState([]);

  const handleDateClear = (e) => {
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
        // width: "25%",
        filterDropdown: () => (
          <div style={{ padding: 8 }}>
            <RangePicker
              value={[
                startDate && moment(startDate),
                endDate && moment(endDate),
              ]}
              onChange={handleDateSelect}
              allowClear={true}
            />
          </div>
        ),
        filterIcon: () => (
          <CalendarOutlined
            style={startDate || endDate ? { color: Colors.ACTIVE } : null}
          />
        ),
      },
      {
        title: "Session Time",
        dataIndex: "date",
        // sorter: (a, b) => (a.date.getHours() * 60 + a.date.getMinutes()) - (b.date.getHours() * 60 - b.date.getMinutes()),
        sorter: (a, b) => a.date - b.date,
        sortDirections: ["descend", "ascend"],
        render: (text, _record) => text.toLocaleTimeString(),
        // width: "50%"
      },
      {
        title: "Starting Word",
        dataIndex: "startingWord",
        sorter: (a, b) => a.startingWord.localeCompare(b.startingWord),
        sortDirections: ["ascend", "descend"],
        width: "40%",
      },
      {
        title: "Responses",
        dataIndex: "responses",
        sorter: (a, b) => a.responses - b.responses,
        sortDirections: ["descend", "ascend"],
        align: "right",
      },
      {
        title: "Words",
        dataIndex: "words",
        sorter: (a, b) => a.words - b.words,
        sortDirections: ["descend", "ascend"],
        align: "right",
      },
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
                        depth
                      }
                    }
                    responses(limit: $limit) {
                      items {
                        id
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
                          : null,
                      ],
                    }
                  : null,
              limit: 1000,
            }
          )
        );

        const data = res.data.listWordNets.items.map(
          ({ id, createdAt, nodes, responses }) => {
            return {
              id,
              date: new Date(createdAt),
              words: nodes.items.length,
              startingWord: nodes.items.filter((n) => n.depth === 1)[0].value,
              responses: responses.items.length,
              key: id,
            };
          }
        );
        setSessions(data);
      } catch (e) {
        console.error(e);
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
      <Descriptions size="small">
        <Descriptions.Item label="Filtering">
          {renderFilterTags()}
        </Descriptions.Item>
        <Descriptions.Item label="Download Data">
          <Download
            all
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
      {/* <Paragraph type="secondary">Viewing: {renderFilterTags()}</Paragraph> */}
      {/* <Paragraph type="secondary">Download Data: {<Download all element={<Button size="small">XLSX</Button>} />}</Paragraph> */}
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
          },
          // getCheckboxProps: record => ({
          //   disabled: record.words <= 0 // Column configuration not to be checked
          // })
        }}
        onRow={(record, _index) => {
          return {
            onClick: () => history.push(`/explore/sessions/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    initialDate: state.history.initialDate,
  };
};

export default connect(mapStateToProps, { setInitialDate })(SessionLog);

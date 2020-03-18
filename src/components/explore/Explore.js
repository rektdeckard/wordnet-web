import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Typography,
  Divider,
  Progress,
  Statistic,
  Card,
  List
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MessageOutlined,
  RightSquareOutlined
} from "@ant-design/icons";
import { ResponsiveCalendar } from "@nivo/calendar";
import { startOfYear } from 'date-fns';

import { fetchHistory } from "../../actions";
import { useWeekOverWeek } from "../../utils";
import Missing from "../Missing";
import SessionLog from "./SessionLog";
import Session from "./Session";

const { Title, Paragraph, Text } = Typography;

const Explore = ({ history, sessionHistory, fetchHistory }) => {
  const { sessions } = sessionHistory;
  const [loading, setLoading] = useState(false);
  const weekOverWeek = useWeekOverWeek(sessions);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchHistory();
      setLoading(false);
    }

    load();
  }, [fetchHistory]);

  const handleDayClicked = (day, event) => {
    event.preventDefault();
    history.push(`/explore/sessions/${day.day}`);
  };

  const statisticCards = [
    <Statistic
      title="Goal progress"
      // value={currentWeekSessions.length / 30 * 100}
      value={12}
      precision={1}
      formatter={value => (
        <Progress
          style={{ margin: 16 }}
          type="circle"
          width={100}
          percent={Math.round(value)}
          format={percent => `${percent}%`}
        />
      )}
      suffix="toward checking in every day this month!"
    />,
    <Statistic
      title="Activity this week"
      value={
        !isFinite(weekOverWeek) || isNaN(weekOverWeek)
          ? "No Data"
          : weekOverWeek
      }
      precision={1}
      valueStyle={{ color: weekOverWeek >= 0 ? "#51bdab" : "#f47560" }}
      prefix={weekOverWeek >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      suffix="%"
    />,
    <Statistic
      title="Words logged"
      value={sessionHistory.words ?? 0}
      precision={0}
      prefix={<MessageOutlined />}
    />,
    <Statistic
      title="Rounds played"
      value={sessionHistory.rounds ?? 0}
      precision={0}
      prefix={<RightSquareOutlined />}
    />
  ];

  return (
    <Layout>
      <Switch>
        <Route
          exact
          path="/explore"
          component={() => (
            <Typography>
              <Title level={2}>Your Stats</Title>
              <Paragraph>
                Challenge yourself by setting{" "}
                <Link to="/explore/goals" disabled>goals</Link> and staying on target.
                Gain perspective on your personality and cognitive abilities by
                checking your <Link to="/explore/insights" disabled>insights</Link>.
              </Paragraph>
              <List
                grid={{
                  gutter: 16,
                  sm: 1,
                  md: 2,
                  lg: 4
                }}
                dataSource={statisticCards}
                renderItem={item => (
                  <List.Item>
                    <Card hoverable loading={loading}>{item}</Card>
                  </List.Item>
                )}
              />
              <Divider />
              <Title level={2}>Recent Activity</Title>
              <Paragraph>
                Click on a calendar entry to view your activity for that day, or
                see your <Link to="/explore/sessions">complete history</Link>.
              </Paragraph>
              <Card hoverable loading={loading}>
                <Link to="/explore/sessions">
                  <div style={{ height: 200 }}>
                    <ResponsiveCalendar
                      data={sessionHistory.sessionsByDay}
                      from={startOfYear(new Date())}
                      to={new Date()}
                      emptyColor="#eeeeee"
                      colors={[
                        "#61cdbb",
                        "#97e3d5",
                        "#e8c1a0",
                        "#ff9980",
                        "#f47560"
                      ]}
                      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                      yearSpacing={40}
                      monthBorderColor="#ffffff"
                      dayBorderWidth={2}
                      dayBorderColor="#ffffff"
                      legends={[
                        {
                          anchor: "bottom-right",
                          direction: "row",
                          translateY: 36,
                          itemCount: 5,
                          itemWidth: 42,
                          itemHeight: 36,
                          itemsSpacing: 14,
                          itemDirection: "right-to-left"
                        }
                      ]}
                      onClick={handleDayClicked}
                    />
                  </div>
                </Link>
              </Card>
              <Divider />
              <Title level={2}>Explore</Title>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Dictum sit amet justo donec enim diam vulputate ut pharetra.
                Neque ornare aenean euismod elementum nisi quis eleifend.
                Malesuada pellentesque elit eget gravida cum sociis natoque
                penatibus et. Quisque id diam vel quam elementum pulvinar etiam
                non quam. Ut lectus arcu bibendum at varius vel pharetra.
                Adipiscing tristique risus nec feugiat in fermentum posuere urna
                nec. Laoreet sit amet cursus sit. Est sit amet facilisis magna
                etiam. Sollicitudin nibh sit amet commodo. Vitae semper quis
                lectus nulla at volutpat diam. In nulla posuere{" "}
                <Text strong>sollicitudin</Text> aliquam. Maecenas volutpat
                blandit aliquam etiam erat.
              </Paragraph>
              <Paragraph>
                Sit amet nisl purus in mollis nunc sed. Turpis massa sed
                elementum tempus egestas sed sed risus pretium. Viverra nibh
                cras pulvinar mattis nunc. Amet risus nullam eget felis eget
                nunc lobortis. Dolor sed viverra ipsum nunc. In metus vulputate
                eu <Text strong>scelerisque</Text> felis imperdiet proin.
                Ridiculus mus mauris vitae ultricies leo integer malesuada nunc
                vel. Ridiculus mus mauris vitae ultricies leo. Etiam non quam
                lacus suspendisse faucibus interdum posuere lorem ipsum. Lacus
                vel facilisis volutpat est. Facilisis leo vel fringilla est
                ullamcorper eget nulla facilisi etiam. Cursus turpis massa
                tincidunt dui ut ornare. Scelerisque fermentum dui faucibus in
                ornare quam viverra orci.
              </Paragraph>
            </Typography>
          )}
        />
        {/* <Route exact path="/explore/history" component={History} /> */}
        <Redirect exact path="/explore/sessions/id" to="/explore/sessions" />
        <Route path="/explore/sessions/:date/:id" component={Session} />
        <Route path="/explore/sessions/:date" component={SessionLog} />
        <Route path="/explore/sessions" component={SessionLog} />
        <Route render={() => <Missing />} />
      </Switch>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { sessionHistory: state.history };
};

export default connect(mapStateToProps, { fetchHistory })(Explore);

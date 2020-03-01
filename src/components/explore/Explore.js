import React, { useEffect, useMemo } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Typography,
  Divider,
  Progress,
  Statistic,
  Card,
  List,
  Icon
} from "antd";
import { ResponsiveCalendar } from "@nivo/calendar";

import { fetchHistory } from "../../actions";
import History from "./History";
import Missing from "../Missing";
import SessionLog from "./SessionLog";

const { Title, Paragraph, Text } = Typography;

const ONE_WEEK = 1000*60*60*24*7;

const now = new Date(Date.now() - ONE_WEEK); // 7 days ago
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentDate = now.getDate();
const currrentWeekday = now.getDay(); // 0 = Sunday 

const previousWeek = new Date(now.getTime() - ONE_WEEK); // 14 days ago
const previousYear = previousWeek.getFullYear();
const previousMonth = previousWeek.getMonth() + 1;
const previousDate = previousWeek.getDate();
const previousWeekday = previousWeek.getDay(); // 0 = Sunday

const Explore = ({ history, sessionHistory, fetchHistory }) => {
  const currentWeekSessions = useMemo(() => sessionHistory?.sessions?.filter(s => {
    const [year, month, date] = s.createdAt.split("T")[0].split("-");
    return (Number(year) === currentYear && Number(month) === currentMonth && Number(date) >= currentDate - currrentWeekday)
  }), [sessionHistory]);

  const previousWeekSessions = useMemo(() => sessionHistory?.sessions?.filter(s => {
    const [year, month, date] = s.createdAt.split("T")[0].split("-");
    return (Number(year) === previousYear && Number(month) === previousMonth && Number(date) >= previousDate - previousWeekday && Number(date) < currentDate - currrentWeekday)
  }), [sessionHistory]);

  const weekOverWeek = (currentWeekSessions.length / previousWeekSessions.length * 100) || 0;

  useEffect(() => {
    if (!sessionHistory.sessionsByDay.length) fetchHistory();
  }, [sessionHistory, fetchHistory]);

  const handleDayClicked = (day, event) => {
    event.preventDefault();
    console.log(day, event);
    // TODO: Redirect to log view
    history.push(`/explore/history/${day.day}`)
  }

  const statisticCards = [
    <Statistic
      title="Goal progress"
      // value={currentWeekSessions.length / 30 * 100}
      value={42}
      precision={1}
      formatter={value => (
        <Progress
          style={{ margin: 16 }}
          type="circle"
          width={100}
          percent={Math.round(value)}
          // successPercent={20}
          format={percent => `${percent}%`}
        />
      )}
      suffix="toward checking in every day this month!"
    />,
    <Statistic
      title="Activity this week"
      value={weekOverWeek}
      precision={1}
      valueStyle={{ color: "#51bdab" }}
      // valueStyle={{ color: "#f47560" }}
      prefix={<Icon type="arrow-up" />}
      // prefix={<Icon type="arrow-down" />}
      suffix="%"
    />,
    <Statistic
      title="Words logged"
      value={sessionHistory.words ?? 0}
      precision={0}
      prefix={<Icon type="message" />}
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
                <Link to="/explore/goals">goals</Link> and staying on target.
                Gain perspective on your personality and cognitive abilities by
                checking your <Link to="/explore/insights">insights</Link>.
              </Paragraph>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3
                }}
                dataSource={statisticCards}
                renderItem={item => (
                  <List.Item>
                    <Card hoverable>{item}</Card>
                  </List.Item>
                )}
              />
              <Divider />
              <Title level={2}>Recent Activity</Title>
              <Paragraph>
                Click on a calendar entry to view your activity for that day, or
                see your <Link to="/explore/history">complete history</Link>.
              </Paragraph>
              <Card hoverable>
                <Link to="/explore/history">
                  <div style={{ height: 200 }}>
                    <ResponsiveCalendar
                      data={sessionHistory.sessionsByDay}
                      from={new Date()}
                      to={
                        new Date(new Date().setMonth(new Date().getMonth() + 2))
                      }
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
        <Route exact path="/explore/history" component={History} />
        <Route path="/explore/history/:date" component={SessionLog} />
        <Route render={() => <Missing />} />
      </Switch>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { sessionHistory: state.history };
};

export default connect(mapStateToProps, { fetchHistory })(Explore);

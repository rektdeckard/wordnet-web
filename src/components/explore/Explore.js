import React from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";
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

import History from "./History";
import Missing from "../Missing";

const { Title, Paragraph, Text } = Typography;

const Explore = () => {
  const statisticCards = [
    <Statistic
      title="Goal progress"
      value={68}
      precision={0}
      formatter={value => (
        <Progress
          style={{ margin: 16 }}
          type="circle"
          width={100}
          percent={value}
          // successPercent={20}
          format={percent => `${percent}%`}
        />
      )}
      suffix="toward checking in every day this month!"
    />,
    <Statistic
      title="Activity this week"
      value={11.28}
      // value={-11.28}
      precision={1}
      valueStyle={{ color: "#51bdab" }}
      // valueStyle={{ color: "#f47560" }}
      prefix={<Icon type="arrow-up" />}
      // prefix={<Icon type="arrow-down" />}
      suffix="%"
    />,
    <Statistic
      title="Words logged"
      value={1023}
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
                      data={[
                        { day: "2020-01-03", value: 2 },
                        { day: "2020-01-06", value: 1 },
                        { day: "2020-01-07", value: 3 },
                        { day: "2020-01-08", value: 3 },
                        { day: "2020-01-09", value: 1 },
                        { day: "2020-01-10", value: 4 },
                        { day: "2020-01-13", value: 1 },
                        { day: "2020-01-14", value: 2 },
                        { day: "2020-01-15", value: 1 },
                        { day: "2020-01-17", value: 2 },
                        { day: "2020-01-20", value: 2 },
                        { day: "2020-01-21", value: 4 },
                        { day: "2020-01-22", value: 1 },
                        { day: "2020-01-23", value: 2 },
                        { day: "2020-01-24", value: 1 },
                        { day: "2020-01-27", value: 1 },
                        { day: "2020-01-28", value: 2 },
                        { day: "2020-01-29", value: 2 },
                        { day: "2020-01-30", value: 3 },
                        { day: "2020-02-01", value: 1 }
                      ]}
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
        <Route render={() => <Missing />} />
      </Switch>
    </Layout>
  );
};

export default withRouter(Explore);

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Typography,
  Divider,
  Statistic,
  Card,
  List,
  message,
} from "antd";
import {
  Chart,
  SmoothArea,
  Axis,
  SmoothLine,
  Bar,
  Coord,
  Tooltip,
} from "viser-react";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MessageOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { ResponsiveCalendar } from "@nivo/calendar";
import { startOfYear } from "date-fns";
import { scheme } from "vega-scale";

import { fetchHistory, setInitialDate } from "../../actions";
import { useWeekOverWeek, useWeekSessions } from "../../utils";
import { Colors } from "../../data/constants";

const { Title, Paragraph, Text } = Typography;
const interpolate = scheme("teals");
const heatmapColors = [
  interpolate(0),
  interpolate(0.2),
  interpolate(0.4),
  interpolate(0.6),
  interpolate(0.8),
  interpolate(1),
];

const Dashboard = ({
  history,
  sessionHistory,
  fetchHistory,
  setInitialDate,
}) => {
  const { sessions, sessionsByDay, words, rounds } = sessionHistory;
  const [loading, setLoading] = useState(false);
  const weekOverWeek = useWeekOverWeek(sessions);
  const weekSessions = useWeekSessions(sessionsByDay);

  useEffect(() => {
    const load = async () => {
      if (!sessions.length) setLoading(true);
      try {
        await fetchHistory();
      } catch (e) {
        if (e.message) message.error(e.message);
        else if (e.errors) message.error(e.errors?.[0]?.message.split("(")[0]);
        else message.error("Problem resolving statistics");
      }
      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHistory]);

  const handleDayClicked = (entry) => {
    setInitialDate(entry.day);
    history.push(`/explore/sessions`);
  };

  const statisticCards = [
    <Statistic
      title="Goal progress"
      value={rounds ?? 0}
      formatter={(value) => (
        <Chart
          forceFit
          height={80}
          padding={0}
          data={[
            { name: "Rounds", value, goal: 100 },
            { name: "Vocabulary", value: words, goal: 1000 },
          ]}
          scale={[{ dataKey: "value", max: 1000 }]}
        >
          <Coord type="rect" direction="LB" />
          <Tooltip />
          <Axis dataKey="name" />
          <Bar
            position="name*value"
            color={Colors.NEUTRAL}
            // label={["value", () => ({ formatter: (text) => `${text}%`})]}
            label={[
              "name",
              () => ({
                position: "middle",
                offset: 0,
                textStyle: {
                  fill: "#FFFFFF",
                  fontSize: 12,
                },
              }),
            ]}
          />
        </Chart>
      )}
    />,
    <>
      <Statistic
        title="Activity this week"
        value={
          isFinite(weekOverWeek) && !isNaN(weekOverWeek)
            ? weekOverWeek
            : "No Data"
        }
        precision={1}
        valueStyle={{
          color: weekOverWeek >= 0 ? Colors.POSITIVE : Colors.NEGATIVE,
        }}
        prefix={
          isFinite(weekOverWeek) &&
          !isNaN(weekOverWeek) &&
          (weekOverWeek >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />)
        }
        suffix={isFinite(weekOverWeek) && !isNaN(weekOverWeek) && "%"}
      />
      <Chart forceFit height={60} padding={0} data={weekSessions}>
        <SmoothLine
          position="day*value"
          size={2}
          color={weekOverWeek >= 0 ? Colors.POSITIVE : Colors.NEGATIVE}
        />
        <SmoothArea
          position="day*value"
          color={weekOverWeek >= 0 ? Colors.POSITIVE : Colors.NEGATIVE}
        />
        <Axis />
        <Tooltip crosshairs />
      </Chart>
    </>,
    <Statistic
      title="Words logged"
      size="large"
      value={words ?? 0}
      precision={0}
      // prefix={<MessageOutlined />}
      // suffix="TOTAL"
      valueStyle={{ fontSize: 48 }}
    />,
    <Statistic
      title="Rounds played"
      value={rounds ?? 0}
      precision={0}
      // prefix={<RightSquareOutlined />}
      // suffix="TOTAL"
      valueStyle={{ fontSize: 48 }}
    />,
  ];

  return (
    <Layout>
      <Title level={2}>Your Stats</Title>
      <Paragraph>
        Challenge yourself by setting <Link to="/explore/goals">goals</Link> and
        staying on target. Gain perspective on your personality and cognitive
        abilities by checking your <Link to="/explore/insights">insights</Link>.
      </Paragraph>
      <List
        grid={{
          gutter: 16,
          sm: 1,
          md: 2,
          lg: 4,
        }}
        dataSource={statisticCards}
        renderItem={(item) => (
          <List.Item>
            <Card hoverable loading={loading} style={{ minHeight: 176 }}>
              {item}
            </Card>
          </List.Item>
        )}
      />
      <Divider />
      <Title level={2}>Recent Activity</Title>
      <Paragraph>
        Click on a calendar entry to view your activity for that day, or see
        your <Link to="/explore/sessions">complete history</Link>.
      </Paragraph>
      <Card hoverable loading={loading} style={{ cursor: "default" }}>
        <Link to="/explore/sessions">
          <div style={{ height: 200 }}>
            <ResponsiveCalendar
              data={sessionsByDay}
              from={startOfYear(new Date())}
              to={new Date()}
              emptyColor={Colors.EMPTY}
              colors={heatmapColors}
              margin={{ top: 32, bottom: 32 }}
              yearSpacing={40}
              monthBorderColor={Colors.BORDER}
              dayBorderWidth={2}
              dayBorderColor={Colors.BORDER}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  translateY: 36,
                  itemCount: 5,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: "right-to-left",
                },
              ]}
              onClick={handleDayClicked}
            />
          </div>
        </Link>
      </Card>
      <Divider />
      <Title level={2}>Explore</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Dictum sit amet
        justo donec enim diam vulputate ut pharetra. Neque ornare aenean euismod
        elementum nisi quis eleifend. Malesuada pellentesque elit eget gravida
        cum sociis natoque penatibus et. Quisque id diam vel quam elementum
        pulvinar etiam non quam. Ut lectus arcu bibendum at varius vel pharetra.
        Adipiscing tristique risus nec feugiat in fermentum posuere urna nec.
        Laoreet sit amet cursus sit. Est sit amet facilisis magna etiam.
        Sollicitudin nibh sit amet commodo. Vitae semper quis lectus nulla at
        volutpat diam. In nulla posuere <Text strong>sollicitudin</Text>{" "}
        aliquam. Maecenas volutpat blandit aliquam etiam erat.
      </Paragraph>
      <Paragraph>
        Sit amet nisl purus in mollis nunc sed. Turpis massa sed elementum
        tempus egestas sed sed risus pretium. Viverra nibh cras pulvinar mattis
        nunc. Amet risus nullam eget felis eget nunc lobortis. Dolor sed viverra
        ipsum nunc. In metus vulputate eu <Text strong>scelerisque</Text> felis
        imperdiet proin. Ridiculus mus mauris vitae ultricies leo integer
        malesuada nunc vel. Ridiculus mus mauris vitae ultricies leo. Etiam non
        quam lacus suspendisse faucibus interdum posuere lorem ipsum. Lacus vel
        facilisis volutpat est. Facilisis leo vel fringilla est ullamcorper eget
        nulla facilisi etiam. Cursus turpis massa tincidunt dui ut ornare.
        Scelerisque fermentum dui faucibus in ornare quam viverra orci.
      </Paragraph>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { sessionHistory: state.history };
};

export default connect(mapStateToProps, { fetchHistory, setInitialDate })(
  Dashboard
);

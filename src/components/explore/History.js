import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { ResponsiveCalendar } from "@nivo/calendar";

import { fetchHistory } from "../../actions";

const { Content } = Layout;

const History = ({ history, fetchHistory }) => {
  useEffect(() => {
    if (!history.sessionsByDay.length) fetchHistory();
  }, [history, fetchHistory]);

  // const [data] = useState([
  //   { day: "2020-01-03", value: 2 },
  //   { day: "2020-01-06", value: 1 },
  //   { day: "2020-01-07", value: 3 },
  //   { day: "2020-01-08", value: 3 },
  //   { day: "2020-01-09", value: 1 },
  //   { day: "2020-01-10", value: 4 },
  //   { day: "2020-01-13", value: 1 },
  //   { day: "2020-01-14", value: 2 },
  //   { day: "2020-01-15", value: 1 },
  //   { day: "2020-01-17", value: 2 },
  //   { day: "2020-01-20", value: 2 },
  //   { day: "2020-01-21", value: 4 },
  //   { day: "2020-01-22", value: 1 },
  //   { day: "2020-01-23", value: 2 },
  //   { day: "2020-01-24", value: 1 },
  //   { day: "2020-01-27", value: 1 },
  //   { day: "2020-01-28", value: 2 },
  //   { day: "2020-01-29", value: 2 },
  //   { day: "2020-01-30", value: 3 },
  //   { day: "2020-02-01", value: 1 }
  // ]);

  return (
    <Content style={{ height: 700 }}>
      <ResponsiveCalendar
        data={history.sessionsByDay ?? []}
        // from={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        // to={new Date()}
        from={new Date()}
        to={new Date(new Date().setMonth(new Date().getMonth() + 2))}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
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
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left"
          }
        ]}
      />
    </Content>
  );
};

const mapStateToProps = state => {
  return { history: state.history };
};

export default connect(mapStateToProps, { fetchHistory })(History);

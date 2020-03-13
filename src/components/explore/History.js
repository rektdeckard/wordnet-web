import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { ResponsiveCalendar } from "@nivo/calendar";

import { fetchHistory } from "../../actions";

const { Content } = Layout;

const History = ({ history, fetchHistory }) => {
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

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

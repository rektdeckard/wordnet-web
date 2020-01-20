import React, { useState } from "react";
import { Layout } from "antd";
import { ResponsiveCalendar } from "@nivo/calendar";

const { Content } = Layout;

const History = () => {
  const [data, setData] = useState([
    { day: "2019-01-03", value: 2 },
    { day: "2019-01-05", value: 1 },
    { day: "2019-01-06", value: 2 },
    { day: "2019-01-07", value: 2 },
    { day: "2019-01-09", value: 4 },
    { day: "2019-01-10", value: 3 },
    { day: "2019-01-11", value: 1 },
    { day: "2019-01-12", value: 2 },
    { day: "2019-01-13", value: 1 },
    { day: "2019-01-16", value: 1 },
    { day: "2019-01-18", value: 3 },
    { day: "2019-01-19", value: 3 },
    { day: "2019-01-20", value: 1 },
    { day: "2019-01-21", value: 2 },
    { day: "2019-01-23", value: 2 },
    { day: "2019-01-24", value: 5 },
    { day: "2019-01-25", value: 4 },
    { day: "2019-01-30", value: 2 },
    { day: "2019-01-31", value: 1 },
    { day: "2019-02-03", value: 2 },
    { day: "2019-02-03", value: 4 },
    { day: "2019-02-03", value: 1 },
    { day: "2019-02-03", value: 2 }
  ]);

  return (
    <Content style={{ height: 700 }}>
      <ResponsiveCalendar
        data={data}
        from={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        to={new Date()}
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

export default History;

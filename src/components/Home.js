import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Layout, Typography, List, Button } from "antd";
import {
  RocketTwoTone,
  ThunderboltTwoTone,
  TrophyTwoTone
} from "@ant-design/icons";

const { Content } = Layout;
const { Text } = Typography;

const Home = () => {
  const destinationCards = [
    {
      title: "Quick Play",
      icon: <RocketTwoTone style={{ marginTop: 32, fontSize: 64 }} />,
      path: "/play",
      description:
        "Jump into a quick 5-minute game to get the creative juices flowing"
    },
    {
      title: "Insights",
      icon: <ThunderboltTwoTone style={{ marginTop: 32, fontSize: 64 }} />,
      path: "/explore/insights",
      disabled: true,
      description:
        "Gain perspective on your personality and cognitive abilities through analysis of your data"
    },
    {
      title: "Goals",
      icon: <TrophyTwoTone style={{ marginTop: 32, fontSize: 64 }} />,
      path: "explore/goals",
      disabled: true,
      description:
        "Challenge yourself to login a few times a week, expand your vocabulary, or increase your speed"
    }
  ];

  return (
    <Layout>
      <Content style={{ marginTop: 128 }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3
          }}
          dataSource={destinationCards}
          renderItem={item => (
            <List.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                {item.icon}
                <Button type="primary" shape="round" style={{ margin: 16 }} disabled={item.disabled ?? false}>
                  <Link to={item.path}>{item.title}</Link>
                </Button>
                <Text
                  style={{ fontSize: 14, padding: 32, textAlign: "center" }}
                >
                  {item.description}
                </Text>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default withRouter(Home);

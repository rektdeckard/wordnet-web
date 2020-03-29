import React, { useState, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  Layout,
  Button,
  Typography,
  Divider,
  Card,
  List,
  Row,
  Col,
  message
} from "antd";
import { FieldTimeOutlined, DeploymentUnitOutlined } from "@ant-design/icons";

import QuickPlay from "./QuickPlay";
import Missing from "../Missing";
import { initializeSession, resumeLastSession } from "../../actions";

const { Meta } = Card;
const { Title } = Typography;

const Play = ({ session, initializeSession, resumeLastSession, history }) => {
  const [loading, setLoading] = useState(false);
  const [resuming, setResuming] = useState(false);

  const gameCards = useMemo(() => {
    const handleInitialize = async gameType => {
      setLoading(gameType);
      try {
        const success = await initializeSession();
        if (success) {
          message.success("Session started");
          history.push(`/play/${gameType}`);
        } else message.error("Problem starting session");
      } catch (e) {
        message.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    const handleResume = async gameType => {
      setResuming(gameType);
      try {
        const success = await resumeLastSession();
        if (success) {
          message.success("Session loaded");
          history.push(`/play/${gameType}`);
        } else message.error("No previous session found");
      } catch (e) {
        message.error("Problem fetching data");
      } finally {
        setResuming(false);
      }
    };

    return [
      {
        title: "Quick Game",
        description: "A session to 5 minutes or 50 rounds",
        cover: (
          <FieldTimeOutlined
            style={{ color: "#1890FF", fontSize: 128, paddingTop: 24 }}
          />
        ),
        gameType: "quickplay",
        actions: [
          {
            name: "New Session",
            onClickAction: () => handleInitialize("quickplay"),
            onLoadAction: loading === "quickplay"
          },
          {
            name: "Resume Previous",
            onClickAction: () => handleResume("quickplay"),
            onLoadAction: resuming === "quickplay"
          }
        ]
      },
      {
        title: "Endurance",
        description: "See how long you can play",
        cover: (
          <DeploymentUnitOutlined
            style={{ color: "#1890FF", fontSize: 128, paddingTop: 24 }}
          />
        ),
        gameType: "endurance",
        actions: [
          {
            name: "New Session",
            disabled: true,
            onClickAction: () => handleInitialize("endurance"),
            onLoadAction: loading === "endurance"
          },
          {
            name: "Resume Previous",
            disabled: true,
            onClickAction: () => handleResume("endurance"),
            onLoadAction: resuming === "endurance"
          }
        ]
      }
    ];
  }, [loading, resuming, initializeSession, resumeLastSession, history]);

  return (
    <Switch>
      <Route exact path="/play">
        <Layout>
          <Title level={2}>Choose a Game</Title>
          <List
            grid={{
              gutter: 16,
              sm: 1,
              md: 2
            }}
            dataSource={gameCards}
            renderItem={({ title, description, cover, actions }) => (
              <List.Item key={title}>
                <Card hoverable style={{ cursor: "default" }} cover={cover}>
                  <Meta title={title} description={description} />
                  <Divider />
                  <Row gutter={8}>
                    {actions.map(
                      ({
                        name,
                        type,
                        disabled,
                        onClickAction,
                        onLoadAction
                      }) => (
                        <Col flex="auto" key={name}>
                          <Button
                            block
                            type={type}
                            disabled={disabled}
                            loading={onLoadAction}
                            onClick={onClickAction}
                          >
                            {name}
                          </Button>
                        </Col>
                      )
                    )}
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Layout>
      </Route>
      <Route exact path="/play/quickplay" component={QuickPlay} />
      <Route render={Missing} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return { session: state.graph.session };
};

export default connect(mapStateToProps, {
  initializeSession,
  resumeLastSession
})(Play);

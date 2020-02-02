import React from "react";
import { Layout, List, Avatar } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

const Learn = () => {
  const data = [
    {
      title: "What is a WordNet?",
      icon: "question-circle",
      description: (
        <>
          <p>
            One of the main challenges in artificial intelligence or
            computational linguistics is understanding the meaning of a word or
            concept.
          </p>

          <p>
            The connotation of the term understanding, or the meaning of the
            word meaning, is merely a word mapping game due to unavoidable
            circular definitions. These circular definitions arise when an
            individual defines a concept, the concepts in its definition, and so
            on, eventually one will exhaust all the words/concepts he and has to
            reuse previously used words.
          </p>

          <p>
            By connecting the associated words, a personalized network of
            concepts (called a WordNet) is formed for the individual. Such a
            WordNet serves as an external representation of an individual’s
            knowledge and state of mind at the time of the network construction.
          </p>

          <p>
            Path of Understanding in a WordNet that characterizes an
            individual’s understanding of a complex concept such as a written
            passage. Understanding and knowledge can be regarded as a calculable
            statistical property of WordNet topology.
          </p>
        </>
      )
    },
    {
      title: "Benefits of WordNet",
      icon: "smile",
      description: ""
    },
    {
      title: "Potential Applications",
      icon: "experiment",
      description: (
        <ul>
          <li>Evaluating one's knowledge over time</li>
          <li>Evaluating one's personality over time</li>
          <li>Analyzing the cognitive imparments of patients or the elderly</li>
          <li>Studying why people have different skills</li>
          <li>
            Comparing knowledge between individuals to improve teaching and
            learning
          </li>
          <li>
            Study demographic differences across ethnic, gender, and age groups
          </li>
          <li>Study people with communication deficiencies</li>
          <li>
            Augment neurological and psychological research and treatments
          </li>
          <li>Study the process of knowledge acquisition</li>
          <li>
            Create robots that truly understand humans, or at least use words
            and concepts in the same way
          </li>
          <li>
            Strudy organizational behaviors and emergent properties like
            collective intelligence
          </li>
        </ul>
      )
    },
    {
      title: "Commercial Product",
      icon: "dollar",
      description: ""
    }
  ];

  return (
    <Layout style={{ padding: "24px 24px", background: "#fff" }}>
      <Content>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      color: "#1890FFDD",
                      backgroundColor: "#1890FF22"
                    }}
                    icon={item.icon}
                  />
                }
                title={<Link to="/explore">{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Learn;

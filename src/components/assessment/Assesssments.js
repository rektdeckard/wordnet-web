import React, { useState, useMemo } from "react";
import { Steps, Typography } from "antd";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import PictographGridAssessment from "./PictographGridAssessment";
import ShapeDiscriminationAssessment from "./ShapeDiscriminationAssessment";
import TimelineAssessment from "./TimelineAssessment";
import SelfIdentifyAssessment from "./SelfIdentifyAssessment";
import DescriptionAssessment from "./DescriptionAssessment";

const { Paragraph } = Typography;
const { Step } = Steps;

const Assessments = () => {
  const [step, setStep] = useState(2);
  const assessments = useMemo(() => {
    const handleNextClicked = () => {
      if (step < assessments.length - 1) setStep((step) => step + 1);
    };
    const handlePreviousClicked = () => {
      if (step > 0) setStep((step) => step - 1);
    };

    return [
      {
        title: "Scene",
        description:
          "Place pictograms from the panel on the left into the grid on the right to create a scene.",
        content: (
          <PictographGridAssessment
            nextStep={handleNextClicked}
            previousStep={handlePreviousClicked}
          />
        ),
      },
      {
        title: "Shape Discrimination",
        description:
          "Place shapes from the panel on top into any of the three boxes below, grouping them as you see fit. You must use all shapes.",
        content: (
          <ShapeDiscriminationAssessment
            nextStep={handleNextClicked}
            previousStep={handlePreviousClicked}
          />
        ),
      },
      {
        title: "Timeline",
        description:
          "Arrange the pictograms in the timeline to tell a story or inform about yourself.",
        content: (
          <TimelineAssessment
            nextStep={handleNextClicked}
            previousStep={handlePreviousClicked}
          />
        ),
      },
      {
        title: "Self-Identify",
        description:
          "Place the pictograms into the region of the diagram that best fits its description of you.",
        content: (
          <SelfIdentifyAssessment
            nextStep={handleNextClicked}
            previousStep={handlePreviousClicked}
          />
        ),
      },
      {
        title: "Description",
        description:
          "Use a single word to define each of the pictograms below.",
        content: (
          <DescriptionAssessment
            nextStep={handleNextClicked}
            previousStep={handlePreviousClicked}
          />
        ),
      },
    ];
  }, [step, setStep]);

  return (
    <>
      <Steps current={step} style={{ marginBottom: 14 }}>
        {assessments.map((assessment) => (
          <Step key={assessment.title} title={assessment.title} />
        ))}
      </Steps>
      <Paragraph>{assessments[step].description}</Paragraph>
      <DndProvider backend={Backend}>{assessments[step].content}</DndProvider>
    </>
  );
};

export default Assessments;

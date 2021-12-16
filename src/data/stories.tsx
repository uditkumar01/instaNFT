import React from "react";
import { StoryOne } from "./Stories/StoryOne";
import { StoryTwo } from "./Stories/StoryTwo";
import { StoryThree } from "./Stories/StoryThree";
import { StoryFour } from "./Stories/StoryFour";

export const stories = [
  {
    content: (): JSX.Element => {
      return <StoryOne />;
    },
  },
  {
    content: (): JSX.Element => <StoryTwo />,
  },
  {
    content: (props: any): JSX.Element => <StoryThree />,
    seeMore: (): JSX.Element => <div />,
  },
  {
    seeMore: (): JSX.Element => <div />,
    content: (props: any): JSX.Element => <StoryFour {...props} />,
  },
];

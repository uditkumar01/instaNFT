import React from "react";
import Stories from "react-insta-stories";
import useStories from "../../context/StoryWrapper";

export function Story({ stories }: any) {
  const { pause } = useStories();
  return (
    <Stories
      width="100%"
      height="100%"
      defaultInterval={8000}
      storyContainerStyles={{ borderRadius: 8 }}
      stories={stories}
      isPaused={pause}
      loop
    />
  );
}

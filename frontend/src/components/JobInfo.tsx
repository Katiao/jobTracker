import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

type JobInfoProps = {
  icon: React.ReactNode;
  text: string;
};

export const JobInfo = ({ icon, text }: JobInfoProps) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

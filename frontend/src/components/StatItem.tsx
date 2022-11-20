import Wrapper from "../assets/wrappers/StatItem";

type StatItemProps = {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: React.CSSProperties["color"];
  bcg: React.CSSProperties["color"];
};

export const StatItem = ({ count, title, icon, color, bcg }: StatItemProps) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

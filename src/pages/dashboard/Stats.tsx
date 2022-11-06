import { useEffect } from "react";
import { StatsContainer, Loading, ChartContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { showStats } from "../../features/allJobs/allJobsSlice";

export const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store: RootState) => store.allJobs
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />

      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  );
};

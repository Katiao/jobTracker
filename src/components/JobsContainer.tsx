import { useEffect } from "react";
import { Job } from "./Job";
import { Loading } from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

export const JobsContainer = () => {
  const { jobs, isLoading } = useSelector((store: RootState) => store.allJobs);
  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore TODO: fix type & consider moving token to slice
    dispatch(getAllJobs(user?.token));
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      {/* <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div> */}
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} />;
        })}
      </div>
    </Wrapper>
  );
};

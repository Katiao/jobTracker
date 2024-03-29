import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { AppDispatch } from "../store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import Wrapper from "../assets/wrappers/Job";
import { MODEL_job } from "../types";
import { JobInfo } from "./JobInfo";
import { setEditJob, deleteJob } from "../features/job/jobSlice";

type JobProps = MODEL_job & {
  _id: string;
  createdAt: string;
};

export const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}: JobProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const date = format(new Date(createdAt), "dd/MM/yyyy");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                );
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                dispatch(deleteJob(_id));
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

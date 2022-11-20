import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { SearchFormInputs } from "../features/allJobs/types";
import { handleChange, clearFilters } from "../features/allJobs/allJobsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

export const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store: RootState) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector(
    (store: RootState) => store.job
  );
  const dispatch = useDispatch();
  const handleSearch = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Prevents changing state too fast, wait until request displayed before going to to next request
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name as keyof SearchFormInputs,
        value: e.target.value,
      })
    );
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

import { useEffect, useState } from "react";
import "./InputSearchJasa.css";
import { useDispatch } from "react-redux";
import { searchJasa } from "../../Redux/Action/JasaAction";

const InputSearchJasa = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchJasa(searchValue));
  }, [searchValue]);

  return (
    <div className="d-flex justify-content-center justify-content-md-start">
      <div className="input-group mb-3 mt-2" id="input-group-search-jasa">
        <input
          type="text"
          className="form-control py-2 ps-4 shadow-none"
          placeholder="Cari Jasa..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputSearchJasa;

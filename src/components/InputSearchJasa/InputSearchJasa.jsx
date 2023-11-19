import "./InputSearchJasa.css";

const InputSearchJasa = () => {
  return (
    <div className="container d-flex justify-content-start">
      <div className="input-group mb-3 mt-2 w-50">
        <input
          type="text"
          className="form-control py-2 ps-4"
          placeholder="Cek Jasa..."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
  );
};

export default InputSearchJasa;

import "./Loading.css";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.JasaReducer);

  useEffect(() => {
    let sweetAlertInstance = null;

    const showPopUpLoading = () => {
      if (isLoading) {
        const spinnerElement = (
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-center">
              <ThreeCircles
                visible={true}
                height={100}
                width={100}
                color="#38bdf8"
                ariaLabel="three-circles-loading"
              />
            </div>

            <div
              className="m-0 mt-4 fw-bold fs-5 text-center loading-text"
              style={{ color: "slate-gray" }}
            ></div>
          </div>
        );

        const vortexHtmlString = renderToString(spinnerElement);

        sweetAlertInstance = Swal.fire({
          html: vortexHtmlString,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
      } else {
        if (sweetAlertInstance) {
          sweetAlertInstance.close();
        }
      }
    };

    showPopUpLoading();
  }, [isLoading]);
  return null;
};

export default Loading;

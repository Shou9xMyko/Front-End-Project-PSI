import "./Payments.css";

// TABS
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FormCustomer from "./FormCustomer/FormCustomer";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import { useEffect, useState } from "react";
import Navbars from "./../Navbar/Navbars";
import Footer from "../Footer/Footer";

const Payments = () => {
  const [statusBtnFormClick, setStatusBtnFormClick] = useState("");
  const handleFormData = (status) => {
    setStatusBtnFormClick(status);
  };

  const handlePaymentMethod = (paymentMethod) => {
    console.log("ini metode pembayaran nya", paymentMethod);
  };

  useEffect(() => {
    console.log(statusBtnFormClick);
    if (statusBtnFormClick === "clicked") {
      const paymentMethodTab = document.getElementById("payment-method");
      if (paymentMethodTab) {
        paymentMethodTab.click();
      }
    }
  }, [statusBtnFormClick]);

  return (
    <div id="wrapper">
      <Navbars />
      <div className="container my-5">
        <h4 className="text-dark fw-bold mb-4">Pembayaran</h4>
        <Tabs>
          <TabList>
            <Tab>
              <p className="m-0 fw-bold " style={{ color: "#2563eb" }}>
                Data Pembeli
              </p>
            </Tab>
            <Tab id="payment-method">
              <p className="m-0 fw-bold " style={{ color: "#2563eb" }}>
                Metode Pembayaran
              </p>
            </Tab>
          </TabList>

          <TabPanel>
            <FormCustomer send={handleFormData} />
          </TabPanel>
          <TabPanel>
            <PaymentMethod send={handlePaymentMethod} />
          </TabPanel>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Payments;

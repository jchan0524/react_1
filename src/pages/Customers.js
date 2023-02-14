import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseUrl } from "../shared";
import UseFetch from "../hooks/UseFetch";

export default function Customers() {

  const [show, setShow] = useState();

  function toggleShow() {
    setShow(!show);
  }
  const url = baseUrl + "api/customers/";
  const {
    request,
    appendData,
    data: { customers } = {},
    errorStatus,
  } = UseFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

  function newCustomer(name, industry) {
    appendData({ name: name, industry: industry });
    if (!errorStatus) {
      toggleShow();
    }
  }

  useEffect(() => {
    request();
  });

  return (
    <>
      <h1>Here are our customers</h1>

      {customers
        ? customers.map((customer) => {
            return (
              <div className="m-2" key={customer.id}>
                <Link to={"/customers/" + customer.id}>
                  <button className="bg-slate-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded no-underline">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}

      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}

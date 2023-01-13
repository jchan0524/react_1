import { useParams, Link, useNavigate, useLocation,  } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";

import { baseUrl } from "../shared";
import Login from "./Login";

export default function Customer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext); 
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (!customer) return;
    if (!tempCustomer) return;
    let equal = true;
    if (customer.name !== tempCustomer.name) {
      equal = false;
    }
    if (customer.industry !== tempCustomer.industry) {
      equal = false;
    }
    if (equal) {
      setChanged(false);
    }
  });

  //Use Effect
  useEffect(() => {
    const url = baseUrl + "api/customers/" + id + "/";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          //Resource not found
          //Render a 404
          // navigate('/404');
          //or redirect to a new page
          setNotFound(true);
        } else if (response.status === 401) {
          setLoggedIn(false); 
          navigate("/login", {
            state : {
              previousUrl : location.pathname, 
            }
          });
        }
        if (!response.ok) {
          throw new Error("Something went wrong try again later");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);
  function deleteCutomer() {
    console.log("deleting...");
  }

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "api/customers/" + id + "/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization : 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false); 
          navigate("/login", {
            state : {
              previousUrl : location.pathname, 
            }
          });
        }
        if (!response.ok) throw new Error("something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);

        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <p> The customer with id {id} was not found</p> : null}

      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="name">Name</label>
              </div>

              <div className="md:w-3/4">
                <input
                  id="name"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="industry">Industry</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="industry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <div className="mb-2">
              <button
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                form="customer"
                onClick={updateCustomer}
              >
                Save
              </button>
            </div>
          ) : null}

          <div>
            <button
              className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                const url = baseUrl + "api/customers/" + id + "/";
                fetch(url, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization : 'Bearer ' + localStorage.getItem('access'),
                  },
                })
                  .then((response) => {
                    if (response.status === 401) {
                      setLoggedIn(false)
                      navigate("/login", {
                        state : {
                          previousUrl : location.pathname, 
                        }
                      });
                    }
                    if (!response.ok) {
                      throw new Error("something went wrong");
                    }
                    //assume things went well because of error
                    setError(undefined);
                    navigate("/customers");
                  })
                  .catch((e) => {
                    setError(e.message);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded no-underline">
          ← Go Back
        </button>
      </Link>
    </div>
  );
}

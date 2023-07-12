import React from "react";
import TransactionForm from "../Components/TransactionForm";
import Transactions from "../Components/Transactions";
import { AppState } from "../AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = AppState();
  return (
    <>
      {Object.keys(userInfo).length <= 0 ? (
        <div>
          Please create an account first.{" "}
          <Link to="/register" className="ml-2 text-md underline text-sky-600">
            Register
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10">
          <div className="col-span-2">
            <Transactions />
          </div>
          <div className="">
            <TransactionForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

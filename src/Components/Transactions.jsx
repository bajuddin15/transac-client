import React, { useState, useEffect } from "react";
import axios from "axios";
import TranscCard from "./TranscCard";
import { AppState } from "../AppContext";
import { toast } from "react-toastify";

const Transactions = () => {
  const { userInfo, flag, setWalletAmount } = AppState();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllTransactions = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "https://transac-project-server.onrender.com/transaction",
        config
      );
      setTransactions(data?.transactions);
      setWalletAmount(data?.walletAmount);
      console.log(data, "trans....");
      toast.success("Transactions fetched successfully");
    } catch (error) {
      setTransactions([]);
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      fetchAllTransactions();
    } else {
      setTransactions([]);
      setWalletAmount("0");
    }
  }, []);
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      fetchAllTransactions();
    } else {
      setTransactions([]);
      setWalletAmount("0");
    }
  }, [flag]);

  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          {transactions?.length === 0 ? (
            <div>
              <p>You don't have any transaction, Please create transaction.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {transactions?.map((item, index) => (
                <TranscCard
                  key={index}
                  item={item?.properties}
                  id={item?.elementId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Transactions;

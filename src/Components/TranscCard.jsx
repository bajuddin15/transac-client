import axios from "axios";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { AppState } from "../AppContext";
import EditTransac from "./EditTransac";

const TranscCard = ({ item, id }) => {
  const { userInfo, flag, setFlag } = AppState();
  const deleteTransac = async () => {
    const url = `https://transac-project-server.onrender.com/transaction/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.delete(url, config);
      toast.success("Transaction deleted successfully");
      setFlag(!flag);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {item?.name}
      </h5>
      <p>
        <span className="text-md font-semibold">Transaction Type</span>:{" "}
        <span className="text-blue-700"> {item?.type}</span>
      </p>
      <p>
        <span className="text-md font-semibold">Category</span>:{" "}
        <span className="text-blue-700"> {item?.category}</span>
      </p>
      <p>
        <span className="text-md font-semibold">Transaction Amount</span>:{" "}
        <span className="text-blue-700"> {item?.amount}</span>
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {item?.description}
      </p>
      <div className="flex items-center gap-5">
        <EditTransac item={item} id={id} />
        <button className=" text-red-600" onClick={deleteTransac}>
          <AiOutlineDelete size={28} />
        </button>
      </div>
    </div>
  );
};

export default TranscCard;

import React, { useState, useEffect } from "react";
import { categoryData } from "./data";
import axios from "axios";
import { AppState } from "../AppContext";
import { toast } from "react-toastify";

const TransactionForm = () => {
  const { userInfo, flag, setFlag } = AppState();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [catsData, setCatsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const transcData = {
      name,
      type,
      amount,
      category,
      description,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "https://transac-project-server.onrender.com/transaction/create",
        transcData,
        config
      );
      console.log(data, "trans....");
      toast.success("Transaction created successfully");
      setName("");
      setAmount("");
      setType("");
      setCategory("");
      setDescription("");
      setFlag(!flag);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
    // console.log("tData", transcData);
  };

  useEffect(() => {
    categoryData.map((cat) => {
      if (cat.type === type) {
        const cats = cat?.categories;
        setCatsData(cats);
      }
      return {};
    });
    console.log(catsData, "..............");
  }, [type]);
  return (
    <div className="border border-gray-200 rounded-lg shadow p-4">
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="p-2"
            placeholder="Transaction Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            className="p-2"
            placeholder="Transaction Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label for="countries" className="block mb-2 text-sm ">
              Select Transaction Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a type</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label for="countries" className="block mb-2 text-sm">
              Select Transaction Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a category</option>
              {catsData?.map((cat) => {
                return <option value={cat}>{cat}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            className="p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required></textarea>
        </div>
        <button
          type="submit"
          className="bg-slate-700 text-white text-md text-center uppercase font-bold py-2 rounded-lg hover:bg-slate-500 cursor-pointer">
          {loading ? "Please wait.." : "Create Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;

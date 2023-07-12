import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BiEdit } from "react-icons/bi";
import { AppState } from "../AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { categoryData } from "./data";

function EditTransac({ item, id }) {
  const [show, setShow] = useState(false);
  const { userInfo, flag, setFlag } = AppState();
  const [name, setName] = useState(item?.name || "");
  const [type, setType] = useState(item?.type || "");
  const [amount, setAmount] = useState(item?.amount || "");
  const [category, setCategory] = useState(item?.category || "");
  const [description, setDescription] = useState(item?.description || "");
  const [catsData, setCatsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const transcData = {
      name,
      type,
      amount,
      category,
      description,
    };
    const url = `https://transac-project-server.onrender.com/transaction/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.put(url, transcData, config);
      console.log(data, "trans....");
      toast.success("Transaction updated successfully");
      setFlag(!flag);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className=" text-sky-600" onClick={handleShow}>
        <BiEdit size={28} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Transaction Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Transaction Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="amount"
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mt-3">
              <div className="flex flex-col gap-1">
                <label
                  for="countries"
                  className="block mb-2 text-sm text-gray-900 dark:text-white">
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
            <div className="my-3">
              <div className="flex flex-col gap-1">
                <label
                  for="countries"
                  className="block mb-2 text-sm  text-gray-900 dark:text-white">
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? "Please wait.." : "Update Transaction"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTransac;

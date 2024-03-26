import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const App = () => {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [oldItemData, setOldItemData] = useState(null); // State to hold old item data

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:5500/api/add", {
        item: itemText,
      });
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(`${error}`);
    }
  };

  const getItemList = async () => {
    try {
      let res = await axios.get("https://todo-app-cqjm.onrender.com/get-data");
      setListItems(res.data.data);
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const updateItem = async (id, newItem) => {
    try {
      let res = await axios.put(`https://todo-app-cqjm.onrender.com/edit-data/${id}`, {
        oldItem: oldItemData, // Pass the old item data
        newItem: newItem,
      });
      setListItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, item: newItem } : item
        )
      );
      setIsUpdating("");
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      let res = await axios.delete(`https://todo-app-cqjm.onrender.com/delete-data/${id}`);
      setListItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  const startUpdate = (id, oldItem) => {
    setIsUpdating(id); // Set the item ID being updated
    setOldItemData(oldItem); // Store the old item data
  };

  return (
    <div className="app bg">
      <h1 className="fs-1">Todo List</h1>
      <hr style={{ color: "black" }} />
      <form className="form bg" onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Add Todo Item"
          className="bg"
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <button type="submit" className="bg btn btn-primary">
          Add
        </button>
      </form>
      <div className="todo-listItems bg">
        {listItems.length > 0 ? (
          listItems.map((item) => (
            <div className="todo-item bg" style={{ textAlign: "center" }} key={item._id}>
              {isUpdating === item._id ? (
                <form
                  className="update-form"
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newItem = e.target.elements.newItem.value;
                    updateItem(item._id, newItem);
                  }}
                >
                  <input
                    className="update-new-input"
                    type="text"
                    placeholder="New Item"
                    name="newItem"
                    defaultValue={oldItemData.item} // Set default value to old item data
                    style={{ textAlign: "center", padding: "1em", borderRadius: '1em', border: 'none', outline: 'none' }}
                  />
                  <button className="update-new-btn" type="submit" style={{ backgroundColor: 'green', borderRadius: '.5em' }}>
                    Update
                  </button>
                </form>
              ) : (
                <>
                  <p className="item-content bg">{item.item}</p>
                  <button
                    className="update-item bg"
                    onClick={() => {
                      startUpdate(item._id, item); // Start update with old data
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-item bg" onClick={() => deleteItem(item._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
};

export default App;

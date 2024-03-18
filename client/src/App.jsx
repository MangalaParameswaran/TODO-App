import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const App = () => {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  // console.log(listItems);
  const [isUpdating, setIsUpdating] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://todo-app-cqjm.onrender.com/api/add", {
        item: itemText,
      });
      // console.log(res.data);
      // setListItems((prev) => [...prev, res.data]);
      setItemText("");
      window.location.reload()
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
        item: newItem,
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

  const updateForm = (id) => {
    return (
      <form
        className="update-form"
        style={{display:'flex',flexDirection:'row',justifyContent:'center', alignItems:'center', textAlign:'center'}}
        onSubmit={(e) => {
          e.preventDefault();
          const newItem = e.target.elements.newItem.value;
          updateItem(id, newItem);
        }}
      >
        <input
          className="update-new-input"
          type="text"
          placeholder="New Item"
          name="newItem"
          style={{textAlign:"center", padding:"1em", borderRadius:'1em', border:'none', outline:'none'}}
        />
        <button className="update-new-btn" type="submit" style={{backgroundColor:'green', borderRadius:'.5em'}}>
          Update
        </button>
      </form>
    );
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
        {listItems && listItems.length > 0 ? (
          listItems.map((item) => (
            <div
              className="todo-item bg"
              style={{ textAlign: "center" }}
              key={item._id}
            >
              {isUpdating === item._id ? (
                updateForm(item._id)
              ) : (
                <>
                  <p className="item-content bg">{item.item}</p>
                  <button
                    className="update-item bg"
                    onClick={() => {
                      setIsUpdating(item._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-item bg"
                    onClick={() => deleteItem(item._id)}
                  >
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

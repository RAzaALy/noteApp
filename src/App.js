import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button/Button";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Edit from "@material-ui/icons/EditOutlined";
import AddCircle from "@material-ui/icons/AddCircleOutline";
import Notes from "./components/Notes.jsx";
import "./App.css";
//get data from local storage:
const getData = () => {
  const toDo = localStorage.getItem("toDo");
  // console.log(toDo);
  if (toDo) {
    return JSON.parse(localStorage.getItem("toDo"));
  } else {
    return [];
  }
};

function App() {
  const [inputList, setinputList] = useState("");
  const [Items, setItems] = useState(getData());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const noteEvent = (event) => {
    setinputList(event.target.value);
  };
  const saveItem = () => {
    if (!inputList) {
      alert("please enter the todo?");
    } else if (inputList && !toggleBtn) {
      setItems(
        Items.map((elem) => {
          if (elem.id === editItem) {
            return { ...elem, value: inputList };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setinputList("");
      setEditItem(null);
    } else {
      setItems((prevItem) => {
        const inputObj = {
          id: new Date().getTime().toString(),
          value: inputList,
        };
        return [...prevItem, inputObj];
      });
    }
    setinputList("");
  };
  const deleteToDo = (index) => {
    //  console.log("deleted");
    setItems((prevItem) => {
      return prevItem.filter((elem) => {
        return index !== elem.id;
      });
    });
  };
  //Edit toDo
  const editToDo = (id) => {
    const editDo = Items.find((elem) => {
      return id === elem.id;
    });
    // console.log(editToDo);
    setToggleBtn(false);
    setinputList(editDo.value);
    setEditItem(id);
  };
  //Delete all notes
  const clearAll = () => {
    setItems([]);
  };

  //add to local storage:
  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(Items));
  }, [Items]);

  return (
    <div className="app">
      <div className="center">
        <h1>Sticky Notes</h1>
        <div className="inputBox">
          <input
            type="text"
            placeholder="Add a Note"
            onChange={noteEvent}
            value={inputList}
          />
          {toggleBtn ? (
            <Tooltip title={<p style={{ fontSize: 12 }}>save note</p>}>
              <AddCircle
                className="Btn"
                onClick={saveItem}
                style={{ fontSize: 30 }}
              ></AddCircle>
            </Tooltip>
          ) : (
            <Tooltip title={<p style={{ fontSize: 12 }}>update note</p>}>
              <Edit
                className="Btn"
                onClick={saveItem}
                style={{ fontSize: 30 }}
              ></Edit>
            </Tooltip>
          )}
        </div>
        <Tooltip title={<p style={{ fontSize: 12 }}>clear note</p>}>
          <Button
            className="clear"
            variant="contained"
            color="primary"
            onClick={clearAll}
          >
            Clear notes
          </Button>
        </Tooltip>
      </div>
      <div className="notes">
        <ol>
          {/* <li>{inputList}</li> */}
          {Items.map((toDo) => {
            return (
              <Notes
                text={toDo.value}
                key={toDo.id}
                index={toDo.id}
                onDelete={deleteToDo}
                onEdit={editToDo}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;

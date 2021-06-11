import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input/Input";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import AddCircle from "@material-ui/icons/AddCircleOutline";
import MoodTwoToneIcon from "@material-ui/icons/MoodTwoTone";
import Notes from "./components/Notes.jsx";
import Scroll from "./components/Scroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";

const App = () => {
  const [inputList, setinputList] = useState("");
  const [Items, setItems] = useState([]);
  const [emoji, setEmoji] = useState({ showEmojis: false });
  useEffect(() => {
    db.collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().note));
        setItems(
          snapshot.docs.map((doc) => ({ note: doc.data().note, id: doc.id }))
        );
      });
  }, []);

  const noteEvent = (event) => {
    setinputList(event.target.value);
  };

  const save = (e) => {
    e.preventDefault();
    if (!inputList) {
      toast.info(`Please first add a note.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      db.collection("notes").add({
        note: inputList,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setItems([...Items, inputList]);
    }
    setinputList("");
  };
  //deletea all notes 🔥
  function deleteAll() {
    db.collection("notes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
        toast.info(`Your notes has been successfully deleted.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const closeMenu = (e) => {
    setEmoji({
      showEmojis: false,
    });
  };
  const showEmojis = (e) => {
    setEmoji({
      showEmojis: true,
    });
  };
  return (
    <div className="app">
      <ToastContainer style={{ fontSize: "1.4rem" }} />
      <div className="center">
        <h1>Sticky Notes</h1>

        <form onSubmit={save} className="inputBox">
          <Input
            className="input"
            type="text"
            placeholder="add a note..."
            onChange={noteEvent}
            value={inputList}
          />
          <Tooltip title={<p style={{ fontSize: 12 }}>save note</p>}>
            <AddCircle
              className="Btn"
              style={{ fontSize: 30 }}
              onClick={save}
            ></AddCircle>
          </Tooltip>

          {emoji.showEmojis ? (
            <>
              <Picker
                showPreview={false}
                emoji="point_up"
                emojiSize={30}
                showEmojis={true}
                emojiTooltip={true}
                className={styles.emojiPicker}
                title="WeChat"
                onSelect={(emoji) => setinputList(inputList + emoji.native)}
              />
              <Tooltip title={<p style={{ fontSize: 12 }}>pick emoji</p>}>
                <MoodTwoToneIcon
                  className="Btn"
                  style={{ fontSize: 30 }}
                  onClick={closeMenu}
                ></MoodTwoToneIcon>
              </Tooltip>
            </>
          ) : (
            <Tooltip title={<p style={{ fontSize: 12 }}>pick emoji</p>}>
              <MoodTwoToneIcon
                className="Btn"
                style={{ fontSize: 30 }}
                onClick={showEmojis}
              ></MoodTwoToneIcon>
            </Tooltip>
          )}
        </form>
        <Tooltip title={<p style={{ fontSize: 12 }}>clear notes</p>}>
          <Button
            onClick={deleteAll}
            className="clear"
            variant="contained"
            color="primary"
          >
            clear noets
          </Button>
        </Tooltip>
      </div>
      <div className="notes">
        <ol>
          {/* <li>{inputList}</li> */}
          {Items.map((note, index) => {
            return <Notes note={note} key={index} />;
          })}
        </ol>
      </div>
      <Scroll showBelow={120} />
    </div>
  );
};
export default App;
const styles = {
  emojiPicker: {
    cursor: "pointer",
    zIndex: 343,
    position: "fixed",
    bottom: "3.5%",
    right: "4%",
    border: "none",
    margin: 0,
  },
};

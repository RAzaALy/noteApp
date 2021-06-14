import React, { useState } from "react";
import Delete from "@material-ui/icons/DeleteForeverSharp";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Edit from "@material-ui/icons/EditOutlined";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input/Input";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import MoodTwoToneIcon from "@material-ui/icons/MoodTwoTone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import db from "../firebase";

const Notes = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [emoji, setEmoji] = useState({ showEmojis: false });
  // 🙂 modal style
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      width: "85%",
      fontSize: "1.4rem",
    },
    paper: {
      display: "flex",
      justifyContent: 'center',
      alignItems: "center",
      height: "15rem",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      width: "60%",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      "@media(max-Width: 768px)": {
        width: "80%",
      },
    },
  }));

  //update note:
  const updateNote = () => {
    if (input) {
      db.collection("notes").doc(props.note.id).set(
        {
          note: input,
        },
        { merge: true }
      );
      setOpen(false);
    } else {
      toast.info(`please insert a text to update note.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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
  const classes = useStyles();
  return (
    <div>
      <ToastContainer style={{ fontSize: "1.4rem" }} />
      {/* signup modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Input
              className={classes.input}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder={props.note.note}
            />
            <Tooltip title={<p style={{ fontSize: 12 }}>update note</p>}>
              <Edit
                className="Btn"
                style={{ fontSize: 30 }}
                onClick={updateNote}
              ></Edit>
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
                  onSelect={(emoji) => setInput(input + emoji.native)}
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
          </div>
        </Fade>
      </Modal>
      <div className="noteStyle">
        <Tooltip title={<p style={{ fontSize: 12 }}>edit note</p>}>
          <Edit
            className="edit"
            style={{ fontSize: 20 }}
            onClick={() => {
              setOpen(true);
            }}
          ></Edit>
        </Tooltip>
        <Tooltip title={<p style={{ fontSize: 12 }}>delete note</p>}>
          <Delete
            className="trash"
            style={{ fontSize: 20 }}
            onClick={(e) => {
              db.collection("notes").doc(props.note.id).delete();
            }}
          ></Delete>
        </Tooltip>
        <li>{props.note.note}</li>
      </div>
    </div>
  );
};
export default Notes;
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

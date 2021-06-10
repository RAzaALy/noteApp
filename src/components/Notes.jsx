import React from "react";
import Delete from "@material-ui/icons/DeleteForeverSharp";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Edit from "@material-ui/icons/EditOutlined";

const Notes = (props) => {
  return (
    <>
      <div className="noteStyle">
        <Tooltip title={<p style={{ fontSize: 12 }}>edit note</p>}>
          <Edit
            className="edit"
            style={{ fontSize: 20 }}
            onClick={() => {
              props.onEdit(props.index);
            }}
          ></Edit>
        </Tooltip>
        <Tooltip title={<p style={{ fontSize: 12 }}>delete note</p>}>
          <Delete
            className="trash"
            style={{ fontSize: 20 }}
            onClick={() => {
              props.onDelete(props.index);
            }}
          ></Delete>
        </Tooltip>

        <li>{props.text}</li>
      </div>
    </>
  );
};
export default Notes;

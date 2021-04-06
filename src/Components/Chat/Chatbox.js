import React, { useEffect, useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export default function Chatbox(props) {
  const Auth = useSelector((state) => state.Auth);
  let socket = io("http://localhost:5000/", { transports: ["websocket"] });
  const room = props.url;
  const [chats, setChat] = useState([]);
  const [joined, setjoined] = useState(false);
  const [message, setMessage] = useState("");

  function submit() {
    if (message !== "") {
      console.log("submit");
      socket.emit("message", {
        _id: Math.random(),
        sender: Auth.id,
        content: message,
        room: room,
      });
      setMessage("");
    }
    var elem = document.getElementById("chatbox");
    elem.scrollTop = elem.scrollHeight;
  }
  function savechat(data) {
    setChat((chats) => [...chats, data]);
    console.log(chats);
  }

  const updateField = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    socket.on(
      "init",
      (msg) => {
        console.log("connected");
        if (joined === false) {
          socket.emit("room", { r_name: room, name: Auth.id });
          console.log("room");
        }

        socket.on("joined_room", (msg) => {
          setjoined(true);
          let messages = JSON.stringify(msg);
          console.log("joined");
          //console.log(msg)
          setChat((chats) => msg);
          console.log(chats);
          var elem = document.getElementById("chatbox");
          elem.scrollTop = elem.scrollHeight;
        });
      },
      ["abc"]
    );

    socket.on("message_push", (data) => {
      setChat((chats) => [...chats, data]);
    });
    var elem = document.getElementById("chatbox");
    elem.scrollTop = elem.scrollHeight;
  });

  return (
    <Grid container spacing={0}>
      <Grid className="ChatHeader" xs={12}></Grid>
      <Grid className="chatbox " id="chatbox" xs={12}>
        {chats.map((chat) =>
          chat.sender === Auth.id ? (
            <div key={chat._id} className="me">
              {chat.content}
            </div>
          ) : (
            <div key={chat._id} className="other">
              {chat.content}
            </div>
          )
        )}
      </Grid>
      <Grid className="Submitplus" xs={9}>
        {/* <Form.Control
          type="text"
          placeholder="Say Hi"
          name="content"
          value={form.content}
          onChange={updateField}
          className="chatinp"
        /> */}
        <TextField
          placeholder="Say Hi"
          name="content"
          value={message}
          onChange={updateField}
          className="chatinp w-100"
          variant="outlined"
        />
      </Grid>
      <Grid className="Submitplus" xs={3}>
        <Button
          variant="dark"
          className="w-100"
          onClick={(e) => {
            submit(e);
          }}
        >
          <b>Send</b>
        </Button>
      </Grid>
    </Grid>
  );
}

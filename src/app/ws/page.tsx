"use client";

import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { v4 as uuid } from "uuid";

type Props = {};

const WsPage = (props: Props) => {
  const [userId] = useState(uuid());
  const wsURL = "ws://localhost:8080/?id=" + userId;

  const { sendMessage, lastMessage, readyState, lastJsonMessage } =
    useWebSocket(wsURL, {
      share: true,
      onOpen: () => console.log("opened"),
      onClose: () => console.log("closed"),
      onError: () => console.log("error"),
    });

  useEffect(() => {
    const res = lastJsonMessage;

    if (res) {
      console.log(res);
      console.log(res.type);
      //   console.log(JSON.parse(res.id));
      let msg = [];
      const user = res.id;
      msg.push(user);

      // render cursor for each user
      if (res.type === "cursor") {
        const cursor = document.getElementById(user);
        if (cursor) {
          cursor.style.left = res.x + "px";
          cursor.style.top = res.y + "px";
        } else {
          const cursor = document.createElement("div");
          cursor.id = user;
          cursor.className = "cursor";
          cursor.style.left = res.x + "px";
          cursor.style.top = res.y + "px";
          document.body.appendChild(cursor);
        }

        console.log(msg);
      }
    }

    // if (parsedData) {
    //   console.log(parsedData);
    //   let msg = [];
    //   const user = parsedData.id;
    //   msg.push(user);

    //   console.log(msg);
    // }
  }, [lastMessage]);

  useEffect(() => {
    // send mouse position to server
    window.addEventListener("mousemove", (e) => {
      sendMessage(
        JSON.stringify({
          id: userId,
          type: "cursor",
          x: e.clientX,
          y: e.clientY,
        })
      );
    });
  }, []);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center p-6 sm:p-10 font-sans z-10">
      <h1 className="text-4xl">Peace</h1>
      <input
        type="text"
        className="p-4 border border-gray-300 rounded-lg"
        placeholder="message"
        onChange={(e) =>
          sendMessage(
            JSON.stringify({
              id: userId,
              type: "message",
              message: e.target.value,
            })
          )
        }
      />

      <button
        onClick={() =>
          sendMessage(
            JSON.stringify({
              id: userId,
              type: "message",
              message: e.target.value,
            })
          )
        }
        className="p-4 bg-blue-500 text-white rounded-lg"
      >
        Send Message
      </button>
      <p>Connection Status: {readyState}</p>
      <p>Last Message: {lastMessage ? lastMessage.data : "null"}</p>
    </main>
  );
};

export default WsPage;

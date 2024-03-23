import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import { useSelector } from "react-redux";
import { uiActions } from "../../redux/slice/uiSlice";
import useHelper from "../../hooks/useHelper";
import { Fragment } from "react";
import json from "../../helpers/json";
import useWebSocket from "../../hooks/useWebSocket";

const Chat = ({ senderId, receiverId }) => {
  const { dispatch } = useHelper();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [receiver, setReceiver] = useState();

  const isChatOpen = useSelector((state) => state.ui.chat.open);

  const { wsCli } = useWebSocket({
    url: `/message?senderId=${senderId}&receiverId=${receiverId}`,
  });

  useWebSocketEvent(
    wsCli,
    () => {},
    (data) => {
      if (data.type === "server.send:receiver.data") {
        setReceiver(data.data);
      }
      if (data.type === "server.send:previous_messages") {
        setMessages(data.data);
      }
      if (data.type === "server.echo:new_message") {
        setMessages((prev) => [data.data, ...prev]);
      }
      if (data.type === "server.broadcast:new_message") {
        setMessages((prev) => [data.data, ...prev]);
      }
    },
    "Chat.jsx"
  );

  const sendHandler = () => {
    console.log("logging :: sendHandler called");
    wsCli.send(
      json({
        type: "client.send:new_message",
        data: {
          message: messageContent,
        },
      })
    );
  };

  useEffect(() => {
    let objDiv = document.getElementById("chat-container");
    if (!objDiv) return;
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  return (
    <>
      <Transition
        show={isChatOpen}
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs lg:max-w-3xl shadow-md"
          onClose={() => {
            dispatch(
              uiActions.toggleChat({
                open: false,
              })
            );
          }}
        >
          {/* chat header */}
          <div className="w-full bg-white rounded-t-xl">
            <div className="px-6 py-3">
              <div className="grid grid-cols-1">
                <span className="text-black font-medium text-base">
                  {receiver?.username}
                </span>
                <span className="text-gray-400 font-medium text-xs">
                  {moment(receiver?.lastSeen).fromNow()}
                </span>
              </div>
            </div>
          </div>
          {/* chat content */}
          <div className="w-full bg-white">
            <div
              id="chat-container"
              className="p-4 grid grid-cols-1 gap-y-3 content-start h-[35rem] overflow-auto"
            >
              {[...messages].reverse().map((message) =>
                message.senderId === senderId ? (
                  <>
                    <div className="justify-self-end">
                      <div className="text-right">
                        <span className="text-gray-400 text-sm font-medium">
                          {moment(message.createdAt).fromNow()}
                        </span>
                      </div>
                      <div className="ml-auto mt-2.5 p-2.5 rounded-xl w-fit max-w-lg text-sm font-medium leading-6 animate-fade-in text-white bg-blue-800">
                        {message.data}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="justify-self-start">
                      <div className="text-left">
                        <span className="text-gray-400 text-sm font-medium">
                          {moment(message.createdAt).fromNow()}
                        </span>
                      </div>
                      <div className="mr-auto mt-2.5 p-2.5 rounded-xl w-fit max-w-lg text-sm font-medium leading-6 animate-fade-in text-black bg-zinc-100">
                        {message.data}
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
          {/* chat form control */}
          <div>
            <input
              className="px-6 py-4 w-full bg-white rounded-b-xl focus:outline-none"
              type="text"
              name="message-content"
              id="message-content"
              value={messageContent}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendHandler();
                  setMessageContent("");
                }
              }}
              onChange={(e) => {
                setMessageContent(e.target.value);
              }}
            />
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Chat;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHelper from "../../hooks/useHelper";
import { uiActions } from "../../redux/slice/uiSlice";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import jsonToObj from "../../helpers/jsonToObj";
import moment from "moment";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import { Link } from "react-router-dom";
import json from "../../helpers/json";
import {
  faBell as faBellFull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellEmpty } from "@fortawesome/free-regular-svg-icons";
import useWebSocket from "../../hooks/useWebSocket";

const Notification = () => {
  const { dispatch } = useHelper();
  const [notifications, setNotifications] = useState([]);
  const isNotificationOpen = useSelector((state) => state.ui.notification.open);
  const [newNotification, setNewNotification] = useState(
    localStorage.getItem("newNotification")
  );

  const { wsCli } = useWebSocket({
    url: "/notification",
  });

  useWebSocketEvent(
    wsCli,
    () => {},
    (data) => {
      if (data.type === "server.send:previous_notifications") {
        setNotifications(data.data);
      }
      if (data.type === "server.broadcast:new_notification") {
        setNotifications((prev) => [...prev, data.data]);
        setNewNotification(true);
        localStorage.setItem("newNotification", "true");
      }
      if (data.type === "server.send:delete.notification") {
        setNotifications((prev) =>
          prev.filter(
            (notification) => notification.id !== data.data.deleted.id
          )
        );
      }
      if (data.type === "server.send:delete.all_notifications") {
        setNotifications([]);
      }
    },
    "Navigation.jsx"
  );

  const deleteNotificationHandler = (id) => {
    console.log("deleteNotificationHandler called");
    wsCli.send(
      json({
        type: "client.send:delete.notification",
        data: {
          id: id,
        },
      })
    );
  };

  const deleteAllNotificationsHandler = () => {
    console.log("deleteAllNotificationsHandler called");
    wsCli.send(
      json({
        type: "client.send:delete.all_notifications",
        data: {},
      })
    );
  };

  return (
    <div>
      {newNotification ? (
        <FontAwesomeIcon
          onClick={() => {
            dispatch(
              uiActions.toggleNotification({
                open: true,
              })
            );
            setNewNotification(false);
            localStorage.removeItem("newNotification");
          }}
          className={"text-yellow-300 w-4 h-4"}
          icon={faBellFull}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => {
            dispatch(
              uiActions.toggleNotification({
                open: true,
              })
            );
            setNewNotification(false);
            localStorage.removeItem("newNotification");
          }}
          className={"text-white w-4 h-4"}
          icon={faBellEmpty}
        />
      )}
      <Transition
        show={isNotificationOpen}
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          className={
            "fixed top-3 right-3 lg:absolute lg:top-[7.5rem] lg:right-[28rem] z-50"
          }
          onClose={() => {
            dispatch(
              uiActions.toggleNotification({
                open: false,
              })
            );
          }}
        >
          <Dialog.Panel>
            <div className="rounded-xl bg-white w-[21rem] lg:w-[27.5rem] min-h-[12.5rem] max-h-[25.0rem] overflow-auto drop-shadow-[0px_4px_20px_rgba(0,0,0,0.25)]">
              <div className="p-6 flex items-center justify-between border-b-2 border-gray-100">
                <h4 className="text-xl font-medium">Notification</h4>
                <span
                  onClick={() => {
                    deleteAllNotificationsHandler();
                  }}
                  className="text-xs font-medium text-danger hover:text-opacity-80 cursor-pointer"
                >
                  Mark all as read
                </span>
              </div>
              <div className="grid grid-cols-1">
                {[...notifications].map((n, i) => (
                  <div
                    key={i}
                    className="px-6 pt-4 pb-10 flex justify-between text-black w-full h-full hover:bg-[#F2F9FF]"
                  >
                    <div className="flex flex-col gap-y-2">
                      <Link
                        to={jsonToObj(n.data).link}
                        className="text-sm font-medium focus:outline-none"
                        onClick={() => {}}
                      >
                        {jsonToObj(n.data).message}
                      </Link>
                      <div className="text-xs font-medium text-gray-400">
                        {moment(jsonToObj(n.data).created_at).fromNow()}
                      </div>
                    </div>
                    <FontAwesomeIcon
                      onClick={() => {
                        deleteNotificationHandler(n.id);
                      }}
                      className="w-3 h-3 text-gray-300 cursor-pointer"
                      icon={faXmark}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Notification;

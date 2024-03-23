import { Dialog, Transition } from "@headlessui/react";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import { Fragment, useEffect, useState } from "react";
import json from "../../helpers/json";
import useDebounce from "../../hooks/useDebounce.";
import FormControl from "../FormControl/B/FormControl";
import useWebSocket from "../../hooks/useWebSocket";

const ProfileSetting = ({ open, onCLose }) => {
  const [email, setEmail] = useState();
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailCodeInput, setEmailCodeInput] = useState();
  const [emailButtonCount, setEmailButtonCount] = useState(0);
  const [emailVerificationSuccess, setEmailVerificationSuccess] =
    useState(false);

  const [phonenumber, setPhonenumber] = useState();
  const [phonenumberCodeSent, setPhonenumberCodeSent] = useState(false);
  const [phonenumberCodeInput, setPhonenumberCodeInput] = useState();
  const [phonenumberButtonCount, setPhonenumberButtonCount] = useState(0);
  const [phonenumberVerificationSuccess, setPhonenumberVerificationSuccess] =
    useState(false);

  const { debounce } = useDebounce();

  const { wsCli: emailWs } = useWebSocket({
    url: "/profile_setting?email=true",
  });

  useWebSocketEvent(
    emailWs,
    () => {},
    (data) => {
      if (data.type === "server.send:waiting_for_email_verification_code") {
        setEmailCodeSent(true);
      }
      if (data.type === "server.send:email_verification_success") {
        setEmailVerificationSuccess(true);
        setEmailCodeSent();
      }
    },
    "ProfileSetting"
  );

  const { wsCli: phonenumberWs } = useWebSocket({
    url: "/profile_setting?phonenumber=true",
  });

  useWebSocketEvent(
    phonenumberWs,
    () => {},
    (data) => {
      if (
        data.type === "server.send:waiting_for_phonenumber_verification_code"
      ) {
        setPhonenumberCodeSent(true);
      }
      if (data.type === "server.send:phonenumber_verification_success") {
        setPhonenumberVerificationSuccess(true);
        setPhonenumberCodeSent();
      }
    },
    "ProfileSetting"
  );

  useEffect(() => {
    if (!emailWs) return;
    debounce(() => {
      emailWs.send(
        json({
          type: "client.send:email_to_change",
          data: {
            email: email,
          },
        })
      );
    });
  }, [email]);

  useEffect(() => {
    if (!emailWs) return;
    emailWs.send(
      json({
        type: "client.send:email_verification_code",
        data: {
          email: email,
          code: emailCodeInput,
        },
      })
    );
  }, [emailButtonCount]);

  useEffect(() => {
    if (!phonenumberWs) return;
    debounce(() => {
      phonenumberWs.send(
        json({
          type: "client.send:phonenumber_to_change",
          data: {
            phonenumber: phonenumber,
          },
        })
      );
    });
  }, [phonenumber]);

  useEffect(() => {
    if (!phonenumberWs) return;
    phonenumberWs.send(
      json({
        type: "client.send:phonenumber_verification_code",
        data: {
          phonenumber: phonenumber,
          code: phonenumberCodeInput,
        },
      })
    );
  }, [phonenumberButtonCount]);

  return (
    <Transition
      show={open}
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
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
        }
        onClose={onCLose}
      >
        <Dialog.Panel>
          <div className="mx-auto shadow-lg rounded-xl p-16 bg-white h-[37.5rem] grid grid-cols-1 gap-y-20 overflow-auto">
            {/* To fix flickering cursor */}
            <input type="text" className="sr-only" />
            {/* email address */}
            <div className="grid grid-cols-1">
              <FormControl
                label="Change Email Address"
                type="text"
                id="change-email-address"
                name="change-email-address"
                disabled={emailCodeSent || emailVerificationSuccess}
                placeholder="Enter new email address"
                onChangeHandler={(e) => setEmail(e.target.value)}
              />
              {emailCodeSent && (
                <>
                  <span className="my-2 text-sm text-success">
                    A verification code has been sent to your email address
                  </span>
                  <FormControl
                    type={"text"}
                    id={"email-code"}
                    name={"email-code"}
                    placeholder={"Enter verification code"}
                    onChangeHandler={(e) => setEmailCodeInput(e.target.value)}
                  />
                  <div className="mt-2 w-full flex justify-end">
                    <button
                      onClick={() => setEmailButtonCount(emailButtonCount + 1)}
                      className="mt-3 text-sm font-medium px-5 py-2 text-white rounded-xl bg-ocean-blue hover:bg-opacity-80"
                    >
                      Change
                    </button>
                  </div>
                </>
              )}
              {emailVerificationSuccess && (
                <span className="mt-2 text-sm text-success">
                  Successfully changed your email address
                </span>
              )}
            </div>
            {/* phone number */}
            <div className="grid grid-cols-1">
              <FormControl
                label="Change Phone Number"
                type="text"
                id="change-phone-number"
                name="change-phone-number"
                disabled={phonenumberCodeSent || phonenumberVerificationSuccess}
                placeholder="Enter new phone number"
                onChangeHandler={(e) => setPhonenumber(e.target.value)}
              />
              {phonenumberCodeSent && (
                <>
                  <span className="my-2 text-sm text-success">
                    A verification code has been sent to your phone number
                  </span>
                  <FormControl
                    type={"text"}
                    id={"phone-number-code"}
                    name={"phone-number-code"}
                    placeholder={"Enter verification code"}
                    onChangeHandler={(e) =>
                      setPhonenumberCodeInput(e.target.value)
                    }
                  />
                  <div className="mt-2 w-full flex justify-end">
                    <button
                      onClick={() =>
                        setPhonenumberButtonCount(emailButtonCount + 1)
                      }
                      className="mt-3 text-sm font-medium px-5 py-2 text-white rounded-xl bg-ocean-blue hover:bg-opacity-80"
                    >
                      Change
                    </button>
                  </div>
                </>
              )}
              {phonenumberVerificationSuccess && (
                <span className="mt-2 text-sm text-success">
                  Successfully changed your phone number
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-8">
              <FormControl
                label={"Current Password"}
                type={"password"}
                id={"current-password"}
                name={"current-password"}
                placeholder={"Enter current password"}
              />
              <FormControl
                label={"New Password"}
                type={"password"}
                id={"new-password"}
                name={"new-password"}
                placeholder={"Enter new password"}
              />
              <FormControl
                label={"Confirm New Password"}
                type={"password"}
                id={"confirm-new-password"}
                name={"confirm-new-password"}
                placeholder={"Enter new password again"}
              />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default ProfileSetting;

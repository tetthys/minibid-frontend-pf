import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useHelper from "../../hooks/useHelper";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import useWebSocketValidation from "../../hooks/useWebSocketValidation";
import FormControl from "../../components/FormControl/A/FormControl";
import Footer from "../../components/Layout/Footer";
import SearchBar from "../../components/Layout/SearchBar";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import useWebSocket from "../../hooks/useWebSocket";
import { useSignInMutation } from "../../redux/api/authApi";

const SignIn = () => {
  const { navigate } = useHelper();

  const [signIn] = useSignInMutation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { wsCli } = useWebSocket({
    url: "/live_validation?middleware=authSignIn",
    allowGuest: true,
  });

  const [validationError, setValidationError] = useState();

  useWebSocketEvent(
    wsCli,
    () => {},
    (data) => {
      if (data.type === "server.send:validation.error") {
        setValidationError(data.data);
      }
      if (data.type === "server.send:validation.success") {
        setValidationError();
      }
    },
    "SignIn.jsx"
  );

  useWebSocketValidation(
    {
      type: "client.send:data",
      data: {
        email: email,
        password: password,
      },
    },
    {
      wsCli: wsCli,
      dependencies: [email, password],
    }
  );

  const signInHandler = () => {
    signIn({
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        console.log("signInHandler : data", data);
        localStorage.setItem("user", JSON.stringify(data.user));
        Cookies.set("access_token", data.access_token, {
          expires: 7,
          path: "/",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log("signInHandler : err", err);
        setValidationError(err.error.data);
      });
  };

  return (
    <BaseContainer>
      <SearchBar />
      <Navigation />
      <div className="mt-20 flex justify-center">
        <div className="px-14 py-28 w-full max-w-lg rounded-xl bg-white">
          <h1 className="mb-16 text-3xl font-semibold text-black text-center">
            Welcome to miniBid
          </h1>
          <div className="grid grid-cols-1 gap-y-5">
            <FormControl
              label={"Email Address"}
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              onChangeHandler={(e) => setEmail(e.target.value)}
              error={validationError}
              errorLabel={"email"}
            />
            <FormControl
              label={"Password"}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChangeHandler={(e) => setPassword(e.target.value)}
              error={validationError}
              errorLabel={"password"}
            />
          </div>
          <div className="mt-16 flex flex-col">
            <button
              onClick={signInHandler}
              className="py-2.5 px-5 bg-ocean-blue text-white text-base font-medium rounded-xl w-fit"
            >
              Sign In
            </button>
            <Link
              to={"/register"}
              className="mt-5 text-xs font-medium text-black hover:underline"
            >
              Are you new to here?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </BaseContainer>
  );
};

export default SignIn;

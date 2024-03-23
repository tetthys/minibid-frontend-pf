import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHelper from "../../hooks/useHelper";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import FormControl from "../../components/FormControl/A/FormControl";
import useWebSocketValidation from "../../hooks/useWebSocketValidation";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import SearchBar from "../../components/Layout/SearchBar";
import FormControlWrapper from "../../components/FormControl/A/custom/FormControlWrapper";
import Select from "../../components/FormControl/A/custom/Select";
import Label from "../../components/FormControl/A/custom/Label";
import useWebSocket from "../../hooks/useWebSocket";
import { useRegisterMutation } from "../../redux/api/authApi";

const Register = () => {
  const { navigate } = useHelper();

  const [email, setEmail] = useState();
  const [emailCode, setEmailCode] = useState();
  const [username, setUsername] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberCode, setPhoneNumberCode] = useState();
  const [currency, setCurrency] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();

  const [validationError, setValidationError] = useState();

  const [currenciesOriginal, setCurrenciesOriginal] = useState([]);

  const { wsCli: wsCliForData } = useWebSocket({
    url: `/data_interface?currencies=true`,
    allowGuest: true,
  });

  useWebSocketEvent(
    wsCliForData,
    () => {},
    (data) => {
      if (data.type === "server.send:currencies") {
        setCurrenciesOriginal((prev) => [...prev, ...data.data]);
      }
    },
    "Register.jsx"
  );

  useEffect(() => {
    console.log(currenciesOriginal);
  }, [currenciesOriginal]);

  const { wsCli: wsCliForValidation } = useWebSocket({
    url: "/live_validation?middleware=authRegister",
    allowGuest: true,
  });

  useWebSocketEvent(
    wsCliForValidation,
    () => {},
    (data) => {
      if (data.type === "server.send:validation.error") {
        setValidationError(data.data);
      }
      if (data.type === "server.send:validation.success") {
        setValidationError();
      }
    },
    "Regiser.jsx"
  );

  const [register] = useRegisterMutation();

  useWebSocketValidation(
    {
      type: "client.send:data",
      data: {
        email: email,
        email_code: emailCode,
        username: username,
        phone_number: phoneNumber,
        phone_number_code: phoneNumberCode,
        date_of_birth: dateOfBirth,
        currency: currency,
        password: password,
        confirm_password: confirmPassword,
      },
    },
    {
      wsCli: wsCliForValidation,
      dependencies: [
        email,
        emailCode,
        username,
        phoneNumber,
        phoneNumberCode,
        currency,
        password,
        confirmPassword,
        dateOfBirth,
      ],
    }
  );

  const registerHandler = () => {
    register({
      email: email,
      email_code: emailCode,
      username: username,
      phone_number: phoneNumber,
      phone_number_code: phoneNumberCode,
      date_of_birth: dateOfBirth,
      currency: currency,
      password: password,
      confirm_password: confirmPassword,
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        console.log("registerHandler : data", data);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log("registerHandler : err", err);
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
          <div className="grid grid-cols-1 gap-y-16">
            <div className="grid grid-cols-1 gap-y-5">
              <FormControl
                label="Email"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChangeHandler={(e) => {
                  setEmail(e.target.value);
                }}
                error={validationError}
                errorLabel={"email"}
              />
              <FormControl
                label="Email Verification Code"
                type="text"
                id="email-code"
                name="email-code"
                placeholder="Email Code"
                onChangeHandler={(e) => {
                  setEmailCode(e.target.value);
                }}
                error={validationError}
                errorLabel={"emailCode"}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-5">
              <FormControl
                label="Phone Number"
                type="text"
                id="phone-number"
                name="phone-number"
                placeholder="Phone Number"
                onChangeHandler={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                error={validationError}
                errorLabel={"phoneNumber"}
              />
              <FormControl
                label="Phone Number Verification Code"
                type="text"
                id="phone-number-code"
                name="phone-number-code"
                placeholder="Phone Number Code"
                onChangeHandler={(e) => {
                  setPhoneNumberCode(e.target.value);
                }}
                error={validationError}
                errorLabel={"phoneNumberCode"}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-5">
              <FormControl
                label="Username"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChangeHandler={(e) => {
                  setUsername(e.target.value);
                }}
                error={validationError}
                errorLabel={"username"}
              />
              <FormControlWrapper>
                <Label>Currency</Label>
                <Select
                  onChangeHandler={(e) => {
                    setCurrency(e.target.value);
                  }}
                  error={validationError}
                  errorLabel={"currency"}
                >
                  <option disabled selected>
                    Select a currency
                  </option>
                  {currenciesOriginal.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Select>
              </FormControlWrapper>
              <FormControl
                label="Date of Birth"
                type="date"
                id="date-of-birth"
                name="date-of-birth"
                placeholder="Date of Birth"
                onChangeHandler={(e) => {
                  setDateOfBirth(e.target.value);
                }}
                error={validationError}
                errorLabel={"dateOfBirth"}
              />
              <FormControl
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChangeHandler={(e) => {
                  setPassword(e.target.value);
                }}
                error={validationError}
                errorLabel={"password"}
              />
              <FormControl
                label="Confirm Password"
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                onChangeHandler={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                error={validationError}
                errorLabel={"confirmPassword"}
              />
            </div>
          </div>
          <div className="mt-16 flex flex-col">
            <button
              onClick={registerHandler}
              className="py-2.5 px-5 bg-ocean-blue text-white text-base font-medium rounded-xl w-fit"
            >
              Register
            </button>
            <Link
              to={"/sign-in"}
              className="mt-5 text-xs font-medium text-black hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </BaseContainer>
  );
};

export default Register;

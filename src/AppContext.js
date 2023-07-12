import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const user = { firstName, lastName, email, token };
  const [userInfo, setUserInfo] = useState(user || {});
  const [flag, setFlag] = useState(false);
  const [walletAmount, setWalletAmount] = useState("0");

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const user = { firstName, lastName, email, token };
    setUserInfo(user || {});
  }, []);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        walletAmount,
        setWalletAmount,
        flag,
        setFlag,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const AppState = () => {
  return useContext(AppContext);
};

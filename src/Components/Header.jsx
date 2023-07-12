import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppState } from "../AppContext";
import { getFullName } from "../utils/validate";

const Header = () => {
  const {
    userInfo,
    setUserInfo,
    walletAmount,
    setWalletAmount,
    flag,
    setFlag,
  } = AppState();

  const logout = () => {
    setWalletAmount(0);
    localStorage.clear();
    setUserInfo({});
    setFlag(!flag);
  };

  //   useEffect(() => {
  //     setUserInfo();
  //   }, [userInfo]);
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-2xl font-bold text-slate-800">Logo</div>
      <div className="flex items-center gap-8">
        <span className="text-sm md:text-lg font-bold">
          Wallet: <span className="text-red-500">{walletAmount}</span>
        </span>
        {Object.keys(userInfo).length > 0 ? (
          <div className="flex items-center gap-2 md:gap-5">
            <span className="hidden md:block text-sm md:text-md">
              {getFullName(userInfo)}
            </span>
            <button
              onClick={logout}
              className=" bg-white text-slate-800
         px-2 py-1 md:px-3 md:py-1  font-bold text-sm md:text-md  border-2
          border-solid border-slate-800 rounded-xl">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button
                className="bg-slate-800 text-white px-3 py-1  
        font-bold text-md  border-2 border-solid border-slate-800 rounded-xl">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                className="hidden md:block bg-white text-slate-800
         px-3 py-1  font-bold text-md  border-2
          border-solid border-slate-800 rounded-xl">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

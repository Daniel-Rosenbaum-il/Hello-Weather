import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserMsg } from "../store/actions/weather.actions";

export const Footer = () => {
  const { userMsg } = useSelector((state) => state.weatherModule);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userMsg.length > 0) {
      setTimeout(() => {
        dispatch(setUserMsg(""));
      }, 5000);
    }
  }, [userMsg]);

  return (
    <footer>
      <div className="main-footer container flex justify-center align-center">
        <p>Made by Daniel Rosenbaum ©</p>
      </div>
      {userMsg && (
        <div className="user-msg">
          <p>{userMsg}</p>
        </div>
      )}
    </footer>
  );
};

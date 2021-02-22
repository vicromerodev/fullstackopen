import React from "react";

export default function Notification({ message, error }) {
  if (message === null) {
    return null;
  }

  return <div className={error ? "error" : "succeed"}>{message}</div>;
}

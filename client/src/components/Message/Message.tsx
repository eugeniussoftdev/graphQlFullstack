import React from "react";

import "./Message.css";

interface MessageProps {
  text: string;
}

export const Message = ({ text }: MessageProps) => {
  return <div className="message">{text}</div>;
};

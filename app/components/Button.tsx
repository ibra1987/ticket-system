import { ButtonProps } from "@/types";
import React from "react";

function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      onClick={props.handler}
      className={props.cssClass}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default Button;

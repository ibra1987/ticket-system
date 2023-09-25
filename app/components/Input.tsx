"use client"
import { ChangeEvent } from "react"

type InputProps = {
    containerClass:string,
    label?:{
        class:string,
        text:string,
    },
    value:string,
    placeholder:string,
    inputType:string,
    class:string,
    name?:string,
    checked?:boolean,
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void
    
}

function Input(props:InputProps) {
  
  return (
    <div className={props.containerClass}>
        {props.label && <label className={props.label.class}>{props.label.text}</label>}
        <input
      
        type={props.inputType}
        name={props.name} 
        checked={props.checked}
        className={props.class} 
        value={props.value}
        placeholder={props.placeholder} 
        onChange={props.onChange}
        />
    </div>
  )
}

export default Input
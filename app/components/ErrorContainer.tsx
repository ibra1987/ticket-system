
function ErrorContainer({errorMessages}:{errorMessages:string[]}) {
  return (
    <div className="w-full px-6 text-red-500 text-xs">
      {errorMessages && errorMessages.map((msg:string,index:number)=>(
        <ul key={`${msg}-${index}`}>
            <li>
                - {msg}
            </li>
        </ul>
      ))}
    </div>
  )
}

export default ErrorContainer
export function toMoneyStr(value="0.00",{type="$",after=false,tofixed=2}={}){

  const text=(value!==null)?value.toFixed(tofixed).toString():[0].toFixed(tofixed).toString()

  return `${after?"":`${type} `}${text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${after?` ${type}`:""}`
}

export function toPercentage(value=""){
  const text=value==="string"?value:value.toString()

  return `${text}%`
}
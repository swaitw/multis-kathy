export const onClickCopy=(copyVaule)=>{
  // console.log(copyVaule)
  const input = document.createElement('input')
  input.setAttribute('value',copyVaule)
  input.style.cssText="position: absolute;bottom: 10px;color: #ffffff00;background: #ffffff00;border: 0px;left: -120%;"
  document.body.appendChild(input)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(input)
    return true
  }
  return false
}


export function html2Escape(sHtml) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = sHtml) : (temp.innerText = sHtml);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

export function escape2Html(str) {
    var temp = document.createElement("div");
    temp.innerHTML = str;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

import moment from 'moment'


export function formatedName(fullName){
  // console.log(fullName,'fullName')
  if(fullName && typeof fullName === 'string' && fullName.length>0){
    const nameArray = fullName.split(" ")
    const first = nameArray.shift()
    const last = nameArray.pop()
    const middle = nameArray.length>0?nameArray[0]:""
    return{
      first,
      last,
      middle
    }
  }
  return {}
}

export function getFullName(name){
  // console.log(name,'name object')
  if(!name){
    return ""
  }
  const nameArray=[]
  if(typeof name === "array"){
    nameArray.splice(0,3,...name)
  }
  if(typeof name === 'object'){
    const { first, middle, last } = name || {}
    if(first){
      nameArray.push(first)
    }
    if(middle){
      nameArray.push(middle)
    }
    if(last){
      nameArray.push(last)
    }
  }
  return nameArray.join(" ")
}

export function titleToGender(title){
  if(!title||typeof title !=="string"){
    return "unknown"
  }
  const titleStr = title.toLowerCase(title.replace(/\s|\./g,""))
  switch(titleStr){
    case "mr":
    case "sir":
      return "male"
    case "ms":
    case "miss":
    case "mrs":
    case "madam":
      return "femal"
    default :
      return "unknown"
  }
}

export function getNameInitial(name){
  // console.log(name,'name')
  let initialText="U"
  let nameObj=name
  if(!name){
    return "U"
  }
  if(typeof name === 'string'){
    nameObj = formatedName(name)
  }
  const {first="",last=""} = nameObj||{}
  initialText=`${first.slice(0,1)} ${last.slice(0,1)}`

  return initialText.toUpperCase()
}

export function getAge(dob){
  
  if(dob){
    let years 
    let months
    let days
    const birthYear = moment(dob).year()
    const currentYear = moment().year()
    const birthMonth = moment(dob).month()
    const currentMonth = moment().month()
    const birthDay = moment(dob).date()
    const currentDay = moment().date()
    years = parseInt(currentYear)-parseInt(birthYear)
    if(currentMonth>=birthMonth){
      months = parseInt(currentMonth)-parseInt(birthMonth)
    }else{
      months = 12+parseInt(currentMonth) - parseInt(birthMonth)
    }
    if(currentDay>=birthDay){
      days = parseInt(currentDay)-parseInt(birthDay)
    }else{
      days = parseInt(moment(dob).daysInMonth())-parseInt(birthDay)+parseInt(currentDay)
    }

    return {
      years,
      days,
      months
    }
    
  
  }
  return{

  }
}



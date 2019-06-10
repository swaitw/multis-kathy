function getMonthlyPay({p=0,R,N,r=parseFloat(R/12),n=N*12},interestOnly=false,decimal=0){
  if(!p||(!r&&!R )||(!n||!N)){
    return 0
  }
  const term = n?n:N*12
  const monthlyPay = interestOnly?p*r:p*(r*((1+r)**n)/((1+r)**n-1))
  return monthlyPay.toFixed(decimal)
}

function geNetIncome({amount=1323,f='Month',accRate=0.014,decimal=0}){
  let yearlyIncome
  switch (f) {
    case 'week':
    case 'Week':
      yearlyIncome = amount*52
      break;
    case 'Month':
    case 'month':
      yearlyIncome = amount*12
      break;
    default:
      yearlyIncome = amount*12
      break;
  }
  const rates=[
    {
      range:[0,14000],
      rate:0.105
    },
    {
      range:[14000,48000],
      rate:0.175
    },
    {
      range:[48000,70000],
      rate:0.3
    },
    {
      range:[70000],
      rate:0.33
    },
  ]

  let yearlyNetIncome=0
  rates.forEach((items)=>{
    const {range,rate } = items
    let taxedAmount
    if(yearlyIncome>range[0]){
      taxedAmount= (!range[1] || yearlyIncome<=range[1])?(yearlyIncome-range[0]):(range[1]-range[0])
      // console.log(taxedAmount,'taxedAmount')
      yearlyNetIncome +=taxedAmount*(1-rate)
    }
  })

  const acc = yearlyIncome*accRate
  yearlyNetIncome = (yearlyNetIncome-acc).toFixed(decimal)
  const monthlyNetIncome =(yearlyNetIncome/12).toFixed(decimal)
  const weeklyNetIncome = (yearlyNetIncome/52).toFixed(decimal)
  // console.log(monthlyNetIncome)
  return{
    yearlyNetIncome,
    monthlyNetIncome,
    weeklyNetIncome
  }
}

export{
  getMonthlyPay,
  geNetIncome
}

export function getFrequencyPay({amount,f="Month",F}){
  const income ={
  }
  switch (f) {
    case 'week':
    case 'Week':
      income.year = amount*52
      income.week =amount
      income.month=(amount*52/12).toFixed()
      break;
    case 'Month':
    case 'month':
      income.year = amount*12
      income.week =(amount*12/52).toFixed()
      income.month=amount
      break;
    case 'Fortnight':
    case 'fortnight':
      income.year = amount*26
      income.week =(amount/2).toFixed()
      income.month=(amount*26/12).toFixed()
      break;
    default:
      income.year = amount
      income.week =(amount/52).toFixed()
      income.month=(amount/12).toFixed()
      break;
  }
  if(F){
    return income[F]
  }
  return income
}

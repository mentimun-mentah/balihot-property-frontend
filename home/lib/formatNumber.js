const formatNumber = number => { 
  let realNum = new Intl.NumberFormat(['ban', 'id']).format(number)
  if(realNum.split(',').length == 2){
    let finalNum = realNum.split(',')[0].replace(/\./g, ',') + '.' + realNum.split(',')[1]
    return finalNum
  } else {
    let finalNum = realNum.replace(/\./g, ',')
    return finalNum
  }
}

export default formatNumber

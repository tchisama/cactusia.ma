export const getPriceByQuantity = ( quantity: number) => {
  const price = 65;
  if(quantity <= 3) {
    return price * quantity
  }else if(quantity == 4){
    return 250
  }else if(quantity > 4){
    return  250 + (quantity - 4) * 50
  }
}

export const getPriceWithDelivery = (quantity: number) => {
  if(quantity < 3){
    return getPriceByQuantity(quantity) as number + 35
  }else{
    return getPriceByQuantity(quantity)
  }
}
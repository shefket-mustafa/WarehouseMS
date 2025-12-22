export const statusReturner = (qty: string | number): string => {
    const quantity = Number(qty);

    if(quantity <= 0){
      return "Out of Stock"
    } else if(quantity > 0 && quantity <= 50){
      return "Low Stock"
    } else {
      return "In Stock"
    }
  }
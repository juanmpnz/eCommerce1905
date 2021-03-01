import axios from 'axios'

export const getRate = (rates) => {
  if (rates.length === 0) return 'no rates yet'
  let sum = 0;
  rates.forEach((e) => {
    sum += e.content;
  });
  return (sum / rates.length).toFixed(2);
};

/*
PARA EL FRONT (para setear la URL a la que se hace el PUT o el DELETE)

const {currentCart} = this.porps
const {selectedProduct} = this.porps
isInCart(currentCart, selectedProduct.id)

const isInCart = (cart, productId) => {
    if (cart.orders[0]) {
        const order = cart.orders.filter(o => o.productId === productId)[0]
        return order ? order.id : false
    } else {
        return false
    }
}
*/

export const getTransactions = (orders) => {
  let total = 0
  const transactions = orders.map(o => {
    const subtotal = (o.units * o.product.price * (1 - o.product.off/100)).toFixed(2)
    total += subtotal 
    return { 
      id: o.id,
      productId: o.product.id,
      stock: o.product.stock - o.units,
      subtotal 
    }
  })
  return {transactions, total}
} 

export const submitCart = (cartId, orders,user) => axios.put(`/api/carts/${cartId}`,getTransactions(orders),user)

export const getStock = (stock, units) => ({
  available: stock >= units, 
  stock: stock >= units ? units : stock })
  
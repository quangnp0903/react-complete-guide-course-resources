import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const existingItem = state.items.find((item) => item.id === action.item.id);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { ...action.item, quantity: 1 }],
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingItem = state.items.find((item) => item.id === action.id);

    if (existingItem.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== existingItem.id),
      };
    }
    return {
      ...state,
      items: state.items.map((item) =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatchCartAction({ type: 'ADD_ITEM', item });

  const removeItem = (id) => dispatchCartAction({ type: 'REMOVE_ITEM', id });

  const clearCart = () => dispatchCartAction({ type: 'CLEAR_CART' });

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartContextValue);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

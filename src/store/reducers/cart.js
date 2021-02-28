import { handleActions } from 'redux-actions';
import { ADDINTOCART, REMOVEFROMCART } from '../types/cart';
import { removeFromArray, indexOfArray } from '../../utils/tools';

export default handleActions(
  {
    [ADDINTOCART](state, action) {
      const indexOf = indexOfArray(
        state.cartItems,
        (x) =>
          x.commodity.id === action.payload.cartItem.commodity.id &&
          x.sku._id === action.payload.cartItem.sku._id
      );
      if (indexOf >= 0) {
        state.cartItems[indexOf].count = action.payload.cartItem.count;
        state.cartItems[indexOf].checked = action.payload.cartItem.checked;
        return {
          ...state,
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload.cartItem],
      };
    },
    [REMOVEFROMCART](state, action) {
      return {
        ...state,
        cartItems: removeFromArray(state.cartItems, (cartItem) => {
          return (
            cartItem.commodity.id === action.payload.cartItem.commodity.id &&
            cartItem.sku._id === action.payload.cartItem.sku._id
          );
        }),
      };
    },
  },
  {
    cartItems: [],
  }
);
/*
{
    commodity:{},
    sku:{},
    count:12
}
*/



const initialState ={
    loading: false,
    cartItems: []
};

export const rootReducer =(state=initialState,action)=>{
    switch (action.type) {
      case "ADD_TO_CART": 
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
      case "UPDATE":
        return {
          ...state,
          cartItems : state.cartItems.map(item => item._id === action.payload._id ? 
            {...item, quantity: action.payload.quantity} : item)
        }
      case "DECREMENT":
        return {
        ...state,
        cartItems: state.cartItems.map(item => item._id === action.payload._id ?
           {...item, quantity: action.payload.quantity} : item)
        }
      case "DELETE_FROM_CART":
        return{
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item._id !== action.payload._id ),
        }
      default: 
         return state;
    }
}
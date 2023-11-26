import { createStore , combineReducers , applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import {deleteProductReducer, editProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer} from "../reducers/productReducer";
import { userReducer , profileReducer  , resetPasswordReducer, allUserReducer, userDeleteReducer } from "../reducers/userReducer";
import {cartReducer} from '../reducers/cartReducer'
import {allOrdersReducer, myOrdersReducer, newOrderReducer, orderReducer} from '../reducers/orderReducer'
import { adminDashboardReducer, systemReducer } from "../reducers/systemReducer";
import { reportReducer } from "../reducers/reportReducer";

// import { JSON } from "react-router-dom";



const reducer = combineReducers({
    products : productReducer,
    prductDetails : productDetailsReducer,
    user : userReducer,
    profile:profileReducer,
    forgotPassword : resetPasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    newReview : newReviewReducer,
    systemSetting : systemReducer,
    newProduct : newProductReducer,
    deleteProduct : deleteProductReducer,
    editProduct : editProductReducer,
    allOrders : allOrdersReducer,
    order : orderReducer,
    adminDashboard : adminDashboardReducer,
    allUsers : allUserReducer,
    deleteUser : userDeleteReducer,
    report : reportReducer
});

let initialState ={
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo : localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')) : []
    },

};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default  store;
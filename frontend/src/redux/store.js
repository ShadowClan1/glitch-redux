import productsReducer from "./slices/products";
import popupReducer from "./slices/popup";
import userReducer from "./slices/user";
import chatScreenReducer from "./slices/chatscreen";
import messagesReducer from "./slices/messages";
import groupReducer from "./slices/group";




const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer : {
product : productsReducer,
popup : popupReducer,
user : userReducer,
chatScreen : chatScreenReducer,
messages : messagesReducer,
group : groupReducer
    }
    
})

export default store;
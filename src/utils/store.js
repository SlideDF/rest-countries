import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../features/Home/Home'
import themeReducer from '../features/Theme/Theme'
import infoReducer from '../features/Info/Info'

export default configureStore({
    reducer: {
        home: homeReducer,
        theme: themeReducer,
        info: infoReducer,
    }
})
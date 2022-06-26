import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { heliumApi } from "../services/heliumApi";
import { heliumApiTransactions } from "../services/heliumApiTransactions";


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [heliumApi.reducerPath]: heliumApi.reducer,
        [heliumApiTransactions.reducerPath]: heliumApiTransactions.reducer,
    },
});
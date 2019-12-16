import React from "react";
import { Provider } from "react-redux";

import store from "./redux/store";

import Clock from "./clock";
import Menu from "./menu";
import Board from "./board";

export default function App() {
    return (
        <div className="app" data-testid="app">
            <Provider store={store}>
                <Clock />
                <Menu />
                <Board />
            </Provider>
        </div>
    );
}

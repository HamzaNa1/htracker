import { Dispatch, SetStateAction, createContext } from "react";

type MyContext = {
	token: string;
	setToken: Dispatch<SetStateAction<string>>;
	gameId: string;
	setGameId: Dispatch<SetStateAction<string>>;
	black: boolean;
	setBlack: Dispatch<SetStateAction<boolean>>;
};

const value: MyContext = {
	token: "",
	setToken: undefined!,
	gameId: "",
	setGameId: undefined!,
	black: false,
	setBlack: undefined!,
};

export const MainContext = createContext(value);

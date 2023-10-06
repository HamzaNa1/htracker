import { Dispatch, SetStateAction, createContext } from "react";

type MyContext = {
	token: string;
	setToken: Dispatch<SetStateAction<string>>;
	note: Note | null;
	setNote: Dispatch<SetStateAction<Note | null>>;
	black: boolean;
	setBlack: Dispatch<SetStateAction<boolean>>;
};

const value: MyContext = {
	token: "",
	setToken: undefined!,
	note: undefined!,
	setNote: undefined!,
	black: false,
	setBlack: undefined!,
};

export const MainContext = createContext(value);

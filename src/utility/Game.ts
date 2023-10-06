type NotesGame = {
	_id: string;
	Game: Game;
	Notes: string;
};

type Game = {
	Date: string;
	Agent: string;
	Map: string;
	Result: GameResult;
	RoundsWon: number;
	RoundsLost: number;
	Kills: number;
	Deaths: number;
	Assists: number;
	DD: number;
	Headshot: number;
	ADR: number;
};

type GameResult = "W" | "L" | "D";

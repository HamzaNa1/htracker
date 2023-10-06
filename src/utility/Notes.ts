type Note = {
	_id: string;
	Game: Game;
	Text: string;
};

type Game = {
	Date: string;
	AddedTimestamp: number;
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
	RR: number;
	Rank: string;
};

type GameResult = "W" | "L" | "D";

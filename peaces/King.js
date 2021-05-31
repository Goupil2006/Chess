class King extends piece {
	constructor(x, y, color, img) {
		super(x, y, color, img);
		this.name = "K";
	}

	posmoves(x, y, Feld, color) {
		let moves = [];

		moves.push([y, x + 1]);
		moves.push([y, x - 1]);
		moves.push([y + 1, x]);
		moves.push([y - 1, x]);
		moves.push([y + 1, x + 1]);
		moves.push([y - 1, x + 1]);
		moves.push([y + 1, x - 1]);
		moves.push([y - 1, x - 1]);

		moves = moves.filter(function (value) {
			if (Feld[value[0]]) {
				if (Feld[value[0]][value[1]] != undefined) {
					if (Feld[value[0]][value[1]].color != color || Feld[value[0]][value[1]] == "") {
						return true;
					}
				}
			}
			return false;
		});

		if (this.movesdone == 0) {
			if (Feld[y][x + 3] != undefined) {
				if (Feld[y][x + 3].movesdone == 0) {
					if (Feld[y][x + 2] == "" && Feld[y][x + 1] == "") {
						if (this.isallowed(1, Feld, x, y, color)) {
							console.log("test");
							moves.push([y, x + 2, y, x + 3, y, x + 1]);
						}
					}
				}
			}
		}

		if (this.movesdone == 0) {
			if (Feld[y][x - 4] != undefined) {
				if (Feld[y][x - 4].movesdone == 0) {
					if (Feld[y][x - 2] == "" && Feld[y][x - 1] == "" && Feld[y][x - 3] == "") {
						if (this.isallowed(2, Feld, x, y, color)) {
							console.log("test");
							moves.push([y, x - 2, y, x - 4, y, x - 1]);
						}
					}
				}
			}
		}

		console.log(moves);

		return moves;
	}

	isallowed(a, Feld, x, y, color) {
		if (a == 1) {
			let testFeld = this.dotestFeld(Feld);
			console.log(testFeld);
			testFeld[y][x + 2] = new King(x + 2, y, color, "");
			testFeld[y][x + 1] = new King(x + 1, y, color, "");
			return this.ischeck(testFeld, color);
		}
		if (a == 2) {
			let testFeld = this.dotestFeld(Feld);
			testFeld[y][x - 2] = new King(x - 2, y, color, "");
			testFeld[y][x - 1] = new King(x - 1, y, color, "");
			return this.ischeck(testFeld, color);
		}
	}

	ischeck(Feld, color) {
		let movescheck = [];

		Feld.forEach((rank) => {
			rank.forEach((peace) => {
				if (peace != "") {
					if (peace.color != color) {
						let Tempmoves = peace.moves(Feld);
						Tempmoves.forEach((Move) => {
							movescheck.push(Move);
						});
					}
				}
			});
		});

		let Tempiiii = true;

		movescheck.forEach((move) => {
			if (Feld[move[0]]) {
				if (Feld[move[0]][move[1]]) {
					if (Feld[move[0]][move[1]].name === "K") {
						Tempiiii = false;
					}
				}
			}
		});

		return Tempiiii;
	}

	dotestFeld(Feld) {
		let testFeld = JSON.parse(JSON.stringify(Feld));

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (testFeld[i][j] != "") {
					if (testFeld[i][j].name == "K") {
						testFeld[i][j] = new King(j, i, testFeld[i][j].color);
					} else if (testFeld[i][j].name == "T") {
						testFeld[i][j] = new Rook(j, i, testFeld[i][j].color);
					} else if (testFeld[i][j].name == "L") {
						testFeld[i][j] = new Bichop(j, i, testFeld[i][j].color);
					} else if (testFeld[i][j].name == "S") {
						testFeld[i][j] = new Knight(j, i, testFeld[i][j].color);
					} else if (testFeld[i][j].name == "Q") {
						testFeld[i][j] = new Queen(j, i, testFeld[i][j].color);
					} else if (testFeld[i][j].name == "B") {
						testFeld[i][j] = new Pawn(j, i, testFeld[i][j].color);
					}
				}
			}
		}

		return testFeld;
	}
}

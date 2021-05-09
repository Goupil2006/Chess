"use strict";

class Board {
	constructor() {
		this.state = 1;
		this.Tempispin = false;
		this.move = "";
		this.Feld = [];
		this.testFeld = [];
		this.allowed = "W";
		for (let i = 0; i < 8; i++) {
			let rank = [];
			for (let j = 0; j < 8; j++) {
				rank.push("");
			}
			this.Feld.push(rank);
		}
		this.Feld[5][5] = new Rook(5, 5, "W");
		this.Feld[0][0] = new King(0, 0, "W");
		this.Feld[4][5] = new Rook(5, 4, "B");
		this.Feld[4][0] = new King(0, 4, "B");
		console.log(this.Feld);
		this.startrender();
		this.render();

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				document.getElementById(String(i) + String(j)).addEventListener("click", () => {
					if (this.state === 1) {
						if (document.getElementById(String(i) + String(j)).innerHTML != "") {
							this.move += String(i) + String(j);
							console.log(this.move);
							this.state++;
						}
					} else if (this.state === 2) {
						this.move += String(i) + String(j);
						console.log(this.move);
						this.state++;
						this.movemove();
					}
				});
			}
		}
	}

	dotestFeld() {
		this.testFeld = JSON.parse(JSON.stringify(this.Feld));

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.testFeld[i][j] != "") {
					if (this.testFeld[i][j].name == "K") {
						this.testFeld[i][j] = new King(j, i, this.testFeld[i][j].color);
					} else if (this.testFeld[i][j].name == "T") {
						this.testFeld[i][j] = new Rook(j, i, this.testFeld[i][j].color);
					}
				}
			}
		}
	}

	movemove() {
		console.log("test");
		let Temp = this.move.split("");
		this.move = "";
		this.state = 1;
		let Temp1 = Number(Temp[0]);
		let Temp2 = Number(Temp[1]);
		let Temp3 = Number(Temp[2]);
		let Temp4 = Number(Temp[3]);

		if (this.Feld[Temp1][Temp2] != "" && this.allowed == this.Feld[Temp1][Temp2].color) {
			let Figur = this.Feld[Temp1][Temp2];
			let moves = Figur.moves(this.Feld);
			let Temp5 = false;
			moves.forEach((move) => {
				if (move[0] == Temp3 && move[1] == Temp4) {
					Temp5 = true;
				}
			});

			if (Temp5) {
				//assigning Feld to testFeld without linking for pincheck

				this.dotestFeld();

				let Figurtest = this.testFeld[Temp1][Temp2];
				Figurtest.change(Temp4, Temp3);
				this.testFeld[Temp1][Temp2] = "";
				this.testFeld[Temp3][Temp4] = Figurtest;

				console.log(this.testFeld);

				let movescheck = [];

				this.testFeld.forEach((rank) => {
					rank.forEach((peace) => {
						if (peace != "") {
							if (peace.color != this.allowed) {
								let Tempmoves = peace.moves(this.testFeld);
								Tempmoves.forEach((Move) => {
									movescheck.push(Move);
								});
							}
						}
					});
				});

				this.Tempispin = false;
				console.log(this.Feld);
				console.log(movescheck);

				movescheck.forEach((move) => {
					if (this.testFeld[move[0]]) {
						if (this.testFeld[move[0]][move[1]]) {
							if (this.testFeld[move[0]][move[1]].name === "K") {
								this.Tempispin = true;
							}
						}
					}
				});

				if (!this.Tempispin) {
					Figur.change(Temp4, Temp3);
					this.Feld[Temp1][Temp2] = "";
					this.Feld[Temp3][Temp4] = Figur;
					if (this.allowed == "W") {
						this.allowed = "B";
					} else if (this.allowed == "B") {
						this.allowed = "W";
					}
					this.render();
				}

				//TODO: check if its checkmate

				this.dotestFeld();

				this.ischeckmate = false;
				let TempTempischeck = 0;
				let refTemp = 0;
				let allmoves = [];
				for (let i = 0; i < 8; i++) {
					for (let j = 0; j < 8; j++) {
						if (this.testFeld[i][j] != "") {
							if (this.testFeld[i][j].color == this.allowed) {
								let movess = this.testFeld[i][j].moves(this.testFeld);

								for (let x = 0; x < movess.length; x++) {
									if (this.testFeld[movess[x][0]]) {
										if (this.testFeld[movess[x][0]][movess[x][1]] !== undefined) {
											movess[x][2] = i;
											movess[x][3] = j;
											refTemp += 1;
											allmoves.push(movess[x]);
										}
									}
								}
							}
						}
					}
				}

				for (let z = 0; z < allmoves.length; z++) {
					this.dotestFeld();
					if (this.testFeld[allmoves[z][0]]) {
						if (this.testFeld[allmoves[z][0]][allmoves[z][1]] != undefined) {
							let Figur = this.testFeld[allmoves[z][2]][allmoves[z][3]];
							Figur.change(allmoves[z][1], allmoves[z][0]);
							this.testFeld[allmoves[z][2]][allmoves[z][3]] = "";
							this.testFeld[allmoves[z][0]][allmoves[z][1]] = Figur;

							let movescheck = [];

							this.testFeld.forEach((rank) => {
								rank.forEach((peace) => {
									if (peace != "") {
										if (peace.color != this.allowed) {
											let Tempmoves = peace.moves(this.testFeld);
											Tempmoves.forEach((Move) => {
												movescheck.push(Move);
											});
										}
									}
								});
							});

							movescheck.forEach((move) => {
								if (this.testFeld[move[0]]) {
									if (this.testFeld[move[0]][move[1]]) {
										if (this.testFeld[move[0]][move[1]].name === "K") {
											TempTempischeck++;
										}
									}
								}
							});
						}
					}
				}

				console.log(TempTempischeck);
				console.log(refTemp);

				if (TempTempischeck == refTemp) {
					this.ischeckmate = true;
				}
				if (this.ischeckmate) {
					console.log("checkmate");
				}
			}
		}
	}

	startrender() {
		let Board = document.createElement("table");
		for (let i = 0; i < 8; i++) {
			let rank = document.createElement("tr");
			for (let j = 0; j < 8; j++) {
				let Box = document.createElement("td");
				Box.setAttribute("id", String(i) + String(j));
				if ((i + j) % 2 != 0) {
					Box.setAttribute("class", "black");
				}
				rank.appendChild(Box);
			}
			Board.appendChild(rank);
		}
		document.body.appendChild(Board);
	}

	render() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.Feld[i][j].name != undefined) {
					if (this.Feld[i][j].color == "W") {
						document.getElementById(String(i) + String(j)).innerHTML = "<div class='light'>" + this.Feld[i][j].name + "</div>";
					} else if (this.Feld[i][j].color == "B") {
						document.getElementById(String(i) + String(j)).innerHTML = "<div class='dark'>" + this.Feld[i][j].name + "</div>";
					}
				} else {
					document.getElementById(String(i) + String(j)).innerHTML = "";
				}
			}
		}
	}
}

class piece {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	change(x, y) {
		this.x = x;
		this.y = y;
	}

	moves(Feld) {
		let moves = this.posmoves(this.x, this.y, Feld);
		return moves;
	}
}

class Rook extends piece {
	constructor(x, y, color) {
		super(x, y, color);
		this.name = "T";
	}

	posmoves(x, y, Feld) {
		let moves = [];
		for (let i = 1; i < 8; i++) {
			if (Feld[y]) {
				if (Feld[y][x + i]) {
					if (Feld[y][x + i].color != this.color) {
						moves.push([y, x + i]);
					}
					i = 10;
				} else {
					moves.push([y, x + i]);
				}
			}
		}
		for (let i = 1; i < 8; i++) {
			if (Feld[y]) {
				if (Feld[y][x - i]) {
					if (Feld[y][x - i].color != this.color) {
						moves.push([y, x - i]);
					}
					i = 10;
				} else {
					moves.push([y, x - i]);
				}
			}
		}
		for (let i = 1; i < 8; i++) {
			if (Feld[y + i]) {
				if (Feld[y + i][x]) {
					if (Feld[y + i][x].color != this.color) {
						moves.push([y + i, x]);
					}
					i = 10;
				} else {
					moves.push([y + i, x]);
				}
			}
		}
		for (let i = 1; i < 8; i++) {
			if (Feld[y - i]) {
				if (Feld[y - i][x]) {
					if (Feld[y - i][x].color != this.color) {
						moves.push([y - i, x]);
					}
					i = 10;
				} else {
					moves.push([y - i, x]);
				}
			}
		}

		return moves;
	}
}

class King extends piece {
	constructor(x, y, color) {
		super(x, y, color);
		this.name = "K";
	}

	posmoves(x, y, Feld) {
		let moves = [];
		moves.push([y, x + 1]);
		moves.push([y, x - 1]);
		moves.push([y + 1, x]);
		moves.push([y - 1, x]);
		moves.push([y + 1, x + 1]);
		moves.push([y - 1, x + 1]);
		moves.push([y + 1, x - 1]);
		moves.push([y - 1, x - 1]);

		moves.forEach((move, i) => {
			if (Feld[move[0]]) {
				if (Feld[move[0]][move[1]]) {
					if (Feld[move[0]][move[1]].color == this.color) {
						moves.splice(i, 1);
					}
				}
			}
		});

		return moves;
	}
}

let Game = new Board();

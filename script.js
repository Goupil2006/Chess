"use strict";

class Board {
	constructor() {
		this.state = 1;
		this.moves = [];
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
		this.constructFeld();

		this.startrender();
		this.render();
		this.draggedItem = null;

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (document.getElementById(String(i) + String(j) + "d")) {
					document.getElementById(String(i) + String(j) + "d").addEventListener("dragstart", () => {
						this.move = String(i) + String(j);
						setTimeout(function () {
							document.getElementById(String(i) + String(j) + "d").style.display = "none";
						}, 0);
					});

					document.getElementById(String(i) + String(j) + "d").addEventListener("dragend", () => {
						if (document.getElementById(String(i) + String(j) + "d")) {
							document.getElementById(String(i) + String(j) + "d").style.display = "block";
						}
						setTimeout(function () {
							this.move = "";
						}, 0);
					});
				}
				document.getElementById(String(i) + String(j)).addEventListener("click", () => {
					if (this.state === 1) {
						if (document.getElementById(String(i) + String(j)).innerHTML != "") {
							this.move += String(i) + String(j);
							this.state++;
						}
					} else if (this.state === 2) {
						this.move += String(i) + String(j);
						this.state++;
						this.movemove();
					}
				});

				document.getElementById(String(i) + String(j)).addEventListener("dragover", (e) => {
					e.preventDefault();
				});

				document.getElementById(String(i) + String(j)).addEventListener("dragenter", (e) => {
					e.preventDefault();
				});

				document.getElementById(String(i) + String(j)).addEventListener("drop", () => {
					console.log("drop");
					this.move += String(i) + String(j);
					console.log(this.move);
					this.movemove();
				});
			}
		}
	}

	constructFeld() {
		this.Feld[6][0] = new Pawn(0, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][1] = new Pawn(1, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][2] = new Pawn(2, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][3] = new Pawn(3, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][4] = new Pawn(4, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][5] = new Pawn(5, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][6] = new Pawn(6, 6, "W", "/img/Pawn_White.png");
		this.Feld[6][7] = new Pawn(7, 6, "W", "/img/Pawn_White.png");

		this.Feld[7][0] = new Rook(0, 7, "W", "/img/Rook_White.png");
		this.Feld[7][1] = new Knight(1, 7, "W", "/img/Knight_White.png");
		this.Feld[7][2] = new Bichop(2, 7, "W", "/img/Bishop_White.png");
		this.Feld[7][3] = new Queen(3, 7, "W", "/img/Queen_White.png");
		this.Feld[7][5] = new Bichop(5, 7, "W", "/img/Bishop_White.png");
		this.Feld[7][6] = new Knight(6, 7, "W", "/img/Knight_White.png");
		this.Feld[7][7] = new Rook(7, 7, "W", "/img/Rook_White.png");

		this.Feld[1][0] = new Pawn(0, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][1] = new Pawn(1, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][2] = new Pawn(2, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][3] = new Pawn(3, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][4] = new Pawn(4, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][5] = new Pawn(5, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][6] = new Pawn(6, 1, "B", "/img/Pawn_Black.png");
		this.Feld[1][7] = new Pawn(7, 1, "B", "/img/Pawn_Black.png");

		this.Feld[0][0] = new Rook(0, 0, "B", "/img/Rook_Black.png");
		this.Feld[0][1] = new Knight(1, 0, "B", "/img/Knight_Black.png");
		this.Feld[0][2] = new Bichop(2, 0, "B", "/img/Bishop_Black.png");
		this.Feld[0][3] = new Queen(3, 0, "B", "/img/Queen_Black.png");
		this.Feld[0][5] = new Bichop(5, 0, "B", "/img/Bishop_Black.png");
		this.Feld[0][6] = new Knight(6, 0, "B", "/img/Knight_Black.png");
		this.Feld[0][7] = new Rook(7, 0, "B", "/img/Rook_Black.png");

		this.Feld[7][4] = new King(4, 7, "W", "/img/King_White.png");
		this.Feld[0][4] = new King(4, 0, "B", "/img/King_Black.png");
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
					} else if (this.testFeld[i][j].name == "L") {
						this.testFeld[i][j] = new Bichop(j, i, this.testFeld[i][j].color);
					} else if (this.testFeld[i][j].name == "S") {
						this.testFeld[i][j] = new Knight(j, i, this.testFeld[i][j].color);
					} else if (this.testFeld[i][j].name == "Q") {
						this.testFeld[i][j] = new Queen(j, i, this.testFeld[i][j].color);
					} else if (this.testFeld[i][j].name == "B") {
						this.testFeld[i][j] = new Pawn(j, i, this.testFeld[i][j].color);
					}
				}
			}
		}
	}

	movemove() {
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
			let Tempmove5;
			moves.forEach((move, i) => {
				if (move[0] == Temp3 && move[1] == Temp4) {
					Temp5 = true;
					Tempmove5 = i;
				}
			});

			if (Temp5) {
				this.isPinned(Temp1, Temp2, Temp3, Temp4, Figur, moves, Temp5, Tempmove5);

				if (!this.Tempispin) {
					for (let i = 0; i < 8; i++) {
						for (let j = 0; j < 8; j++) {
							if (this.Feld[i][j] != "") {
								this.Feld[i][j].update();
							}
						}
					}
					Figur.change(Temp4, Temp3);
					this.Feld[Temp1][Temp2] = "";
					this.Feld[Temp3][Temp4] = Figur;
					if (moves[Tempmove5][2] != undefined) {
						this.Feld[moves[Tempmove5][2]][moves[Tempmove5][3]] = "";
						if (moves[Tempmove5][4] != undefined) {
							if (this.allowed == "W") {
								this.Feld[moves[Tempmove5][4]][moves[Tempmove5][5]] = new Rook(moves[Tempmove5][5], moves[Tempmove5][4], "W", "/img/Rook_White.png");
							}
							if (this.allowed == "B") {
								this.Feld[moves[Tempmove5][4]][moves[Tempmove5][5]] = new Rook(moves[Tempmove5][5], moves[Tempmove5][4], "B", "/img/Rook_Black.png");
							}
							this.Feld[moves[Tempmove5][4]][moves[Tempmove5][5]].change(moves[Tempmove5][5], moves[Tempmove5][4]);
						}
					}
					this.moves.push([String(Temp1) + String(Temp2), String(Temp3) + String(Temp4)]);
					if (this.allowed == "W") {
						this.allowed = "B";
						document.getElementById("had").innerHTML = "Schwarz ist am Zug";
					} else if (this.allowed == "B") {
						this.allowed = "W";
						document.getElementById("had").innerHTML = "Weiß ist am Zug";
					}

					for (let y = 0; y < 8; y++) {
						if (this.Feld[7][y] != "") {
							if (this.Feld[7][y].name == "B" && this.Feld[7][y].color == "B") {
								this.Feld[7][y] = new Queen(y, 7, "B", "/img/Queen_Black.png");
							}
						}
						if (this.Feld[0][y] != "") {
							if (this.Feld[0][y].name == "B" && this.Feld[0][y].color == "W") {
								this.Feld[0][y] = new Queen(y, 0, "W", "/img/Queen_White.png");
							}
						}
					}
					this.render();
				}

				this.Eventlisteners();
				this.ismate();
			}
		}
	}

	isdraw() {}

	Eventlisteners() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (document.getElementById(String(i) + String(j) + "d")) {
					document.getElementById(String(i) + String(j) + "d").addEventListener("dragstart", () => {
						this.move = String(i) + String(j);
						setTimeout(function () {
							document.getElementById(String(i) + String(j) + "d").style.display = "none";
						}, 0);
					});
					document.getElementById(String(i) + String(j) + "d").addEventListener("dragend", () => {
						if (document.getElementById(String(i) + String(j) + "d")) {
							document.getElementById(String(i) + String(j) + "d").style.display = "block";
						}
					});
				}
			}
		}
	}

	isPinned(Temp1, Temp2, Temp3, Temp4, Figur, moves, Temp5, Tempmove5) {
		//assigning Feld to testFeld without linking for pincheck

		this.dotestFeld();

		let Figurtest = this.testFeld[Temp1][Temp2];
		Figurtest.change(Temp4, Temp3);
		this.testFeld[Temp1][Temp2] = "";
		this.testFeld[Temp3][Temp4] = Figurtest;
		if (moves[Tempmove5][2] != undefined) {
			this.testFeld[moves[Tempmove5][2]][moves[Tempmove5][3]] = "";
			if (moves[Tempmove5][4] != undefined) {
				if (this.allowed == "W") {
					this.testFeld[moves[Tempmove5][4]][moves[Tempmove5][5]] = new Rook(moves[Tempmove5][5], moves[Tempmove5][4], "W", "/img/Rook_White.png");
				}
				if (this.allowed == "B") {
					this.testFeld[moves[Tempmove5][4]][moves[Tempmove5][5]] = new Rook(moves[Tempmove5][5], moves[Tempmove5][4], "B", "/img/Rook_Black.png");
				}
				this.testFeld[moves[Tempmove5][4]][moves[Tempmove5][5]].change(moves[Tempmove5][5], moves[Tempmove5][4]);
			}
		}

		/*let movescheck = [];

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

		movescheck.forEach((move) => {
			if (this.testFeld[move[0]]) {
				if (this.testFeld[move[0]][move[1]]) {
					if (this.testFeld[move[0]][move[1]].name === "K") {
						this.Tempispin = true;
					}
				}
			}
		});*/

		this.Tempispin = this.ischeck(this.testFeld);
		console.log(this.Tempispin);
	}

	ismate() {
		this.dotestFeld();

		this.ischeckmate = false;
		let TempTempischeck = 0;
		let refTemp = 0;
		let allmoves = [];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.Feld[i][j] != "") {
					if (this.Feld[i][j].color == this.allowed) {
						let movess = this.Feld[i][j].moves(this.Feld);

						for (let x = 0; x < movess.length; x++) {
							if (this.Feld[movess[x][0]]) {
								if (this.Feld[movess[x][0]][movess[x][1]] != undefined) {
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
					if (allmoves[z][2] != undefined) {
						this.testFeld[allmoves[z][2]][allmoves[z][3]] = "";
						if (allmoves[z][4] != undefined) {
							if (this.allowed == "W") {
								this.testFeld[allmoves[z][4]][allmoves[z][5]] = new Rook(allmoves[z][5], allmoves[z][4], "W", "/img/Rook_White.png");
							}
							if (this.allowed == "B") {
								this.testFeld[allmoves[z][4]][allmoves[z][5]] = new Rook(allmoves[z][5], allmoves[z][4], "B", "/img/Rook_Black.png");
							}
							this.testFeld[allmoves[z][4]][allmoves[z][5]].change(allmoves[z][5], allmoves[z][4]);
						}
					}

					let movescheck = [];

					this.testFeld.forEach((rank) => {
						rank.forEach((peace) => {
							if (peace != "") {
								if (peace.color != this.allowed) {
									let Tempmoves = peace.moves(this.testFeld);
									Tempmoves.forEach((Move) => {
										movescheck.push(Move, peace);
									});
								}
							}
						});
					});
					let Tempistake = false;

					movescheck.forEach((move) => {
						if (this.testFeld[move[0]]) {
							if (this.testFeld[move[0]][move[1]] != undefined) {
								if (this.testFeld[move[0]][move[1]].name === "K") {
									Tempistake = true;
								}
							}
						}
					});

					if (Tempistake) {
						TempTempischeck++;
					}
				}
			}
		}

		if (TempTempischeck == refTemp) {
			this.ischeckmate = true;
		}
		if (this.ischeckmate) {
			document.getElementById("had").innerHTML = "Checkmate";
		}
	}

	ischeck(Feld) {
		let movescheck = [];

		Feld.forEach((rank) => {
			rank.forEach((peace) => {
				if (peace != "") {
					if (peace.color != this.allowed) {
						let Tempmoves = peace.moves(Feld);
						Tempmoves.forEach((Move) => {
							movescheck.push(Move);
						});
					}
				}
			});
		});

		let Tempiiii = false;

		movescheck.forEach((move) => {
			if (Feld[move[0]]) {
				if (Feld[move[0]][move[1]]) {
					if (Feld[move[0]][move[1]].name === "K") {
						Tempiiii = true;
					}
				}
			}
		});

		return Tempiiii;
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
		document.getElementById("Board").appendChild(Board);
	}

	render() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.Feld[i][j].name != undefined) {
					if (this.Feld[i][j].color == "W") {
						document.getElementById(String(i) + String(j)).innerHTML =
							"<div class='light drag' draggable='true' id='" + String(i) + String(j) + "d'><img src='" + this.Feld[i][j].img + "' </div>";
					} else if (this.Feld[i][j].color == "B") {
						document.getElementById(String(i) + String(j)).innerHTML =
							"<div class='dark drag' draggable='true' id='" + String(i) + String(j) + "d'><img src='" + this.Feld[i][j].img + "' </div>";
					}
				} else {
					document.getElementById(String(i) + String(j)).innerHTML = "";
				}
			}
		}
		let moves = document.querySelectorAll(".move");
		for (let move of moves) {
			move.remove();
		}
		let buchstaben = ["a", "b", "c", "d", "e", "f", "g", "h"];
		for (let i = 0; i < this.moves.length / 2; i++) {
			let Temp1 = this.moves[i][0][0];
			let Temp2 = this.moves[i][0][1];
			let Temp3 = this.moves[i][1][0];
			let Temp4 = this.moves[i][1][1];
			let teil = document.createElement("li");
			teil.setAttribute("class", "move");
			teil.innerHTML = buchstaben[Temp2] + Temp1 + "" + buchstaben[Temp4] + Temp3;
			if (this.moves[i + 1]) {
				let Temp5 = this.moves[i + 1][0][0];
				let Temp6 = this.moves[i + 1][0][1];
				let Temp7 = this.moves[i + 1][1][0];
				let Temp8 = this.moves[i + 1][1][1];
				teil.innerHTML = buchstaben[Temp2] + Temp1 + "" + buchstaben[Temp4] + Temp3 + " " + buchstaben[Temp6] + Temp5 + "" + buchstaben[Temp8] + Temp7;
			}
			document.getElementById("moves").append(teil);
		}
	}
}

let Game = new Board();

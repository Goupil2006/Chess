class Pawn extends piece {
	constructor(x, y, color, img) {
		super(x, y, color, img);
		this.name = "B";
	}

	posmoves(x, y, Feld) {
		let moves = [];

		if (this.color == "W") {
			if (Feld[y - 1]) {
				if (Feld[y - 1][x - 1] != undefined) {
					if (Feld[y][x - 1] != "") {
						if (Feld[y][x - 1].name == "B" && Feld[y][x - 1].color != this.color && Feld[y][x - 1].movesdone == 1 && Feld[y][x - 1].lastmove) {
							moves.push([y - 1, x - 1, y, x - 1]);
						}
					}
				}
				if (Feld[y - 1][x + 1] != undefined) {
					if (Feld[y][x + 1] != "") {
						if (Feld[y][x + 1].name == "B" && Feld[y][x + 1].color != this.color && Feld[y][x + 1].movesdone == 1 && Feld[y][x + 1].lastmove) {
							moves.push([y - 1, x + 1, y, x + 1]);
						}
					}
				}
			}

			if (Feld[y - 1][x] == "") {
				moves.push([y - 1, x]);
			}

			if (this.movesdone == 0) {
				if (Feld[y - 2]) {
					if (Feld[y - 2][x] == "" && Feld[y - 1][x] == "") {
						moves.push([y - 2, x]);
					}
				}
			}
			if (Feld[y - 1]) {
				if (Feld[y - 1][x + 1]) {
					if (Feld[y - 1][x + 1] != "") {
						if (Feld[y - 1][x + 1].color != this.color) {
							moves.push([y - 1, x + 1]);
						}
					}
				}
			}
			if (Feld[y - 1]) {
				if (Feld[y - 1][x - 1]) {
					if (Feld[y - 1][x - 1] != "") {
						if (Feld[y - 1][x - 1].color != this.color) {
							moves.push([y - 1, x - 1]);
						}
					}
				}
			}
		} else if (this.color == "B") {
			if (Feld[y + 1]) {
				if (Feld[y + 1][x - 1] != undefined) {
					if (Feld[y][x - 1] != "") {
						if (Feld[y][x - 1].name == "B" && Feld[y][x - 1].color != this.color && Feld[y][x - 1].movesdone == 1 && Feld[y][x - 1].lastmove) {
							moves.push([y + 1, x - 1, y, x - 1]);
						}
					}
				}
				if (Feld[y + 1][x + 1] != undefined) {
					if (Feld[y][x + 1] != "") {
						if (Feld[y][x + 1].name == "B" && Feld[y][x + 1].color != this.color && Feld[y][x + 1].movesdone == 1 && Feld[y][x + 1].lastmove) {
							moves.push([y + 1, x + 1, y, x + 1]);
						}
					}
				}
			}

			if (Feld[y + 1][x] == "") {
				moves.push([y + 1, x]);
			}

			if (this.movesdone == 0) {
				if (Feld[y + 2]) {
					if (Feld[y + 2][x] == "" && Feld[y + 1][x] == "") {
						moves.push([y + 2, x]);
					}
				}
			}
			if (Feld[y + 1]) {
				if (Feld[y + 1][x + 1]) {
					if (Feld[y + 1][x + 1] != "") {
						if (Feld[y + 1][x + 1].color != this.color) {
							moves.push([y + 1, x + 1]);
						}
					}
				}
			}
			if (Feld[y + 1]) {
				if (Feld[y + 1][x - 1]) {
					if (Feld[y + 1][x - 1] != "") {
						if (Feld[y + 1][x - 1].color != this.color) {
							moves.push([y + 1, x - 1]);
						}
					}
				}
			}
		}

		return moves;
	}
}

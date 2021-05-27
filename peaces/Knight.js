class Knight extends piece {
	constructor(x, y, color) {
		super(x, y, color);
		this.name = "S";
	}

	posmoves(x, y, Feld) {
		let moves = [];

		if (Feld[y + 2]) {
			if (Feld[y + 2][x - 1] != undefined) {
				if (Feld[y + 2][x - 1].color != this.color || Feld[y + 2][x - 1] == "") {
					moves.push([y + 2, x - 1]);
				}
			}
		}
		if (Feld[y + 2]) {
			if (Feld[y + 2][x + 1] != undefined) {
				if (Feld[y + 2][x + 1].color != this.color || Feld[y + 2][x + 1] == "") {
					moves.push([y + 2, x + 1]);
				}
			}
		}
		if (Feld[y - 1]) {
			if (Feld[y - 1][x + 2] != undefined) {
				if (Feld[y - 1][x + 2].color != this.color || Feld[y - 1][x + 2] == "") {
					moves.push([y - 1, x + 2]);
				}
			}
		}
		if (Feld[y + 1]) {
			if (Feld[y + 1][x + 2] != undefined) {
				if (Feld[y + 1][x + 2].color != this.color || Feld[y + 1][x + 2] == "") {
					moves.push([y + 1, x + 2]);
				}
			}
		}
		if (Feld[y - 2]) {
			if (Feld[y - 2][x - 1] != undefined) {
				if (Feld[y - 2][x - 1].color != this.color || Feld[y - 2][x - 1] == "") {
					moves.push([y - 2, x - 1]);
				}
			}
		}
		if (Feld[y - 2]) {
			if (Feld[y - 2][x + 1] != undefined) {
				if (Feld[y - 2][x + 1].color != this.color || Feld[y - 2][x + 1] == "") {
					moves.push([y - 2, x + 1]);
				}
			}
		}
		if (Feld[y - 1]) {
			if (Feld[y - 1][x - 2] != undefined) {
				if (Feld[y - 1][x - 2].color != this.color || Feld[y - 1][x - 2] == "") {
					moves.push([y - 1, x - 2]);
				}
			}
		}
		if (Feld[y + 1]) {
			if (Feld[y + 1][x - 2] != undefined) {
				if (Feld[y + 1][x - 2].color != this.color || Feld[y + 1][x - 2] == "") {
					moves.push([y + 1, x - 2]);
				}
			}
		}

		/*for (let i = 0; i < moves.length; i++) {
			if (Feld[moves[i][0]]) {
				if (typeof Feld[moves[i][0]][moves[i][1]] !== "undefined") {
					if (Feld[moves[i][0]][moves[i][1]].color == this.color) {
						moves.splice(i, 1);
					}
				}
			}
		}*/
		return moves;
	}
}

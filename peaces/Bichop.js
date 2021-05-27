class Bichop extends piece {
	constructor(x, y, color) {
		super(x, y, color);
		this.name = "L";
	}

	posmoves(x, y, Feld) {
		let moves = [];

		for (let i = 1; i < 8; i++) {
			if (Feld[y + i]) {
				if (Feld[y + i][x + i]) {
					if (Feld[y + i][x + i].color != this.color) {
						moves.push([y + i, x + i]);
					}
					i = 10;
				} else {
					moves.push([y + i, x + i]);
				}
			}
		}
		for (let i = 1; i < 8; i++) {
			if (Feld[y - i]) {
				if (Feld[y - i][x - i]) {
					if (Feld[y - i][x - i].color != this.color) {
						moves.push([y - i, x - i]);
					}
					i = 10;
				} else {
					moves.push([y - i, x - i]);
				}
			}
		}
		for (let i = 1; i < 8; i++) {
			if (Feld[y + i]) {
				if (Feld[y + i][x - i]) {
					if (Feld[y + i][x - i].color != this.color) {
						moves.push([y + i, x - i]);
					}
					i = 10;
				} else {
					moves.push([y + i, x - i]);
				}
			}
		}
		for (let i = 1; i < 8; i++) {
			if (Feld[y - i]) {
				if (Feld[y - i][x + i]) {
					if (Feld[y - i][x + i].color != this.color) {
						moves.push([y - i, x + i]);
					}
					i = 10;
				} else {
					moves.push([y - i, x + i]);
				}
			}
		}

		return moves;
	}
}

class Queen extends piece {
	constructor(x, y, color) {
		super(x, y, color);
		this.name = "Q";
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

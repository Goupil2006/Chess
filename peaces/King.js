class King extends piece {
	constructor(x, y, color) {
		super(x, y, color);
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
						moves.push([y, x + 2, y, x + 3, y, x + 1]);
					}
				}
			}
		}

		if (this.movesdone == 0) {
			if (Feld[y][x - 4] != undefined) {
				if (Feld[y][x - 4].movesdone == 0) {
					if (Feld[y][x - 2] == "" && Feld[y][x - 1] == "" && Feld[y][x - 3] == "") {
						moves.push([y, x - 2, y, x - 4, y, x - 1]);
					}
				}
			}
		}

		return moves;
	}
}

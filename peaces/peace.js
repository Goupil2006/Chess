class piece {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.movesdone = 0;
		this.lastmove = false;
	}

	change(x, y) {
		this.x = x;
		this.y = y;
		this.movesdone++;
		this.lastmove = true;
	}

	update() {
		this.lastmove = false;
	}

	moves(Feld) {
		let moves = this.posmoves(this.x, this.y, Feld, this.color);
		return moves;
	}
}

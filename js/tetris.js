const canvas = $("#tetris-game-zone");
const context = canvas.getContext("2d");

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

function tetris_init(event) {
	var gameZone = event.data;
}
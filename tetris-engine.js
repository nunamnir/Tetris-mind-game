
// сценарии
function setScenario(string) {
  switch(string) {
    case "startScenario":
      console.log("Сценарий приветствия запущен");
      startScene();
      break;
    case "gameScenario":
      console.log("Сценарий игры запущен");
      gameScene();
      break;
    case "resultScenario":
      console.log("Сценарий статистики запущен");
      resultScene();
      break;
    default:
      alert("Я не знаю такого сценария");
      break;
  }
};

// музыка
function playMusic(string) {
  switch(string) {    
    case "bgMusic":
      bgMusic = new Audio();
      bgMusic.src = "music/music-" + getRandom(1,10) + ".mp3";
      bgMusic.volume = 0.7;
      bgMusic.play();
      break;
  }
}

// звуки
function playSound(string) {
  switch(string) {
    case "introMusic":
      var introMusic = new Audio();
      introMusic.src = "sound/intro.mp3";
      introMusic.volume = 1.0;
      introMusic.play();
      break;

    case "moveDown":
      var moveDown;
      if(canPlay) {
        canPlay = false;
        moveDown = new Audio();
        moveDown.src = "sound/fall.mp3";
        moveDown.volume = 1.0;
        moveDown.play();
        setTimeout(function() {
          canPlay = true;
        }, 1000);
      }
      break;

    case "moveShape":
      var moveShape;
      if(canPlay) {
        canPlay = false;
        moveShape = new Audio();
        moveShape.src = "sound/beep-" + getRandom(1,2) + ".mp3";
        moveShape.volume = 1.0;
        moveShape.play();
        setTimeout(function() {
          canPlay = true;
        }, 400);
      }
      break;

    case "blockFix":
      var blockFix = new Audio();
      blockFix.src = "sound/fix.mp3";
      blockFix.volume = 1.0;
      blockFix.play();
      break;

    case "turnShape":
      var turnShape = new Audio();
      turnShape.src = "sound/turnshape.mp3";
      turnShape.volume = 1.0;
      turnShape.play();
      break;
    
    case "clearLine":
      var clearLine = new Audio();
      clearLine.src = "sound/clearline.mp3";
      clearLine.volume = 1.0;
      clearLine.play();
      break;  

    default: return;
  }
};

var bgMusic;

var timeSpeed,
    totalScore,
    totalStage,
    totalLine,
    gameMotion,
    canPlay = true;

function restAllKeys() {
  timeSpeed = 700,
  totalScore = 0,
  totalStage = 0,
  totalLine = 0,
  gameMotion = 0,
  canPlay = true;
};

var shapeKeys = [
  /*Фигура 1*/
  {
    rotation: 0,
    data: [
      [
      	[1,1,0],
      	[0,1,1]
      ],
      [
      	[0,1],
      	[1,1],
      	[1,0]
      ],
      [
      	[1,1,0],
      	[0,1,1]
      ],
      [
      	[0,1],
      	[1,1],
      	[1,0]
      ],
    ]
  },

  /*Фигура 2*/
  {
  	rotation: 0,
   	data: [
      [
      	[2,2],
      	[2,2]
      ],
      [
      	[2,2],
      	[2,2]
      ],
      [
      	[2,2],
      	[2,2]
      ],
      [
      	[2,2],
      	[2,2]
      ],
    ]
  },

  /*Фигура 3*/
  {
  	rotation: 0,
  	data: [
      [
      	[3,3,3,3]
      ],
      [
      	[3],
      	[3],
      	[3],
      	[3]
      ],
      [
      	[3,3,3,3]
      ],
      [
      	[3],
      	[3],
      	[3],
      	[3]
      ],
    ]
  },

  /*Фигура 4*/
  {
  	rotation: 0,
  	data: [
      [
      	[0,0,4],
      	[4,4,4]
      ],
      [
      	[4,4],
      	[0,4],
      	[0,4]
      ],
      [
      	[4,4,4],
      	[4,0,0]
      ],
      [
      	[4,0],
      	[4,0],
      	[4,4]
      ],
    ]
  },
  /*Фигура 5*/
  {
  	rotation: 0,
  	data: [
      [
      	[5,0,0],
      	[5,5,5]
      ],
      [
      	[5,5],
      	[5,0],
      	[5,0]
      ],
      [
      	[5,5,5],
      	[0,0,5]
      ],
      [
      	[0,5],
      	[0,5],
      	[5,5]
      ],
    ]
  },
  /*Фигура 6*/
  {
  	rotation: 0,
  	data: [
      [
      	[0,6,0],
      	[6,6,6]
      ],
      [
      	[0,6],
      	[6,6],
      	[0,6]
      ],
      [
      	[6,6,6],
      	[0,6,0]
      ],
      [
      	[6,0],
      	[6,6],
      	[6,0]
      ],
    ]
  }, 
  /*Фигура 7*/
  {
  	rotation: 0,
  	data: [
      [
      	[0,7,7],
      	[7,7,0]
      ],
      [
      	[7,0],
      	[7,7],
      	[0,7]
      ],
      [
      	[0,7,7],
      	[7,7,0]
      ],
      [
      	[7,0],
      	[7,7],
      	[0,7]
      ],
    ]
  }                          
];

var curShape = {
	x: 3, 
	y: 0,
	width: 0,
	height: 0
};

var nextShape = {
  x: 0, 
  y: 0,
  width: 0,
  height: 0
};

var nextShapeBox = [
    [0,0,0,0],
    [0,0,0,0],
];

var world = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
];

function drawWorld() {
	$.each(world, function(row_index, col) {
		$.each(col, function(col_index, value) {			
			var selector = "#row-" + row_index + "-col-" + col_index;
			$(selector).removeClass();
			$(selector).addClass("slot-type-" + value);
		});
	});
};

function drawNextShape() {
  $.each(nextShapeBox, function(line_index, line) {
    $.each(line, function(cell_index, cell) {
      var selector = "#line-" + line_index + "-cell-" + cell_index;
      $(selector).removeClass();
      $(selector).addClass("slot-type-" + cell);
    });
  });
};

// очистика вспомогательного окна с фигурами
function clearShapeBox() {
  for(var y = 0; y < nextShapeBox.length; y++) {
    for(var x = 0; x < nextShapeBox[y].length; x++) {
      nextShapeBox[y][x] = 0;
    }
  }
};

// загрузка первой фигуры
function putFirstShape() {
  curShape = Object.assign( {}, curShape, shapeKeys[getRandom(0,6)] );
  curShape.width = curShape.data[curShape.rotation][0].length;
  curShape.height = curShape.data[curShape.rotation].length;
  curShape.y = 0;
  curShape.x = 3;
  for(var y = 0; y < curShape.height; y++) {
    for(var x = 0; x < curShape.width; x++) {
      world[curShape.y + y][curShape.x + x] = curShape.data[0][y][x];
    }
  }
  drawWorld();
};

// загрузка следующей фигуры
function createNextShape() {
  clearShapeBox();
  nextShape = Object.assign( {}, nextShape, shapeKeys[getRandom(0,6)] ); 
  nextShape.width = nextShape.data[nextShape.rotation][0].length;  
  nextShape.height = nextShape.data[nextShape.rotation].length;  
  nextShape.y = 0;
  nextShape.x = 0;
  for(var y = 0; y < nextShape.height; y++) {
    for(var x = 0; x < nextShape.width; x++) {
      nextShapeBox[nextShape.y + y][nextShape.x + x] = nextShape.data[0][y][x];
    }
  }
  drawNextShape();
};

// создать форму из матрицы nextShape и поместить в стакан
function putNextShape() {
  curShape = nextShape;
  curShape.width = curShape.data[curShape.rotation][0].length;
  curShape.height = curShape.data[curShape.rotation].length;
  curShape.x = getRandom(1,6);
  curShape.y = 0;
  for(var y = 0; y < curShape.height; y++) {
    for(var x = 0; x < curShape.width; x++) {
      nextShapeBox[nextShape.y + y][nextShape.x + x] = 0;
      world[curShape.y + y][curShape.x + x] = curShape.data[0][y][x];
    }
  }
  drawWorld();
};

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function moveDown() {
  var canMove = true;
  for(var y = 0; y < world.length; y++) {
    for(var x = 0; x < world[y].length; x++) {
      if(world[y][x] > 0 && world[y][x] < 10) {
        if(y === world.length-1 || world[y+1][x] > 10) {
          canMove = false;
          freeze();
          if(world[0][x] == 11) {
              resultScene();
          } else {           
            putNextShape();
            createNextShape();
          }
        }
      }
    }
  }
  if(canMove) {
    for(var y = world.length-1; y>=0; y--) {
      for(var x = 0; x < world[y].length; x++) {
        if(world[y][x] > 0 && world[y][x] < 10) {
          world[y+1][x] = world[y][x];
          world[y][x] = 0;
        }
      }
    }
    curShape.y++;
    drawWorld();
  }
  checkLines();
};

function moveShapeDown() {
	var canMove = true;
	for(var y = 0; y < world.length; y++) {
		for(var x = 0; x < world[y].length; x++) {
			if(world[y][x] > 0 && world[y][x] < 10) {
				if(y === world.length-1 || world[y+1][x] > 10) {
          canMove = false;
          freeze();
          if(world[0][x] == 11) {
              setScenario("resultScenario");
          } else {           
          	putNextShape();
            createNextShape();
          }
				}
			}
		}
	}
	if(canMove) {
    playSound("moveDown");
		for(var y = world.length-1; y>=0; y--) {
			for(var x = 0; x < world[y].length; x++) {
				if(world[y][x] > 0 && world[y][x] < 10) {
					world[y+1][x] = world[y][x];
					world[y][x] = 0;
				}
			}
		}    
    curShape.y++;
    drawWorld();
	}
  checkLines();
};

function moveShapeLeft() {
	var canMove = true;
	for(var y = 0; y < world.length; y++) {
		for(var x = 0; x < world[y].length; x++) {
			if(world[y][x] > 0 && world[y][x] < 10) {
				if(x === 0 || world[y][x-1] > 10) {
					canMove = false;
				}
			}
		}
	}
	if(canMove) {
    playSound("moveShape");
		for(var y = world.length-1; y>=0; y--) {
			for(var x = 0; x < world[y].length; x++) {
				if(world[y][x] > 0 && world[y][x] < 10) {
					world[y][x-1] = world[y][x];
					world[y][x] = 0;
				}
			}
		}
    curShape.x--;
    drawWorld();
	}

};

function moveShapeRight() {
	var canMove = true;
	for(var y=0; y<world.length; y++) {
		for(var x=0; x<world[y].length; x++) {
			if(world[y][x]>0 && world[y][x]<10) {
				if(x === 9 || world[y][x+1]>10) {
					canMove = false;
				}
			}
		}
	}
	if(canMove) {
    playSound("moveShape");
		for(var y=world.length-1; y>=0; y--) {
			for(var x=world[y].length; x>=0; x--) {
				if(world[y][x] > 0 && world[y][x] < 10) {
					world[y][x+1] = world[y][x];
					world[y][x] = 0;
				}
			}
		}    
    curShape.x++;
    drawWorld();
	}
};

function freeze() {
	for(var y = 0; y < world.length; y++) {
		for(var x = 0; x < world[y].length; x++) {			
			if(world[y][x] > 0 && world[y][x] <= 10) {
				world[y][x] = 11;
			}
		}
	}
  playSound("blockFix");
	checkLines();
  drawWorld();
};

function checkLines() {
	for(var y = 0; y < world.length; y++) {
		fullLine = true;
		for(var x = 0; x < world[y].length; x++) {
			if(world[y][x] < 11) {
				fullLine = false;
			}
		}
		if(fullLine) {
      playSound("clearLine");
			world.splice(y, 1);
			world.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
			y--;
      totalScore += 60;
      totalLine++;
      $("#line").text(totalLine);
      $("#score").text(totalScore);        
		}
	}
};

function turnShape() {
  canTurn = true;
  curShape.width = curShape.data[curShape.rotation][0].length;
  curShape.height = curShape.data[curShape.rotation].length;
  for(var y = 0; y < world.length; y++) {
    for(var x = 0; x < world[y].length; x++) {
      if(world[y][x] > 0 && world[y][x] < 10 ) {
        if(
          y+1 === world.length 
          || world[y+1][x] > 10 
          || (curShape.width == 2 && x === 9) 
          || (curShape.width == 1 && x === 9) 
          || (curShape.width == 1 && x === 8) 
          || (curShape.width == 1 && x === 7) 
          || (curShape.width == 2 && world[y][x + 1] > 10) 
          || (curShape.width == 1 && world[y][x + 1] > 10) 
          || (curShape.width == 1 && world[y][x + 2] > 10) 
          || (curShape.width == 1 && world[y][x + 3] > 10) 
          || (curShape.width == 4 && y === 19) 
          || (curShape.width == 4 && y === 18) 
          || (curShape.width == 4 && y === 17) 
          || (curShape.width == 4 && world[y+1][x] > 10) 
          || (curShape.width == 4 && world[y+2][x] > 10) 
          || (curShape.width == 4 && world[y+3][x] > 10)
          ) {
          canTurn = false;
        };
      };
    };
  };
  if(canTurn) {
    if (curShape.rotation < 3){
      curShape.rotation++;
    } else curShape.rotation = 0;
    for(var y = 0; y < curShape.height; y++) {
      for(var x = 0; x < curShape.width; x++) {
        world[curShape.y + y][curShape.x + x] = 0;
      }
    }
    curShape.width = curShape.data[curShape.rotation][0].length;
    curShape.height = curShape.data[curShape.rotation].length;
    for(var y = 0; y < curShape.height; y++) {
      for(var x = 0; x < curShape.width; x++) {
        world[curShape.y + y][curShape.x + x] = 0;
        world[curShape.y + y][curShape.x + x] = curShape.data[curShape.rotation][y][x];
      }
    }
    playSound("turnShape");
    drawWorld();
  };
};

function gameLoop() {
  switch(totalScore) {
    case 0:
      timeSpeed = 700;
      totalStage = 1;
      break;
    case 60:
      timeSpeed = 650;
      totalStage = 2;
      break;
    case 180:
      timeSpeed = 600;
      totalStage = 3;
      break;
    case 300:
      timeSpeed = 550;
      totalStage = 4;
      break;
    case 420:
      timeSpeed = 500;
      totalStage = 5;
      break;
    case 600:
      timeSpeed = 450;
      totalStage = 6;
      break;
    case 900:
      timeSpeed = 400;
      totalStage = 7;
      break;
    case 1200:
      timeSpeed = 350;
      totalStage = 8;
      break;
    case 1500:
      timeSpeed = 300;
      totalStage = 9;
      break;
    case 1800:
      timeSpeed = 250;
      totalStage = 10;
      break;
    case 2400:
      timeSpeed = 200;
      totalStage = 11;
      break;                                                  
    default:
      break; 
  };  
  $("#stage").text(totalStage);
  drawWorld();
  moveDown();
  gameMotion = setTimeout(gameLoop, timeSpeed);
};

function startScene() {
  $("#start-scene").css("display", "flex");
  $("#game-scene").css("display", "none");
  $("#result-scene").css("display", "none");
  $("html").on("keydown", startEnter);

  var showInterval;
  switchState();

  function hideShow() {
    $("#press-start").toggleClass("blink");
  };

  function switchState() {
    showInterval = setInterval(function() {
      hideShow();
    }, 600);
  };

  function startEnter(event) {
    if(event.key == "Enter") {
      $("html").off("keydown", startEnter);
      clearInterval(showInterval);
      setScenario("gameScenario");
      playSound("introMusic");
    }
  }
};

function gameScene() {
  playMusic("bgMusic");
  $("#start-scene").css("display", "none");
  $("#game-scene").css("display", "flex");
  $("#result-scene").css("display", "none");

  restAllKeys();
  $("#stage").text(totalStage); 
  $("#line").text(totalLine);
  $("#score").text(totalScore);

  $("html").keydown(function(event) {
    switch(event.key) {
      case "ArrowLeft": moveShapeLeft(); break;
      case "ArrowRight": moveShapeRight(); break;
      case "ArrowDown": moveShapeDown(); break;
      case "ArrowUp": turnShape(); break;
    }
  });
  gameInit();
};

function resultScene() {
  bgMusic.pause();
  bgMusic.currentTime = 0.0;
  $("#start-scene").css("display", "none");
  $("#game-scene").css("display", "flex");
  $("#result-scene").css("display", "flex");
  $("#restart-button").on("click", restartGame);

  clearTimeout(gameMotion);
  $('html').off("keydown");

  var showInterval;
  switchState();

  function hideShow() {
    $("#restart-text").toggleClass("blink");
  };

  function switchState() {
    showInterval = setInterval(function() {
      hideShow();
    }, 600);
  };

  function restartGame() {
    $("#restart-button").off("click", restartGame);
    clearInterval(showInterval);
    bgMusic.pause();
    bgMusic.currentTime = 0.0;
    clearWorld();
    setScenario("gameScenario");
    playSound("introMusic");
  }
};

function clearWorld() {
  for(var i = 0; i < world.length; i++) {
    for(var j = 0; j < world[i].length; j++) {
      world[i][j] = 0;
    };
  };
  for(var i = 0; i < nextShapeBox.length; i++) {
    for(var j = 0; j < nextShapeBox[i].length; j++) {
      nextShapeBox[i][j] = 0;
    };
  };
};

function gameInit() {
  drawWorld();
  putFirstShape();
  createNextShape();
  gameLoop();
};

window.onload = function() {
  setScenario("startScenario");
  // setScenario("gameScenario");
  // setScenario("resultScenario");
};
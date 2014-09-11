var snakes = []
var piecesToEat = []
var direction = []
var score = []
var foods = ['easy', 'medium', 'hard']
var foodValue = [1, 3, 5]
var intervals = []
var tracker = []
var keep = []
var current_speed = []

function reset() {
	snakes.splice(0, snakes.length)
	piecesToEat.splice(0, piecesToEat.length)
	direction.splice(0, direction.length)
	score.splice(0,score.length)
	for (var i=0;i<intervals.length;i++) {
		clearInterval(i)	
	}
	intervals.splice(0,intervals.length)	
	$('#game').remove()
}


function display() { // display score
	var sf = $('#craggoo').html(score)
	return sf
}

function tracking(array) {
	var sd;
	if (array.length == 0) {
		sd = $('#bbv').html('Level 1')
	}
	else if (array[0] >= 1 && array[0] <= 20) {
		sd = $('#bbv').html('Level 2')
	}
	else if (array[0] >= 20 && array[0] <=60) {
		sd = $('#bbv').html('Level 3')
	}
	else if (array[0] >= 61 && array[0] <=100) {
		sd = $('#bbv').html('Level 4')
	}
	else {
	}
	return sd
}

function createGrid() { // create initial grid
	var width = $('#x').val()
	var height = $('#y').val()
	var board = ''
	for (var i=0;i<height;i++) {
		board += '<div class="row">'
		for (var j=0;j<width;j++) {
			board += '<div class="cell"' + 'id="' + j + '-' + i + '">' + '</div>'
		}
	}
	board += '</div>'
	
	$('#game').html(board)
}

function initialPosition(array) { // determine intial position
	var xStart = Math.ceil($('#x').val() / 2)
	var yStart = Math.ceil($('#y').val() / 2)
	var start = document.getElementById(xStart + '-' + yStart)
	start.className ="snake cell"	
	array.push([xStart,yStart]) // add start position to the snake array
}

function initialDir(array) { // determine initial direction
	var rand = Math.ceil(Math.random() * 20)
	if (rand <= 5) {
		array.push('left')
	}

	else if (rand > 5 && rand <= 10) {
		array.push('right')
	}

	else if (rand > 10 && rand <=15) {
		array.push('up')
	}

	else {
		array.push('down')
	}
} // add initial direction to direction array

function placeItems() { // add food to board
	var store = ($('#x').val() * $('#y').val()) / 25
	var temp = []
	for (var i=1;i<=store;i++) {
		for (var j=1;j<=store;j++) {
			for (var k=1;k<=store;k++) {
				if (i + j + k == Math.ceil(store)) {
					temp.push([i,j,k])
				}
			}
		}
	} // determine all possible combinations of values that add up to "store" then store the values in temp

	var variety = [temp[Math.ceil(Math.random()*temp.length)]]


	function addingFood (array, action, secondAction) { // calculate a random id and add the food to that location
		for (var g=0;g<array;g++) {
			var X = Math.ceil(Math.random() * $('#x').val())
			var Y = Math.ceil(Math.random() * $('#y').val())

			while (X < 5 || (X > ($('#x').val() -5) )) {			// setup a border on board if needed
				X = Math.ceil(Math.random() * $('#x').val())
			}

			while (Y < 5 || (Y > ($('#y').val()-5) )) {
				Y = Math.ceil(Math.random() * $('#y').val())
			}

			var element = document.getElementById(X + "-" + Y)
			if (!$(element).hasClass(secondAction) && !$(element).hasClass(action)) { // modify for adding more food to the board if needed
				$(element).addClass(action)		// add food tiles to any tile that is not the starting tile		
			}
		}
	}
	addingFood(variety[0][0], 'easy', 'snake') // calculate easy amount of food tiles
	addingFood(variety[0][1], 'medium', 'snake') // calculate medium amount of food tiles
	addingFood(variety[0][2], 'hard', 'snake') // calculate hard amount of food tiles
	tracking(tracker)
}

function move(dir, array, item) {
	var amount = item.length
	var arr = [[array[0][0], array[0][1]]]
	var X = array[array.length-1][0]
	var Y = array[array.length-1][1]	
	var spliced = array.splice(0,1)
	var pusher = [spliced[0][0], spliced[0][1]]
		
		if (dir == 'left') {
			
			if (amount > 0) {
				array.unshift(pusher)
				array.push(item.shift())
			}
			
			else {
				array.push([X-1, Y])
			}
				
			snaking(array, 'snake', arr)
			endGame(array)
		
		}
		
		else if (dir == 'right') {
			if (amount > 0) {
				array.unshift(pusher)
				array.push(item.shift())
			}				
			else {
				array.push([X+1, Y])
			}
				
			snaking(array, 'snake', arr)
			endGame(array)
	
		}
		else if (dir == 'up') {
			if (amount > 0) {
				array.unshift(pusher)
				array.push(item.shift())
			}		
			else {
				array.push([X, Y-1])
			}
			
			snaking(array, 'snake', arr)
			endGame(array)
					
		}
		else {			
			if (amount > 0) {
				array.unshift(pusher)
				array.push(item.shift())
			}
			else {		
			array.push([X, Y+1])	
			}
			
			snaking(array, 'snake', arr)
			endGame(array)		
		}				
}

function endGame(array) { // determine end game conditions
	y = array[array.length-1][1]
	x = array[array.length-1][0]
	if (  (y < 0) || (y >= $('#y').val() ) || (x < 0) || (x >= $('#x').val() ) ) {
		for (var i=0;i<intervals.length;i++) {
			window.clearInterval(i)
		}
		alert("Game Over")
	}
	if (array.length <1) {
		return false
	}
	var temp = []
	var value = array[array.length-1]
	for (var i=0;i<array.length-1;i++) {
		if ( (array[i][0] == value[0]) && (array[i][1] == value[1]) ) {
			temp.push(i)
			break
		}
	}

	if (temp.length > 0) {
		for (var i=0;i<intervals.length;i++) {
			window.clearInterval(i)
		}
		alert("Game Over")
	}

	temp.splice(0,temp.length)
}

function clearIntervals(array) {
	for (var i=0;i<array.length;i++) {
		window.clearInterval(i)
	}
}

function moveSnake() { // value to use to move snake
	return move(direction,snakes, piecesToEat)	
}

function repeating(f, speed) { // function to use to setup a repeating interval

	intervals.push(setInterval(f, speed))
	if (current_speed.length == 0) {
		current_speed.push(speed)
	}
}

function snaking(array,action, arrayz) { // changes the location of the snake
	var element = document.getElementById(array[0][0] + "-" + array[0][1])
	var elementz = document.getElementById(array[array.length-1][0] + "-" + array[array.length-1][1])
	var spliceElement = document.getElementById(arrayz[0][0] + "-" + arrayz[0][1])
	if (array.length == 1) {
		$(element).addClass(action)
		$(spliceElement).removeClass(action)
	}

	if (array.length >= 2) {
		$(spliceElement).removeClass(action)
		$(elementz).addClass(action)
	}
	
	arrayz.splice(0,1)
} 

function eatItem() { // determines how the snake grows
	return eating(snakes,foods, foodValue, score)
}

function eating(pos, array, value, total) { // determines how many tiles the snake grows

	var element = document.getElementById(pos[pos.length-1][0] + "-" + pos[pos.length-1][1])

	var sum = 0;
	for (var i=0;i<array.length;i++) {
		
		if ($(element).hasClass(array[i])) {
			$(element).removeClass(array[i])
			sum+= value[i]
		}
	}
	total.push(sum)
	var summation = 0
	for (var j=0;j<total.length;j++) {
		summation+= total[j]
	}

	total.splice(0,total.length,summation)

	function tempStorage(pos, number, dir, ate) { // builds the list of tiles for the snake to grow to if he finds something tasty to eat
		if (sum == 0) {
			return false
		}
		var X = pos[pos.length-1][0] ,
			Y = pos[pos.length-1][1] ,
			f = dir
		
		if (ate.length > 0) {
			X = ate[ate.length-1][0]
			Y = ate[ate.length-1][1]
		}
		for (var i=number;i>0;i--) { 
			j = number - i
			if (f == 'up') {
				ate.push([X, Y-j-1])
			}
			else if (f == 'down') {
				ate.push([X, Y+j+1])
			}
			else if (f == 'left') {
				ate.push([X-j-1, Y])
			}
			else {
				ate.push([X+j+1, Y])
			}
		}
	}

	tempStorage(snakes, sum, direction, piecesToEat) 

	var track = $('#craggoo').html()

	var speed = current_speed[0]

	function changeSpeed(itemz, trackerS, speed) { // changes the game speed
		if (keep.length == 0) {
			trackerS.push(total[0])
		}
		else {
			trackerS.splice(0,1, total[0])
	
		}
		keep.push(itemz)
		tracking(tracker)
		for (var i=0;i<intervals.length;i++) {
			clearInterval(i)
		}
		repeating(moveSnake, speed), repeating(eatItem, speed), repeating(display, speed)
	}

	if (track >= 1 && track <= 20 && keep.indexOf(1) == -1) {
		changeSpeed(1, tracker, speed -200)
		current_speed.splice(0,1,(current_speed[0] - 200) )
	}
	if (track >= 21 && track <=60 && keep.indexOf(2) == -1) {
		changeSpeed(2, tracker, speed - 600)
		current_speed.splice(0,1,(current_speed[0] - 600) )
	}
	if (track >= 61 && track <=100 && keep.indexOf(3) == -1) {
		changeSpeed(3, tracker, speed - 180)
		current_speed.splice(0,1,(current_speed[0] - 180))
	}
}

function changeDir(array, dir) { // changes direction if its a valid direction 
	if (checkDirection(array,dir) == 0) {
		return false
	}
	else {
		checkDirection(array,dir)
	}	
}

function checkDirection(dire,input) { // converts key input to a direction
	temp = []
	var arr = []
	if (input == 40) {
		temp = 'down'
	}
	else if (input == 39) {
		temp = 'right'
	}
	else if (input == 38) {
		temp = 'up'
	}
	else if (input == 37) {
		temp = 'left'
	}
	else {
		return false
	}
	
	var detect = function () { // determines if the direction is valid
		arr.push(direction[0],temp)

		if ( ( (arr[0] == 'down' || arr[0] == 'up') &&  (arr[1] == 'down' || arr[1] == 'up' ) ) ) {
			dire.splice(0,dire.length,arr[0])
			return 0
		}

		else if ( ( (arr[0] == 'left' || arr[0] == 'right') &&  (arr[1] == 'left' || arr[1] == 'right' ) ) ) {
			dire.splice(0,dire.length,arr[0])
			return 0
		}

		else {
			dire.splice(0,dire.length,arr[arr.length-1])
			return 1
		}
	}
	return detect()
}

$(document).ready(function() { 
	$(document).keydown(function(event) {
		changeDir(direction, event.which) // starts listening for keystrokes
	})
	$('#play').click(function() { // creates initial game conditions and starts moving the snake
		createGrid(), initialPosition(snakes), initialDir(direction), placeItems(), 
		repeating(moveSnake, 1000), repeating(eatItem, 1000), repeating(display, 1500)		
	})
})


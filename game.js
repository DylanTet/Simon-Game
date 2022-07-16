var randomNumber = 0
var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0



function nextSequence() {

  level += 1
  $("#level-title").text("Level " + level)
  
  randomNumber = Math.floor(Math.random() * 4)
  var randomColor = buttonColors[randomNumber]

  var randomSound = "sounds/" + randomColor + ".mp3"
  
  var audio = new Audio(randomSound);
  audio.play();

  gamePattern.push(randomColor)

  $("#" + randomColor).fadeOut(100).fadeIn(100)
  
}

function playSound(name) {
  
  var randomSound = "sounds/" + name + ".mp3"
  
  var audio = new Audio(randomSound);
  audio.play();
}

function animatePress(currentColor) {
  
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {

    console.log(userClickedPattern)
    console.log(gamePattern)  

  if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {
    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(function() {
            nextSequence()
            userClickedPattern = []
          }, 100)
    }
  } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        level = 0
        userClickedPattern = []
        gamePattern = []

        $("h1").text("Game Over! Press Any Key To Restart")

        $("body").addClass("game-over")

        setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200)
  }
}

$(".btn").click(function() {
  
  var userChosenColor = this.id
  
  userClickedPattern.push(userChosenColor)

  animatePress(this.id)

  if (userClickedPattern.length == level && level != 0) {
    checkAnswer(level)
}

})


$(document).keydown(function (e){ 
  
  if (level == 0) {
    nextSequence()
  }
  
})


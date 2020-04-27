var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
    nextLevel();
    started = true;
  }
  });

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function nextLevel(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash button with randomChosenColour
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // Play sound for button with randomChosenColour
    playSound(randomChosenColour);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  //Make button grey for 100msec
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentIndex) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern's last indexS. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        console.log("success");
        console.log("gamePattern " + gamePattern);
        console.log("userClickedPattern " + userClickedPattern);
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextLevel();
        }, 1000);
      }
    } else {
      console.log("wrong");
      console.log("gamePattern " + gamePattern);
      console.log("userClickedPattern " + userClickedPattern);
      animateWrong();
      playSound("wrong");
      startOver();
    }
}

function animateWrong(){
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over")},200);
  $("h1").text("Game over, Press Any Key to Restart.")
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}

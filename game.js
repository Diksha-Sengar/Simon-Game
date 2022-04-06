var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animateButtonOnPress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
var level=0;
var started=false;
if(started==false){
  $(document).on("keypress",function(){
    nextSequence();
    started=true;
  })
}


function checkAnswer(index){
  if(userClickedPattern[index]===gamePattern[index])
  {
    if(userClickedPattern.length == gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }

  else{
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    started = false;
    level = 0;
    gamePattern = [];
  }

}

function nextSequence()
{
  userClickedPattern = [];
  $("h1").text("Level "+level++);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animateButtonOnPress(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButtonOnPress(name){
  $("#"+name).fadeOut(100).fadeIn(100)
             .addClass("pressed");
  setTimeout(function(){
    $("#"+name).removeClass("pressed");
  },100);
}

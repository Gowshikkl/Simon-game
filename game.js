alert("SIMON GAME:Identify the Button sequence created by the Bot to Complete the level")
var started = false;
var level = 1;
var gamePattern = [];
var userClickedPattern = [];
var randomColor  = ["red","blue","green","yellow"];
var randomChosenColor;
$(document).keypress(function(){
    if(!started){
    newSequence();
    started = true;
    }
})
$(".btn").click(function(a){
    var clickcolor = a.target;
    var userChosenColor = clickcolor.id;
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function(){
    $("#"+userChosenColor).removeClass("pressed");
    },100);
    var useAudio = new Audio("sounds/"+userChosenColor+".mp3");
    useAudio.play();
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);


    

})
function newSequence(){
    $("#level-title").text("Level "+ level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = randomColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();


}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
           setTimeout(function(){
            newSequence();
            userClickedPattern.length = 0;
           },500); 
        }
        }
        else{
            gameOver();
            startOver();
        }
}
function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("#level-title").text("Game Over,Press Any Key To Resatart ");
        $("body").removeClass("game-over");
        var gameOverAudio = new Audio('sounds/wrong.mp3');
        gameOverAudio.play();
    },200);
}
function startOver(){
        gamePattern.length=0;
        userClickedPattern.length= 0;
        level = 1;
        started = false;
        
}
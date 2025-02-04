var buttonColours = ["red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keypress(function(){
    if(! start){
        $("#level-title").text("Level "+level);
        newsequence();
        start = true;
    }
})

function newsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();
}

$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                newsequence();
            },500)
    }
    }
    else{
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("failed");
    }
}

function startOver(){
    level = 0;
    gamePattern=[];
    start = false;
}
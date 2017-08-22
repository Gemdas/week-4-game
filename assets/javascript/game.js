$(document).ready(function() {
var cards=[new card('uno',"assets/images/Uno.jpg", 25, 180)];
cards.push( new card('hearthstone', "assets/images/Hearthstone.png", 20, 150));
cards.push( new card('bakugan', "assets/images/Bakugan.jpg", 8, 120));
cards.push( new card('duel Master', "assets/images/DuelMaster.jpg", 5, 100));
var img=[];

var isLocked=false;
var player;
var enemy;
var playerPower;
var hasPlayer;
var hasEnemy=false;
pregameSetup();

function card(name, image, attack, health) {
	this.cardName=name;
	this.cardImage=image;
	this.attackPower=attack;
	this.HP=health;
}
// sets up the cards at the start
function pregameSetup(){
	for (var x=cards.length-1; x>=0; x--)
	{
		img[x] = $('<img />', { 
		src: cards[x].cardImage
	});
	img[x].attr('title', "Health: "+ cards[x].HP);
	img[x].attr('health', cards[x].HP);
	img[x].attr('alt', cards[x].cardName);
	img[x].attr('power', cards[x].attackPower);
	img[x].addClass('image playable');
	}
	for (var x=cards.length-1; x>=0; x--)
	{
		img[x].appendTo('#Start-Row');
	}
	hasPlayer=false;
}
// Selects enemy and moves to the Enemy section
$(document).on("click",".enemy", function()
{
	if(hasEnemy||isLocked)
	{
		return;
	}
	hasEnemy=true;
	enemy=this;
	$(enemy).appendTo("#Fighter-Section");
});
$(document).on("click",".playable", function()
{
	if(hasPlayer||isLocked)
	{
		return;
	}
	//Selects the Player's card and moves them to the player section
	player=this;
	hasPlayer=true;
	playerPower=parseInt($(player).attr("power"));	
	$(player).appendTo("#Player-Character-Row");
	//moves all other cards to the enemy area, removes playable class adds enemy class
	$("#Start-Row").children().removeClass("playable");
	$("#Start-Row").children().addClass("enemy");
	$("#Start-Row").children().appendTo("#Enemy-Area");
});
$("#Attack-Button").click(function()
{
	//check if you have both combatants
	if(!hasPlayer||!hasEnemy||isLocked)
	{
		if(!isLocked)
		{
			alert("Both combatants need to be ready");
		}
		return;
	}
	//reduce the enemy hp
	$(enemy).attr("health", (parseInt($(enemy).attr("health"))-parseInt($(player).attr("power"))));
	$(player).attr("power", (parseInt($(player).attr("power"))+playerPower));	
	if(parseInt($(enemy).attr("health"))<=0)
	{
		$('#Fighter-Section').empty();
		if ($('#Enemy-Area').is(':empty'))
		{
			resetPrep(true)
			isLocked=true;
		}
		else
		{
			hasEnemy=false;

		}
		return;
	}
	//reduce player hp
	$(player).attr("health", (parseInt($(player).attr("health"))-parseInt($(enemy).attr("power"))));
	$("#First-Line").html("You did "+($(player).attr("power")) +" damage to " + ($(enemy).attr("alt")));

	//increase player power
	$("#Second-Line").html(($(enemy).attr("alt")) + " did "+ ($(enemy).attr("power")) +" damage to you");
	//update the titles
	$(player).attr("title", "Health: "+ $(player).attr("health"));
	$(enemy).attr("title", "Health: "+ $(enemy).attr("health"));
	//check if player dead and game over if they are
	if(parseInt($(player).attr("health"))<=0)
	{
		resetPrep(false);
		isLocked=true;
	}
	if(parseInt($(enemy).attr("health"))<=0)
	{
		$('#Fighter-Section').empty();
		if ($('#Enemy-Area').is(':empty'))
		{
			resetPrep(true)
			isLocked=true;
		}
		else
		{
			hasEnemy=false;

		}
	}
	//check if enemy dead then check if there are any enemies left, if none activate win other wise reset the hasEnemy
});
function resetPrep(didWin)
{
	$("#Second-Line").empty();
	if(didWin)
	{
		$("#First-Line").html("YOU WIN");
	}
	else
	{
		$("#First-Line").html("YOU LOSE");
	}
	$("#reset").html("<button id='reset-button'>RESET</button>");
}
$(document).on("click","#reset-button", function()
{
	hasPlayer=false;
	hasEnemy=false;
	isLocked=false;
	$("#Player-Character-Row").empty();
	$("#Enemy-Area").empty();
	$("#Fighter-Section").empty();
	$("#First-Line").empty();
	$("#reset").empty();
	player=undefined;
	enemy=undefined;
	pregameSetup();
});
});
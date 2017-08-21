$(document).ready(function() {
var cards=[new card('uno',"assets/images/Uno.jpg", 25, 180)];
cards.push( new card('hearthstone', "assets/images/Hearthstone.png", 20, 150));
cards.push( new card('bakugan', "assets/images/Bakugan.jpg", 10, 120));
cards.push( new card('duel Master', "assets/images/DuelMaster.jpg", 5, 100));
var img=[];
for (var x=cards.length-1; x>=0; x--)
{
	img[x] = $('<img />', { 
	src: cards[x].cardImage
	});
	img[x].attr('title', "Health: "+ cards[x].HP);
	img[x].attr('value', x/*cards[x].cardName*/);
	img[x].addClass('image playable');
}
var player;
var enemy;
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
		img[x].appendTo('#Start-Row');
	}
	hasPlayer=false;
}
$(".enemy").on("click", function()
{
	console.log(this);
	if(hasEnemy)
	{
		return;
	}
	hasEnemy=true;
	enemy=this;
	$(enemy).appendTo("#Fighter-Section");
});
$(".playable").click(function()
{
	if(hasPlayer)
	{
		return;
	}
	player=this;
	console.log(player);
	hasPlayer=true;
	$(player).appendTo("#Player-Character-Row");
	$("#Start-Row").children().removeClass("playable");
	$("#Start-Row").children().addClass("enemy");
	$("#Start-Row").children().appendTo("#Enemy-Area");
});

});
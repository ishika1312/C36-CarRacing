class Game{
    constructor(){}
        
    getState(){
        var gameStateRef = database.ref("GameState");
         gameStateRef.on("value", function(data){
            gameState = data.val();
         })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if (gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref("PlayerCount").once("value");
            if (playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
     }  

    play(){
        form.hidden();
        textSize(28);
        text("Game Start", 130, 200);
        Player.getPlayerInfo();
        if (allPlayers !== undefined){
            var displayPos = 130;
            for (var plr in allPlayers){
                if (plr === "player" + player.index){
                    fill("red");
                }
                else 
                    fill("black");
                displayPos+=20;
                textSize(15);
                text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 550, displayPos);
            }
        }
        if(keyDown(UP_ARROW) && player.index!==null){
            player.distance+=50;
            player.update();
        }
    }
}
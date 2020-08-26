const readline = require('readline-sync')
const $minorHealthPack = new MinorHealthPack('Minor Health Pack', 40)
const $healthPack = new HealthPack('healthPack' , 100)
let $roids = new Roids('Roids' , Math.floor(Math.random()* 40) )
console.log('A Fun Message')
const $name = readline.question("what is your name?")
const arrayOfInventory = []
const arrayOfEnemies = []
let isAlive = true
let inventoryIsOpen = false
let ranAway = false
function Player(playerHealth , playerAttack, name, inventory){
    this.playerHealth = playerHealth
    this.playerAttack = playerAttack
    this.name = name
    this.inventory = {
        $healthPack : 0,
        $minorHealthPack : 0,
        $roids : 0,
    }
}
const jon = new Player(100, 20, "jon" , 'inventory')


function Enemy(HP , AP, type, battleIntro){
    this.HP = HP
    this.AP = AP
    this.type = type
    this.battleIntro = battleIntro
}

function enemyType(){
    let $enemyType = Math.floor(Math.random() * 3)
        if($enemyType === 0){
            return new Enemy(1 ,1 , 'Joffrey' , )
            console.log('I am the King')
        }else if($enemyType === 1){
            return new Enemy(25 , 15, 'Ramsey')
            console.log('Our time together is about to end')
        }else if($enemyType === 2){
            return new Enemy(75 , 30, 'Knight King')
            console.log('gives evil look')
        }
}


while(isAlive){
    console.log(isAlive)
    let commands = readline.keyIn('press [w] to walk, press [i] for inventory, press [q] to quit', {limit: "wiq" })
    if(commands === 'w'){
        walking()
    } else if(commands === 'i'){
        inventoryIsOpen = true
        items()
        
    } else if(commands === 'q'){
        isAlive = false
        console.log('You know nothing Jon Snow')
    }
        
}

function walking(){
    isAlive = true
    ranAway = false
    let encounterRate = Math.floor(Math.random() * 3)
        if(encounterRate === 2){
            battle(enemyType())
        } else{
            console.log('No enemies')
        }
}


function flee(enemy){
    let $run = Math.floor(Math.random() * 3)
    if($run === 1){
        ranAway = true
        
        console.log("You ran away")
        walking()
    } else {
        ranAway = false
        enemyType()
        console.log("You could not get away from " + enemy.type)
    }
    
}


function battle(enemy){
    console.log('You have encountered '+ enemy.type)
    while(jon.playerHealth > 0 && enemy.HP >0 && isAlive && !ranAway){
        console.log(isAlive)
        let fight = readline.keyIn('Do you want to fight [f] or run [r]  or [q] to quit' , {Limit: 'frq'})
        if(fight === 'f'){
            enemyType()
            jon.playerHealth -= enemy.AP
            enemy.HP -= jon.playerAttack
            console.log('You have dealt ' + jon.playerAttack + ' worth of damage')
            console.log(enemy.type + ' has done ' + enemy.AP + ' worth of damage')
            console.log('You have ' + jon.playerHealth , 'and the enemy has ' +enemy.HP )
            
        }else if(fight === 'r'){
            ranAway = true
            isAlive = true
            flee(enemy)
            
       
        }else if(fight === 'q'){
            console.log('You know nothing Jon Snow')
            isAlive = false
        }
            
    }

    if(jon.playerHealth > 0 && enemy.HP <= 0){
        console.log('Congrats you have defeated '  + enemy.type)
        let droppedItems = Math.floor(Math.random() * 5)
        if(droppedItems === 0){
            arrayOfInventory.push($healthPack)
            console.log('You have received a health pack')
            jon.inventory.$healthPack++
            console.log(jon.inventory.$healthPack)
        }else if(droppedItems === 1){
            arrayOfInventory.push($minorHealthPack)
            console.log('You have received a minor health pack')
            jon.inventory.$minorHealthPack++
            console.log(jon.inventory.$minorHealthPack)
        }else if(droppedItems === 2){
            arrayOfInventory.push($minorHealthPack)
            console.log('You have received a minor health pack')
            jon.inventory.$minorHealthPack++
            console.log(jon.inventory.$minorHealthPack)
        }else if(droppedItems === 3){
            arrayOfInventory.push($minorHealthPack)
            console.log('You have received a minor health pack')
            jon.inventory.$minorHealthPack++
            console.log(jon.inventory.$minorHealthPack)
        }else if(droppedItems === 4){
            arrayOfInventory.push($roids)
            console.log('You have received roids')
            jon.inventory.$roids++
            console.log(jon.inventory.$roids)
        }
    }else{
        console.log('You played the Game of Thrones and you lost')
        isAlive = false
    }
}


function HealthPack(name , stats){
    this.name = name
    this.stats = stats
}   

function MinorHealthPack(name , stats){
    this.name = name
    this.stats = stats
}

function Roids(name , stats){
    this.name = name
    this.stats = stats
}


function items(){
    while(inventoryIsOpen){
       
        let question = readline.keyIn(`To use a health pack press ${jon.inventory.$healthPack} [h], to use a minor health pack press ${jon.inventory.$minorHealthPack} [m], press [w] to walk to use roids press ${jon.inventory.$roids} Health: ${jon.playerHealth} Attack: ${jon.playerAttack} [r]`, {limit: 'hmwr'})
       
        if(question === 'h' && jon.inventory.$healthPack > 0){
            jon.playerHealth += 100
            jon.inventory.$healthPack--
            console.log('You have used a Health pack')
        } else if(question === 'm' && jon.inventory.$minorHealthPack >0){
            jon.playerHealth += 40
            jon.inventory.$minorHealthPack--
            console.log('You have used a minor health pack')
        } else if(question === 'r' && jon.inventory.$roids >0){
            jon.playerAttack += Math.floor(Math.random()* 40) 
            jon.inventory.$roids--
            console.log('You have used roids to increase your attack')
        } else if(question === 'w'){
            inventoryIsOpen = false
            walking()
        } 
    }   
}
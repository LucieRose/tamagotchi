const { stdin } = require('process');
const readline = require('readline');
const logUpdate = require('log-update');
const {generateSpace} =  require('./utils')

const rl = readline.createInterface({
    input: process.stdin,
    outpur: process.stdout
})

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

rl.on('close', () => {
    process.exit(0)
})


//assignation des touches pour les interactions
process.stdin.on('keypress', (character, key)=> {
    if(key.name==='f'){
        food()
        return
    }

    if(key.name==='p'){
        play()
        return
    }

    if(key.name==='h'){
        hug()
        return
    }

    if(key.name==='d'){
        dead()
        return
    }
})

//fonctions des interactions
function food(){
    if(state.hunger<=85){
        state.hunger += 15
    }
    if(state.life<=50){
        state.life += 10
    }
}

function play(){
    if(state.amusement<=85){
        state.amusement += 15
    }
    if(state.life<=50){
        state.life += 10
    }
}

function hug(){
    if(state.life<=90){
        state.life += 10
    }
}

function dead(){
    state.life = 0
    state.hunger = 0
    state.amusement = 0
}

// Etats
const state = {
    life: 100,
    time: 0, //temps en seconde
    hunger: 100,
    amusement: 100
}

//visuels
const tamagotchi = [
    'ʕ •ᴥ•ʔ',
    'ʕ •ᴥ•ʔゝ☆',
    'ʅʕ•ᴥ•ʔʃ',
  ];

const tamagotchiAngry = [
   'ʕ；•`ᴥ•´ʔ',
   'ʕ – ᴥ –ʔ',
]

const tamagotchiDead = [
    'ʕ xᴥxʔ'
]

// affichage du tamagotchi
function getTamagotchi() {

    //là il est mort
    if(state.life===0){
        return tamagotchiDead
    }else if(state.hunger<=45 || state.amusement <=45){ //là il est vénère
        return generateSpace() + tamagotchiAngry[Math.floor(Math.random() * tamagotchiAngry.length)]
    }
    // sinon il est normal
    return generateSpace() + tamagotchi[Math.floor(Math.random() * tamagotchi.length)]

}

//fonctions des affichages des barres de statut
function getLifeBar() {

    if(state.life ===0){
        return 'mort.'
    }

    const barCompleteChar = '♥️ '
    const barIncompleteChar = '♡ '
    const total = 5
    const plein = (state.life * 5)/100
    const vide = total - plein


    return new Array(Math.floor(plein)).fill(barCompleteChar).join('') + new Array(Math.floor(vide)).fill(barIncompleteChar).join('')
}

function getHungerBar() {

    const barCompleteChar = '🍗 '
    const barIncompleteChar = '- '
    const total = 5
    const plein = (state.hunger * 5)/100
    const vide = total - plein


    return new Array(Math.floor(plein)).fill(barCompleteChar).join('') + new Array(Math.floor(vide)).fill(barIncompleteChar).join('')
}

function getPlayBar() {
  
    const barCompleteChar = '⚽ '
    const barIncompleteChar = '- '
    const total = 5
    const plein = (state.amusement * 5)/100
    const vide = total - plein


    return new Array(Math.floor(plein)).fill(barCompleteChar).join('') + new Array(Math.floor(vide)).fill(barIncompleteChar).join('')
  
}

//Boucle de temps affichage
setInterval(function(){
    const espace = [
        getLifeBar() + '   ' + getHungerBar() + '   ' + getPlayBar(),
        'h key: hug' + '   ' + 'f key: feed' + '    ' + 'p key: play',
        '',
        getTamagotchi(),
    ]
  
    logUpdate(espace.join('\n'))
}, 1200)

//boucle de temps algorithme du jeu
setInterval(function(){

    state.time+= 1

    if((state.hunger <= 10 || state.amusement === 0) && state.time % 3 ===0 && state.life !==0){
        state.life--
    }

    if(state.time % 3 === 0 && state.hunger !== 0){
        state.hunger--
    }

    if(state.time % 2 === 0 && state.amusement !== 0){
        state.amusement--
    }
    
  }, 750)

  
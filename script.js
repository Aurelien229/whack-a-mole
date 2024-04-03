// Sélection de tous les trous, du panneau de score et des taupes
const trous = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const taupes = document.querySelectorAll('.mole');

// Variables globales pour suivre le dernier trou, l'état du temps écoulé et le score
let dernierTrou;
let tempsEcoule = false;
let score = 0;

// Fonction pour générer un temps aléatoire entre min et max
function tempsAleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Fonction pour choisir un trou de manière aléatoire tout en évitant de choisir le même trou deux fois de suite
function trouAleatoire(trous) {
    const indice = Math.floor(Math.random() * trous.length);
    const trou = trous[indice];
    if (trou === dernierTrou) {
        console.log('NOOOB!!!');
        return trouAleatoire(trous);
    }
    dernierTrou = trou;
    return trou;
}

// Fonction pour faire apparaître une taupe dans un trou de manière aléatoire
function apparaitre() {
    const temps = tempsAleatoire(200, 1000);
    const trou = trouAleatoire(trous);
    trou.classList.add('up');
    setTimeout(() => {
        trou.classList.remove('up');
        if (!tempsEcoule) apparaitre();
    }, temps);
}

// Fonction pour commencer le jeu en réinitialisant le score et en faisant apparaître une taupe
function commencerJeu() {
    scoreBoard.textContent = 0;
    tempsEcoule = false;
    score = 0;
    apparaitre();
    setTimeout(() => tempsEcoule = true, 10000)
}

// Fonction appelée lorsqu'une taupe est "frappée" par le joueur
function frapper(e) {
    if (!e.isTrusted) return; // tricheur !
    score++;
    console.log("good");
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
commencerJeu();
// Ajout d'un écouteur d'événements à chaque taupe pour détecter les clics du joueur
taupes.forEach(taupe => taupe.addEventListener('click', frapper));

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const config = {
    GAME_WIDTH: window.innerWidth,
    GAME_HEIGHT: window.innerHeight,
    YARD_SIZE: 200,
    YARD_POSITION: {
        X: window.innerWidth - 200,
        Y: window.innerHeight - 200,
    },
    GROUP: 5,
    HERO_SPEED: 5,
    ANIMAL_SPEED: 5,
};
class Animal {
    constructor(app) {
        this.app = app;
        this.graphics = new PIXI.Graphics();
        this.graphics.fill(0xFFFFFF);
        this.graphics.circle(0, 0, 15);
        this.graphics.fill();
        this.app.stage.addChild(this.graphics);
    }
    ;
    setPosition(x, y) {
        this.graphics.x = x;
        this.graphics.y = y;
    }
    ;
}
;
class MainHero {
    constructor(app) {
        this.app = app;
        this.graphics = new PIXI.Graphics();
        this.graphics.fill(0xFF0000);
        this.graphics.circle(0, 0, 20);
        this.graphics.fill();
        this.graphics.x = 50;
        this.graphics.y = 50;
        this.app.stage.addChild(this.graphics);
    }
    ;
    setPosition(x, y) {
        this.graphics.x = x;
        this.graphics.y = y;
    }
}
;
class Game {
    constructor() {
        this.animals = [];
        this.app = new PIXI.Application();
        this.initializeGame();
    }
    ;
    initializeGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const { GAME_WIDTH, GAME_HEIGHT } = config;
            yield this.app.init({
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
            });
            document.body.appendChild(this.app.canvas);
            this.setupGame();
        });
    }
    ;
    setupGame() {
        this.createGameField();
        this.createYard();
        this.createMainHero();
        this.createScoreText();
        this.animals = [];
        this.score = 0;
        this.startNewGame();
        this.setupListeners();
        this.app.ticker.add(this.update.bind(this));
    }
    ;
    createGameField() {
        const { GAME_WIDTH, GAME_HEIGHT } = config;
        this.gameField = new PIXI.Graphics();
        this.gameField.fill(0x0B6E00);
        this.gameField.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.gameField.fill();
        this.app.stage.addChild(this.gameField);
    }
    ;
    createYard() {
        const { YARD_POSITION, YARD_SIZE } = config;
        const { X, Y } = YARD_POSITION;
        this.yard = new PIXI.Graphics();
        this.yard.fill(0xD1B01B);
        this.yard.rect(X, Y, YARD_SIZE, YARD_SIZE);
        this.yard.fill();
        this.app.stage.addChild(this.yard);
    }
    ;
    createMainHero() {
        this.mainHero = new MainHero(this.app);
    }
    ;
    createScoreText() {
        this.scoreText = new PIXI.Text({ text: 'Score: 0', style: { fill: '#FFFFFF' } });
        this.scoreText.position.set(10, 10);
        this.app.stage.addChild(this.scoreText);
    }
    ;
    onClick(event) {
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        this.mainHero.destination = clickPosition;
    }
    setupListeners() {
        this.gameField.interactive = true;
        this.gameField.on('pointerdown', this.onClick.bind(this));
    }
    update() {
        const { HERO_SPEED } = config;
        if (this.mainHero.destination) {
            const dx = this.mainHero.destination.x - this.mainHero.graphics.x;
            const dy = this.mainHero.destination.y - this.mainHero.graphics.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
                if (distance > 5) {
                    this.mainHero.graphics.x += dx / distance * HERO_SPEED;
                    this.mainHero.graphics.y += dy / distance * HERO_SPEED;
                }
                else {
                    this.mainHero.destination = null;
                }
            }
            else {
                this.mainHero.destination = null;
            }
        }
        let animalsFollowing = 0;
        this.animals.forEach(animal => {
            const { ANIMAL_SPEED, GROUP } = config;
            const dx = this.mainHero.graphics.x - animal.graphics.x;
            const dy = this.mainHero.graphics.y - animal.graphics.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (animalsFollowing < GROUP && distance < 100) {
                if (distance > 20) {
                    animal.graphics.x += dx / distance * ANIMAL_SPEED;
                    animal.graphics.y += dy / distance * ANIMAL_SPEED;
                    animalsFollowing++;
                }
            }
        });
        this.animals.forEach((animal, index) => {
            const { YARD_POSITION } = config;
            const { X, Y } = YARD_POSITION;
            if (animal.graphics.x > X && animal.graphics.y > Y) {
                this.score++;
                this.scoreText.text = `Score: ${this.score}`;
                this.animals.splice(index, 1);
                this.app.stage.removeChild(animal.graphics);
            }
            if (this.animals.length < 1) {
                this.startNewGame();
            }
        });
    }
    startNewGame() {
        const numberOfAnimals = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < numberOfAnimals; i++) {
            const animal = new Animal(this.app);
            animal.setPosition(Math.random() * 700, Math.random() * 500);
            this.animals.push(animal);
        }
    }
}
function startGame() {
    new Game();
}
startGame();

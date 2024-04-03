import * as PIXI from 'pixi.js';

interface Destination {
  x: number;
  y: number;
};

const config = {
  GAME_WIDTH: window.innerWidth,
  GAME_HEIGHT: window.innerHeight,
  YARD_POSITION: {
    X: window.innerWidth - 200,
    Y: window.innerHeight - 200,
  },
  GROUP: 5,
  HERO_SPEED: 5,
  ANIMAL_SPEED: 5,
};

class Animal {
  app;
  graphics: PIXI.Graphics;
  constructor(app: PIXI.Application) {
    this.app = app;
    this.graphics = new PIXI.Graphics();
    this.graphics.fill(0xFFFFFF);
    this.graphics.circle(0, 0, 15);
    this.graphics.fill();
    this.app.stage.addChild(this.graphics);
  }

  setPosition(x: number, y: number) {
    this.graphics.x = x;
    this.graphics.y = y;
  }
}

class MainHero {
  app;
  graphics: PIXI.Graphics;
  destination!: Destination | null;
  constructor(app: PIXI.Application) {
    this.app = app;
    this.graphics = new PIXI.Graphics();
    this.graphics.fill(0xFF0000);
    this.graphics.circle(0, 0, 20);
    this.graphics.fill();
    this.graphics.x = 50;
    this.graphics.y = 50;
    this.app.stage.addChild(this.graphics);
  }

  setPosition(x: number, y: number) {
    this.graphics.x = x;
    this.graphics.y = y;
  }
}

class Game {
  app: PIXI.Application<PIXI.Renderer>;
  animals: Animal[] = [];
  score!: number;
  gameField!: PIXI.Graphics;
  yard!: PIXI.Graphics;
  mainHero!: MainHero;
  scoreText!: PIXI.Text;
  constructor() {
    this.app = new PIXI.Application();
    this.initializeGame();
  }

  async initializeGame() {
    const { GAME_WIDTH, GAME_HEIGHT } = config;

    await this.app.init({
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
    });

    document.body.appendChild(this.app.canvas);
    this.setupGame();
  }

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

  createGameField() {
    this.gameField = new PIXI.Graphics();
    this.gameField.fill(0x0B6E00);
    this.gameField.rect(0, 0, config.GAME_WIDTH, config.GAME_HEIGHT);
    this.gameField.fill();
    this.app.stage.addChild(this.gameField);
  }

  createYard() {
    this.yard = new PIXI.Graphics();
    this.yard.fill(0xD1B01B);
    this.yard.rect(config.YARD_POSITION.X, config.YARD_POSITION.Y, 200, 200);
    this.yard.fill();
    this.app.stage.addChild(this.yard);
  }

  createMainHero() {
    this.mainHero = new MainHero(this.app);
  }

  createScoreText() {
    this.scoreText = new PIXI.Text('Score: 0', { fill: 0xFFFFFF });
    this.scoreText.position.set(10, 10);
    this.app.stage.addChild(this.scoreText);
  }

  onClick(event: PointerEvent) {
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
    if (this.mainHero.destination) {
      const dx = this.mainHero.destination.x - this.mainHero.graphics.x;
      const dy = this.mainHero.destination.y - this.mainHero.graphics.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 1) {
        if (distance > 5) {
          this.mainHero.graphics.x += dx / distance * config.HERO_SPEED;
          this.mainHero.graphics.y += dy / distance * config.HERO_SPEED;
        } else {
          this.mainHero.destination = null;
        }
      } else {
        this.mainHero.destination = null;
      }
    }

    let animalsFollowing = 0;

    this.animals.forEach(animal => {
      const dx = this.mainHero.graphics.x - animal.graphics.x;
      const dy = this.mainHero.graphics.y - animal.graphics.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (animalsFollowing < config.GROUP && distance < 100) {
        if (distance > 20) {
          animal.graphics.x += dx / distance * config.ANIMAL_SPEED;
          animal.graphics.y += dy / distance * config.ANIMAL_SPEED;
          animalsFollowing++;
        }
      }
    });

    this.animals.forEach((animal, index) => {
      if (animal.graphics.x > config.YARD_POSITION.X && animal.graphics.y > config.YARD_POSITION.Y) {
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

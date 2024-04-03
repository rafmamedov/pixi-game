# Herdsman Mini-Game Prototype

This project is a simple 2D prototype of a mini-game where the player controls a Main Hero to collect animals and move them to a designated destination point (yard). The game features a green game field where the player can interact, a red Main Hero circle representing the player's character, white circles representing animals, and a yellow destination point indicating the yard. The player's goal is to collect animals and move them to the yard to increase their score.

## Description
This project is a simple 2D prototype of a mini-game where the player controls a Main Hero to collect animals and move them to a designated destination point (yard). The game features a green game field where the player can interact, a red Main Hero circle representing the player's character, white circles representing animals, and a yellow destination point indicating the yard. The player's goal is to collect animals and move them to the yard to increase their score.

## Acceptance Criteria (AC)
- Player can run the application and see the game field (green area) with the Main Hero (red circle).
- Player can see a random number of animals (white circles) located on the game field at random positions.
- Player can see the destination point: yard (yellow area).
- Player can see the score value at the Top UI.
- Player can click on the game field, and the Main Hero must move to the click position.
- If the Main Hero moves close to an animal, it will follow the Main Hero, forming a group. The maximum number of animals in the group is 5.
- If an animal reaches the yard, the score counter is increased.

## Tools
- **Programming language:** TypeScript
- **Engines or rendering libraries:** PixiJs

## Object-Oriented Programming (OOP)
- **Classes Animal and MainHero:** These classes represent objects with attributes and methods that reflect their behavior. Classes help organize code, making it more understandable and maintainable.
- **Encapsulation:** Each class has a property (graphics) that is private and accessible only through public methods.
- **Polymorphism:** Each instance of the Animal and MainHero class can be added to the stage through a common interface.

## SOLID Principles
- **Single Responsibility Principle:** Each class is responsible for one specific aspect: Animal and MainHero handle their own graphics and behavior.
- **Open/Closed Principle:** The Animal and MainHero classes can be extended or modified without changing the Game class code.
- **Liskov Substitution Principle:** The Animal and MainHero classes can be used as substitutes for the base class PIXI.Graphics.
- **Interface Segregation Principle:** While JavaScript doesn't have a strict concept of interfaces, the Animal and MainHero classes implement a common interface through shared methods.

## Patterns and Best Practices
- **Factory Method:** Using the constructors of Animal and MainHero to create new objects.
- **Command Pattern:** Using event handlers (e.g., onClick) to invoke methods on corresponding objects.
- **Observer Pattern:** Using the add and remove methods to add and remove objects from the animals list, which is then observed by the update method.

## Code Style and Architectural Knowledge
- The code is formatted according to naming standards and other best practices.
- Using classes helps make the code more structured, easier to understand and allows to expand functionality.
- Employing an object-oriented approach improves readability, extensibility, and maintainability of the code.

## Usage
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Install the LiveServer extension in VSCode
4. Open `index.html` with LiveServer in browser.

## Contributors
- Rafael Mamedov - rafmamedov@gmail.com - [GitHub Profile](https://github.com/rafmamedov)

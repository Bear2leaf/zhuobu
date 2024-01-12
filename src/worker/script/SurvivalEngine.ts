import SeedableRandom from "./SeedableRandom.js";

export default class SurvivalEngine {
  private readonly SRNG = new SeedableRandom(566);
  private playerName: string;
  private playerHealth: number;
  private playerHunger: number;
  private playerThirst: number;
  private resources: number;
  private days: number = 1;

  constructor(playerName: string) {
    this.playerName = playerName;
    this.playerHealth = 100;
    this.playerHunger = 0;
    this.playerThirst = 0;
    this.resources = 0;
  }

  private printStatus(): void {
    console.log(`Player: ${this.playerName}`);
    console.log(`Health: ${this.playerHealth}`);
    console.log(`Hunger: ${this.playerHunger}`);
    console.log(`Thirst: ${this.playerThirst}`);
    console.log(`Resources: ${this.resources}`);
    console.log('------------------------');
  }

  private explore(): void {
    console.log('Exploring...');
    const foundResources = Math.floor(this.SRNG.nextFloat() * 5) + 1; // Random resources (adjust as needed)
    console.log(`You found ${foundResources} resources.`);
    this.resources += foundResources;

    // Add logic for other exploration events, challenges, etc.
  }

  private survive(): void {
    console.log(`Surviving ${this.days++} Day...`);
    this.playerHunger += 5;
    this.playerThirst += 5;
    this.playerHealth -= 10;

    // Add logic for managing hunger, thirst, and other survival aspects.
  }
  private rest(): void {
    console.log('Resting...');
    this.playerHealth += 5;

    // Add logic for other effects of resting
  }
  public play(): void {
    console.log('Welcome to the Survival Game!');
    console.log('------------------------');

    while (true) {
      this.printStatus();

      // Player options
      console.log('1. Explore');
      console.log('2. Rest');

      // User input
      const choice: string = this.SRNG.choice(['1', '2']);
      console.log(`You chose ${choice}.`);

      switch (choice) {
        case '1':
          this.explore();
          break;
        case '2':
          this.rest();
          break;
        default:
          console.log('Invalid choice. Please choose again.');
          continue;
      }
      this.survive();
      // Check if player has enough resources to survive
      if (this.resources >= 20) {
        console.log('You have enough resources to survive! Congratulations!');
        return;
      }
      // Check for game over condition
      if (this.playerHealth <= 0) {
        console.log('Game Over! Your character has died.');
        return;
      }
    }
  }
}


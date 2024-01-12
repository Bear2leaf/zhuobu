import SeedableRandom from "./SeedableRandom.js";

export default class SurvivalEngine {
  private SRNG: SeedableRandom;
  private playerName: string;
  private playerHunger: number;
  private playerThirst: number;
  private resources: number;
  private days: number = 1;
  private get playerHealth(): number {
    return 100 - Math.max(this.playerHunger, this.playerThirst) ;
  }

  constructor(playerName: string) {
    this.SRNG = new SeedableRandom();
    this.playerName = playerName;
    this.playerHunger = 0;
    this.playerThirst = 0;
    this.resources = 0;
  }
  private reset(): void {
    this.SRNG = new SeedableRandom();
    this.playerHunger = 0;
    this.playerThirst = 0;
    this.resources = 0;
    this.days = 1;
  }
  log: (message: string) => void = (message: string) => {
    console.log(message);
  }
  private printStatus(): void {
    this.log('------------------------');
    this.log(`Player: ${this.playerName}`);
    this.log(`Health: ${this.playerHealth}`);
    this.log(`Hunger: ${this.playerHunger}`);
    this.log(`Thirst: ${this.playerThirst}`);
    this.log(`Resources: ${this.resources}`);
  }

  private explore(): void {
    this.log('Exploring...');
    const foundResources = Math.floor(this.SRNG.nextFloat() * 5) + 1; // Random resources (adjust as needed)
    this.log(`You found ${foundResources} resources.`);
    this.resources += foundResources;

    // Add logic for other exploration events, challenges, etc.
  }

  private survival(): void {
    this.log('------------------------');
    this.log(`Survived ${this.days++} Day...`);
    this.playerHunger += 5;
    this.playerThirst += 5;

    // Add logic for managing hunger, thirst, and other survival aspects.
  }
  private rest(): void {
    this.log('Resting...');
    const consumedResources = Math.floor(this.SRNG.nextFloat() * 5) + 1; // Random resources consumed (adjust as needed)
    if (this.resources >= consumedResources) {
      this.log(`You consumed ${consumedResources} resources.`);
      this.resources -= consumedResources;
      const recoveredHunger = Math.floor(this.SRNG.nextFloat() * 10) + 5; // Random hunger recovered (adjust as needed)
      this.log(`You recover ${recoveredHunger} hunger.`);
      this.playerHunger -= recoveredHunger;
      const recoveredThirst = Math.floor(this.SRNG.nextFloat() * 10) + 5; // Random thirst recovered (adjust as needed)
      this.log(`You recover ${recoveredThirst} thirst.`);
      this.playerThirst -= recoveredThirst;
    }

    // Add logic for other effects of resting
  }
  public start(): void {
    this.reset();
    this.log('Welcome to the Survival Game!');
    this.log('------------------------');

    while (true) {
      this.printStatus();

      // Player options
      this.log('1. Explore');
      this.log('2. Rest');

      // User input
      const choice: string = this.SRNG.choice(['1', '2', '3']);
      this.log(`You chose ${choice}.`);

      switch (choice) {
        case '1':
          this.explore();
          break;
        default:
          this.rest();
          break;
      }
      this.survival();
      // Check if player has enough resources to survive
      if (this.resources >= 20) {
        this.log('You have enough resources to survive! Congratulations!');
        return;
      }
      // Check for game over condition
      if (this.playerHealth <= 0) {
        this.log('Game Over! Your character has died.');
        return;
      }
    }
  }
}


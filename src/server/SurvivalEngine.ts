import SeedableRandom from "../map/SeedableRandom.js";

export default class SurvivalEngine {
  private readonly totalResources: number = 50;
  private SRNG: SeedableRandom;
  private playerName: string;
  private playerHunger: number;
  private playerThirst: number;
  private resources: number;
  private days: number = 0;
  private get playerHealth(): number {
    return 100 - Math.max(this.playerHunger, this.playerThirst);
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
  private printStatus(): void {
    this.log('------------------------');
    this.log(`Player: ${this.playerName}`);
    this.log(`Health: ${this.playerHealth}`);
    this.log(`Hunger: ${this.playerHunger}`);
    this.log(`Thirst: ${this.playerThirst}`);
    this.log(`Resources: ${this.resources}`);
    this.updateStatus([
      `Player: ${this.playerName}`,
      `Health: ${this.playerHealth}`,
      `Hunger: ${this.playerHunger}`,
      `Thirst: ${this.playerThirst}`,
      `Resources: ${this.resources}`,
    ].join('\n'));
    this.updateResourceProgres(this.resources / this.totalResources);
  }

  private explore(): void {
    this.log('Exploring...');
    const foundResources = Math.floor(this.SRNG.nextFloat() * 5); // Random resources (adjust as needed)
    this.log(`You found ${foundResources} resources.`);
    this.resources += foundResources;

    // Add logic for other exploration events, challenges, etc.
  }

  survival(choice: '1' | '2'): void {
    this.updateEagleVisible(false);
    this.updateWhalesVisible(false);
    // Player options
    this.log('1. Explore');
    this.log('2. Rest');

    // User input
    // const choice: string = this.SRNG.choice(['1', '2', '3']);
    this.log(`You chose ${choice}.`);

    switch (choice) {
      case '1':
        this.explore();
        break;
      default:
        this.rest();
        break;
    }
    this.log('------------------------');
    this.log(`Survived ${this.days} Day...`);
    this.addMessage(`Survived ${this.days++} Day...`);
    this.playerHunger += 5;
    this.playerHunger = Math.min(this.playerHunger, 100);
    this.playerThirst += 5;
    this.playerThirst = Math.min(this.playerThirst, 100);

    this.printStatus();
    // Add logic for managing hunger, thirst, and other survival aspects.
    if (this.resources >= this.totalResources) {
      // Check if player has enough resources to survive
      this.addMessage('You have enough\nresources to survive!\nCongratulations!');
      this.log('You have enough resources to survive! Congratulations!');
      this.updateWhalesVisible(true);
    } else if (this.playerHealth <= 0) {
      // Check for game over condition
      this.addMessage('Game Over!\nYour character has died.');
      this.log('Game Over! Your character has died.');
      this.updateEagleVisible(true);
    }

  }
  private rest(): void {
    this.log('Resting...');
    let consumedResources = Math.floor(this.SRNG.nextFloat() * 5) + 2; // Random resources consumed (adjust as needed)
    consumedResources = Math.min(this.resources, consumedResources);
    this.log(`You consumed ${consumedResources} resources.`);
    this.resources -= consumedResources;
    const recoveredHunger = Math.floor(this.SRNG.nextFloat() * 5) + 5 * consumedResources; // Random hunger recovered (adjust as needed)
    this.log(`You recover ${recoveredHunger} hunger.`);
    this.playerHunger -= recoveredHunger;
    this.playerHunger = Math.max(this.playerHunger, 0);
    const recoveredThirst = Math.floor(this.SRNG.nextFloat() * 5) + 5 * consumedResources; // Random thirst recovered (adjust as needed)
    this.log(`You recover ${recoveredThirst} thirst.`);
    this.playerThirst -= recoveredThirst;
    this.playerThirst = Math.max(this.playerThirst, 0);


    // Add logic for other effects of resting
  }
  public log: (message: string) => void = (message: string) => {
    console.log(message);
  }
  public addMessage: (message: string) => void = (message: string) => {
    console.log(message);
  }
  public updateStatus: (message: string) => void = (message: string) => {
    console.log(message);
  }
  public updateEagleVisible: (visible: boolean) => void = (visible: boolean) => {
    console.log("updateEagleVisible", visible);
  }
  public updateWhalesVisible: (visible: boolean) => void = (visible: boolean) => {
    console.log("updateWhalesVisible", visible);
  }
  public updateResourceProgres: (progress: number) => void = (progress: number) => {
    console.log("updateResourceProgres", progress);
  }
  public start(): void {
    this.reset();
    this.log('Welcome to the Survival Game!');
    this.addMessage('Welcome to\nthe Survival Game!');
    this.log('------------------------');

  }
}


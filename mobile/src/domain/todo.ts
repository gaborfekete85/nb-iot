export class Todo {
  constructor(description:string) {
    this.description = description;
    this.isComplete = false;
  }

  _id:number;
  description:string;
  isComplete:boolean;
}

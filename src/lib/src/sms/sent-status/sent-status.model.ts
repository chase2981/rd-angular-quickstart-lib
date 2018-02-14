import { SentStatus } from './sent-status';

export class SentStatusModel implements SentStatus {
  id?: number = null;
  name: string = null;


  constructor(args?: any){
    for(let key in args)
      this[key] = args[key];
  }

}

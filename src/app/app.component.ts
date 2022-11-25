import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  totalAmt = 100;
  betAmt = [];
  dicenum = null;
  remainingTime = 10;
  plusAmt: any = 0;
  lossAmt: any = 0;
  disbleActions: boolean;
diceSize: any[]=[];

  constructor() {}

  ngOnInit() {
    this.clearVlas();
    this.timeDisply();
  }

  clearVlas(): void {
    this.disbleActions = false;
    // this.totalAmt = 100;
    this.betAmt = [];
    this.dicenum = null;
    this.remainingTime = 10;
    this.plusAmt = 0;
    this.lossAmt = 0;
  }
  start(): void {
    this.ngOnInit();
  }

  timeDisply(): void {
    setTimeout(() => {
      if (this.remainingTime > 0) {
        this.remainingTime = this.remainingTime - 1;
        this.timeDisply();
      } else {
        this.disbleActions = true;
        setTimeout(() => {
          this.getDiceNum();
        }, 2000);
      }
    }, 1000);
  }

  addBetAmt(indx: number): void {
    if (this.totalAmt) {
      this.betAmt[indx] = this.betAmt[indx] ? this.betAmt[indx] + 1 : 1;
      // const minAmt = this.betAmt.reduce((x, y) => x + y, 0);
      this.totalAmt = this.totalAmt - 1;
    } else {
      console.log('Low Balance ! Please Load Amount');
    }
  }

  getDiceNum(): void {
    this.dicenum = Math.floor(Math.random() * 6) + 1;
    for(let i=1;i<=this.dicenum;i++){
      this.diceSize.push(i);
    }

    if (this.betAmt[this.dicenum - 1]) {
      this.plusAmt =
        this.betAmt[this.dicenum - 1] + this.betAmt[this.dicenum - 1];
      this.totalAmt = this.totalAmt + this.plusAmt;
    }
    this.betAmt.forEach((each, indx) => {
      if (this.dicenum != indx + 1 && each) {
        // console.log(this.dicenum)
        // console.log(each)
        this.lossAmt = this.lossAmt + this.betAmt[indx];
        // console.log(this.lossAmt);
        // this.totalAmt=100-this.lossAmt;
      }
    });
    setTimeout(() => {
      this.dicenum = null;
      // this.ngOnInit();
    }, 5000);
  }
}

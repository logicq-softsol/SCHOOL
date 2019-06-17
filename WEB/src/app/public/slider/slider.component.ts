import { DataService } from '../slider/data.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {Result} from './result';
import { interval, Subscription } from 'rxjs';


const source = interval(10000);
const subscribe = source.subscribe(val => console.log(val));

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class SliderComponent implements OnInit ,OnDestroy{
  sliderArray: object[];
  transform: number;
  selectedIndex = 0;
  subscription: Subscription;


  constructor(private data: DataService) {
    this.sliderArray = [];
    this.selectedIndex = 0;
    this.transform = 100;
    
  }

  ngOnInit() {
    this.data.getData().subscribe((result: Result) => {
      this.sliderArray = result.sliderArray;
    });
    this.subscription = source.subscribe(() => this.selected(this.selectedIndex));
  }

 

  selected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
   }

   keySelected(x) {
    this.downSelected(x);
    this.selectedIndex = x;
  }

   downSelected(i) {
   this.transform =  100 - (i) * 50;
     this.selectedIndex = this.selectedIndex + 1;
     if (this.selectedIndex > 4) {
       this.selectedIndex = 0;
     }
   }

  
   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

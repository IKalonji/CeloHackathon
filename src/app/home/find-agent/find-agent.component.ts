import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';


@Component({
  selector: 'app-find-agent',
  templateUrl: './find-agent.component.html',
  styleUrls: ['./find-agent.component.scss'],
})
export class FindAgentComponent implements OnInit {
  
  @ViewChild('map') mapView: ElementRef;

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.createMap();
  }

  createMap(){
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    console.log(boundingRect);

    CapacitorGoogleMaps.create({
        width: Math.round(boundingRect.width),
        height: Math.round(boundingRect.height),
        x: Math.round(boundingRect.x),
        y: Math.round(boundingRect.y),
        // latitude?: number;
        // longitude?: number;
        zoom: 5,
        // liteMode?: boolean;
    })
  }

}

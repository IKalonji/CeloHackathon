import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';


declare var google: any;

@Component({
  selector: 'app-find-agent',
  templateUrl: './find-agent.component.html',
  styleUrls: ['./find-agent.component.scss'],
})
export class FindAgentComponent implements OnInit {

  map: any
  
  @ViewChild('map', {read: ElementRef, static: false}) mapView: ElementRef;

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.createMap();
  }

  createMap(){
    const location = new google.maps.LatLng(-26.205079869889012, 28.040192326813784)
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapView.nativeElement, options);
  }

}

//FIND AGENT API KEY AIzaSyCcB9HkupuiNaoD-mmjZ-6X4MzsN-AY7AA

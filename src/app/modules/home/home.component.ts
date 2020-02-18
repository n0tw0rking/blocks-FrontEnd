import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three-full'
import ScrollMagic from "scrollmagic"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild("rendererContainer", { static: false })
  rendererContainer: ElementRef;
  // renderer;
  // material = null;
  scene = null;
  // mesh = null;
  // camera = null;
  // geometry = null
  // textureCube = null
  // cube;
  controller;
  constructor() {
    this.controller = new ScrollMagic.Scene({
      triggerElement: "#trigger1",
      triggerHook: 0.9, // show, when scrolled 10% into view
      duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
      offset: 50 // move trigger to center of element
    })
      .setClassToggle("#reveal1", "visible") // add class to reveal
      .addIndicators() // add indicators (requires plugin)
      .addTo(this.controller);
    //   // create a temp holder to save the canvas outside of canvas
    //   var tempHolder = document.createElement('div');
    //   tempHolder.style.display = 'none';
    //   window.document.body.appendChild(tempHolder);


    //   this.scene = new THREE.Scene();
    //   this.camera = new THREE.PerspectiveCamera(
    //     75,
    //     window.innerWidth / window.innerHeight,
    //     0.1,
    //     1000
    //   );
    //   this.renderer = new THREE.WebGLRenderer();
    //   this.camera.position.z = 15;
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   document.body.appendChild(this.renderer.domElement);
    //   console.log(this.rendererContainer)
    //   // this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    //   this.geometry = new THREE.BoxGeometry(1, 1, 1);
    //   this.material = new THREE.MeshBasicMaterial({
    //     color: 0xf7f7f7,
    //     // envMap: textureCube 
    //   });
    //   this.cube = new THREE.Mesh(this.geometry, this.material);
    //   this.scene.add(this.cube);

  }
  ngOnInit() { }
  // ngAfterViewInit() {
  //   this.cube.position.x = -10
  //   this.cube.position.y = -6
  //   this.renderer.setSize(window.innerWidth, window.innerHeight);
  //   // this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  //   this.animate();
  // }
  // animate() {
  //   window.requestAnimationFrame(() => this.animate());
  //   this.cube.position.x = this.camera.position.x - 10
  //   this.cube.position.y = this.camera.position.y - 10
  //   this.cube.rotation.y += 0.01;
  //   this.renderer.render(this.scene, this.camera);
  // }
  // @HostListener("window:resize", ["$event"])
  // onWindowResize(event) {
  //   console.log
  //   this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  //   this.camera.aspect = window.innerWidth / window.innerHeight;
  //   this.camera.updateProjectionMatrix();
  // }
}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  @ViewChild("rendererContainer", { static: false })
  rendererContainer: ElementRef;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  mouse = new THREE.Vector2(0, 0);
  raycaster = new THREE.Raycaster();
  geometry = new THREE.BoxGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  scene = null;
  camera = null;
  mesh;
  light = null;
  light1 = null;
  intersects = null;
  tl = null;

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.z = 1000;
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    // new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   wireframe: true
    // });
    for (let i = 0; i < 9; i++) {
      this.mesh[i] = new THREE.Mesh(this.geometry, this.material);
      this.mesh[i].position.x = (Math.random() - 0.5) * 10;
      this.mesh[i].position.y = (Math.random() - 0.5) * 10;
      this.mesh[i].position.z = (Math.random() - 0.5) * 10;
      this.scene.add(this.mesh[i]);
    }
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
  ngOnInit() {
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect(window.innerWidth / window.innerHeight);
      this.camera.updateProjectMatrix();
    });
    // function that I will do make the boxes shake
    // window.addEventListener("mouseover", this.mouseover);
  }
  //   mouseover(event) {
  //     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //     this.intersects = this.raycaster.setFromCamera(this.mouse, this.camera);
  //     for (let i = 0; i < this.intersects.length; i++) {
  //       this.tl = new GSAP.TimelineMax();
  //       console.log("here");
  //       this.tl.to(this.intersects[i].object.scale, 1, {
  //         x: 2,
  //         ease: Expo.easeOut
  //       });
  //       this.tl.to(this.intersects[i].object.scale, 0.5, {
  //         x: 0.5,
  //         ease: Expo.easeOut
  //       });
  //       this.tl.to(this.intersects[i].object.position, 0.5, {
  //         x: 2,
  //         ease: Expo.easeOut
  //       });
  //       this.tl.to(
  //         this.intersects[i].object.rotation,
  //         0.5,
  //         { y: Math.PI * 0.5, ease: Expo.easeOut },
  //         "=-1.5"
  //       );
  //     }
  //   }
  // }
}

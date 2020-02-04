import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import * as THREE from "three-full";
import { TimelineMax } from "gsap";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  @ViewChild("rendererContainer", { static: false })
  rendererContainer: ElementRef;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene = null;
  mouse;
  raycaster;
  geometry = null;
  material = null;
  camera = null;
  mesh = null;
  light = null;
  light1 = null;
  intersects = null;
  tl = null;
  mixer = null;
  clips = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.raycaster = new THREE.Raycaster();
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({
      color: this.getRandomColor()
    });
    // new THREE.MeshBasicMaterial({
    //   color: 0x00ff00,
    //   wireframe: true
    // });
    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 0);
    this.scene.add(light);
    var light1 = new THREE.PointLight(0xffffff, 2, 1000);
    light1.position.set(0, 0, 25);
    this.scene.add(light1);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mouse = new THREE.Vector2();
  }
  ngAfterViewInit() {
    for (let i = 0; i < 9; i++) {
      this.mesh[i] = new THREE.Mesh(this.geometry, this.material);
      this.mesh[i].material.color.set(this.getRandomColor());
      this.mesh[i].position.x = (Math.random() - 0.5) * 10;
      this.mesh[i].position.y = (Math.random() - 0.5) * 10;
      this.mesh[i].position.z = (Math.random() - 0.5) * 10;

      this.scene.add(this.mesh[i]);
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("#e5e5e5");
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  animate() {
    window.requestAnimationFrame(() => this.animate());
    for (let i = 0; i < 9; i++) {
      this.mesh[i].rotation.x += 0.001;
      this.mesh[i].rotation.y += 0.002;
      this.mesh[i].rotation.z += 0.001;
    }
    this.renderer.render(this.scene, this.camera);
  }
  ngOnInit() {
    // this.animate();
  }
  @HostListener("window:mousemove", ["$event"])
  onMouseOver(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < this.intersects.length; i++) {
      this.tl = new TimelineMax();
      this.tl
        .to(this.intersects[i].object.position, 1, {
          repeat: 5,
          yoyo: true,
          ease: Expo.easeInOut,
          z: 1.5,
          y: 1.5,
          x: 1.5
        })
        .to(this.intersects[i].object.position, 1, {
          z: Math.random() * 5,
          x: Math.random() * 5,
          y: Math.random() * 5,
          ease: Expo.easeOut
        })
        .to(this.intersects[i].object.material.color, 1, {
          repeat: 5,
          ease: Sine.easeInOut,
          fill: this.getRandomColor()
        });
    }
  }
  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    this.camera.aspect = event.target.innerWidth / event.target.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }
}

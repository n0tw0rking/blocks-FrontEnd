import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from "@angular/core";
import * as THREE from "three";
import * as GSAP from "gsap";
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
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xf7f7f7
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.light = new THREE.PointLight(0xff0000, 1, 100);
    this.light.position.set(0, 0, 100);
    this.scene.add(this.light);
    this.light1 = new THREE.PointLight(0xff0000, 25, 100);
    this.light1.position.set(0, 0, 100);
    this.scene.add(this.light1);
    this.scene.add(this.mesh);
  }
  ngAfterViewInit() {
    for (let i = 0; i < 9; i++) {
      this.mesh[i] = new THREE.Mesh(this.geometry, this.material);
      this.mesh[i].position.x = (Math.random() - 0.5) * 10;
      this.mesh[i].position.y = (Math.random() - 0.5) * 10;
      this.mesh[i].position.z = (Math.random() - 0.5) * 10;
      this.scene.add(this.mesh[i]);
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setClearColor("#e5e5e5");
    this.light = new THREE.PointLight(0xff0000, 1, 100);
    this.light.position.set(0, 0, 100);
    this.scene.add(this.light);
    this.light1 = new THREE.PointLight(0xff0000, 3, 100);
    this.light1.position.set(0, 0, 100);
    this.scene.add(this.light1);
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    for (let i = 0; i < 9; i++) {
      this.mesh[i].rotation.x += 0.00155;
      this.mesh[i].rotation.y += 0.001;
      this.renderer.render(this.scene, this.camera);
    }
  }
  ngOnInit() {}
  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }
  @HostListener("window:click", ["$event"])
  onWindowClick(event) {
    this.click(event);
  }
  click(event) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.intersects = this.raycaster.setFromCamera(this.mouse, this.camera);
    console.log(this.intersects);
    for (let i = 0; i < this.intersects.length; i++) {
      this.tl = new GSAP.TimelineMax();
      this.tl.to(this.intersects[i].object.scale, 1, {
        x: 2,
        ease: Expo.easeOut
      });
      this.tl.to(this.intersects[i].object.scale, 0.5, {
        x: 0.5,
        ease: Expo.easeOut
      });
      this.tl.to(this.intersects[i].object.position, 0.5, {
        x: 2,
        ease: Expo.easeOut
      });
      this.tl.to(
        this.intersects[i].object.rotation,
        0.5,
        { y: Math.PI * 0.5, ease: Expo.easeOut },
        "=-1.5"
      );
    }
  }
}

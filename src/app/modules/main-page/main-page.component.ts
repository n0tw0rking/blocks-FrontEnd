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
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mouse = new THREE.Vector2();
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
    this.renderer.setClearColor("#f7f7f7");
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    console.log(intersects);
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000);
    }
    for (let i = 0; i < 9; i++) {
      this.mesh[i].rotation.x += 0.001;
      this.mesh[i].rotation.y -= 0.002;
      this.mesh[i].rotation.z -= 0.001;
    }
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => this.animate());
  }
  ngOnInit() {
    this.animate();
  }
  @HostListener("window:mousemove", ["$event"])
  onMouseOver(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(this.mouse);
  }
  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    this.camera.aspect = event.target.innerWidth / event.target.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }
  click(event) {
    // this.tl = GSAP.timeline();
    // for (let i = 0; i < this.intersects.length; i++) {
    //   this.intersects[i].object.material.color.set(0xff0000);
    // this.tl.to(this.intersects[i].object.scale, 1, {
    //   x: 2,
    //   ease: Expo.easeOut
    // });
    // this.tl.to(this.intersects[i].object.scale, 0.5, {
    //   x: 0.5,
    //   ease: Expo.easeOut
    // });
    // this.tl.to(this.intersects[i].object.position, 0.5, {
    //   x: 2,
    //   ease: Expo.easeOut
    // });
    // this.tl.to(
    //   this.intersects[i].object.rotation,
    //   0.5,
    //   { y: Math.PI * 0.5, ease: Expo.easeOut },
    //   "=-1.5"
    // );
    // }
    // this.renderer.render(this.scene, this.camera);
  }
}

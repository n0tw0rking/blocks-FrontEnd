import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit
} from "@angular/core";
import * as THREE from "three-full";
// import GSAP from "gsap";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild("rendererContainer", { static: false })
  rendererContainer: ElementRef;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  material = null;
  scene = null;
  mesh = null;
  camera = null;
  geometry = null
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ); this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.camera.position.z = 5;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xf7f7f7
    });
    this.scene.add(this.mesh);
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.setClearColor("#e5e5e5");
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }
  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
    // this.raycaster.setFromCamera(this.mouse, this.camera);
  }
  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();
  }
}

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DirectionalLightHelper, PointLightHelper } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight( 0xffffff,1 );
scene.add( ambient );

const directionalLight = new THREE.DirectionalLight( 0xffffff, .5 );
directionalLight.position.set( 2, 1, 1 );
scene.add( directionalLight );


const helper = new THREE.DirectionalLightHelper( directionalLight, 2 );
scene.add( helper );

const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 1, -2, 1 );
scene.add( light );

const helper2 = new THREE.PointLightHelper( light, 1 );
scene.add( helper2 );

const geometry = new THREE.BoxGeometry(2, 1.8, 2);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .8, metalness: .3});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  
controls.dampingFactor = 0.25;  
controls.enableZoom = true;     

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);  
}

animate();
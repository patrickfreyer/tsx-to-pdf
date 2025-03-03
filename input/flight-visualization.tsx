import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Airport coordinates (latitude, longitude)
const airports = {
  "Muscat": [23.5859, 58.4059],
  "Doha": [25.2854, 51.5310],
  "Frankfurt": [50.0379, 8.5622],
  "Munich": [48.3537, 11.7860],
  "Düsseldorf": [51.2895, 6.7668],
  "Vienna": [48.1200, 16.5700],
  "Riyadh": [24.9708, 46.7484],
  "Dubai": [25.2532, 55.3657],
  "Kuwait": [29.2403, 47.9698],
  "Dammam": [26.4207, 50.0888],
  "Washington DC": [38.9072, -77.0369],
  "Abu Dhabi": [24.4539, 54.6778],
  "Tabuk": [28.3835, 36.5662],
  "Zurich": [47.4502, 8.5616],
  "Arar": [30.9750, 41.0382],
  "Budapest": [47.4979, 19.0402],
  "Dublin": [53.4264, -6.2499],
  "Brussels": [50.9010, 4.4856],
  "Berlin": [52.5200, 13.4050],
  "Hanoi": [21.0285, 105.8542],
  "Da Nang": [16.0544, 108.2022],
  "Ho Chi Minh": [10.8231, 106.6297],
  "Phu Quoc": [10.2276, 103.9809],
  "Hamburg": [53.6302, 10.0041],
  "London": [51.5074, -0.1278],
  "Almaty": [43.2551, 76.9126],
  // New airports for 2022 flights
  "Nursultan": [51.0924, 71.4304],
  "New York": [40.7128, -74.0060],
  "Panama": [8.9824, -79.5199],
  "Montevideo": [-34.9011, -56.1645],
  "Stockholm": [59.3293, 18.0686],
  "Copenhagen": [55.6761, 12.5683],
  "San Francisco": [37.7749, -122.4194],
  "Oakland": [37.8044, -122.2712],
  "Big Island": [19.8968, -155.5828],
  "Honolulu": [21.3069, -157.8583],
  "Köln": [50.9375, 6.9603],
  // New airports for 2024 flights
  "Seattle": [47.6062, -122.3321],
  "Barcelona": [41.3851, 2.1734],
  "Bodrum": [37.0343, 27.4305],
  "Hong Kong": [22.3193, 114.1694],
  "Chengdu": [30.5728, 103.8652],
  "Denver": [39.7392, -104.9903],
  "Beijing": [39.9042, 116.4074],
  "Shenzhen": [22.5431, 114.0579],
  "Toronto": [43.6532, -79.3832],
  "Halifax": [44.6488, -63.5752]
};

// Flight data
const flights = [
  // 2023 flights
  ["Muscat", "Doha", "Jan", "Qatar"],
  ["Doha", "Frankfurt", "Jan", "Qatar"],
  ["Munich", "Düsseldorf", "Jan", "Lufthansa"],
  ["Düsseldorf", "Munich", "Jan", "Lufthansa"],
  ["Munich", "Vienna", "Feb", "Lufthansa"],
  ["Vienna", "Munich", "Feb", "Lufthansa"],
  ["Munich", "Frankfurt", "Feb", "Lufthansa"],
  ["Frankfurt", "Riyadh", "Feb", "Lufthansa"],
  ["Riyadh", "Frankfurt", "Mar", "Lufthansa"],
  ["Frankfurt", "Munich", "Mar", "Lufthansa"],
  ["Munich", "Frankfurt", "Mar", "Lufthansa"],
  ["Frankfurt", "Riyadh", "Mar", "Lufthansa"],
  ["Riyadh", "Dubai", "Mar", "FlyDubai"],
  ["Dubai", "Riyadh", "Mar", "Saudi"],
  ["Riyadh", "Dubai", "Mar", "Emirates"],
  ["Dubai", "Kuwait", "Mar", "Emirates"],
  ["Kuwait", "Riyadh", "Mar", "Saudi"],
  ["Riyadh", "Frankfurt", "Apr", "Lufthansa"],
  ["Frankfurt", "Riyadh", "Apr", "Lufthansa"],
  ["Riyadh", "Dammam", "Apr", "Saudi"],
  ["Dammam", "Riyadh", "Apr", "Saudi"],
  ["Riyadh", "Frankfurt", "Apr", "Lufthansa"],
  ["Frankfurt", "Munich", "Apr", "Lufthansa"],
  ["Munich", "Frankfurt", "Apr", "Lufthansa"],
  ["Frankfurt", "Washington DC", "Apr", "United"],
  ["Washington DC", "Munich", "May", "United"],
  ["Munich", "Frankfurt", "May", "Lufthansa"],
  ["Frankfurt", "Riyadh", "May", "Lufthansa"],
  ["Riyadh", "Doha", "May", "Qatar"],
  ["Doha", "Abu Dhabi", "May", "Qatar"],
  ["Abu Dhabi", "Riyadh", "May", "Etihad"],
  ["Riyadh", "Frankfurt", "May", "Lufthansa"],
  ["Frankfurt", "Munich", "May", "Lufthansa"],
  ["Munich", "Frankfurt", "May", "Lufthansa"],
  ["Frankfurt", "Dubai", "May", "Lufthansa"],
  ["Doha", "Riyadh", "May", "Qatar"],
  ["Riyadh", "Tabuk", "May", "Saudia"],
  ["Tabuk", "Riyadh", "May", "Saudia"],
  ["Riyadh", "Dubai", "May", "Saudia"],
  ["Dubai", "Zurich", "May", "Swiss"],
  ["Zurich", "Munich", "May", "Swiss"],
  ["Munich", "Frankfurt", "June", "Lufthansa"],
  ["Frankfurt", "Riyadh", "June", "Lufthansa"],
  ["Riyadh", "Dubai", "June", "Saudia"],
  ["Dubai", "Riyadh", "June", "Saudia"],
  ["Riyadh", "Arar", "June", "Saudia"],
  ["Arar", "Riyadh", "June", "Saudia"],
  ["Riyadh", "Dubai", "June", "Saudia"],
  ["Dubai", "Tabuk", "June", "Saudia"],
  ["Tabuk", "Dubai", "June", "Saudia"],
  ["Dubai", "Zurich", "June", "Swiss"],
  ["Zurich", "Munich", "June", "Swiss"],
  ["Munich", "Zurich", "July", "Swiss"],
  ["Zurich", "Dubai", "July", "Swiss"],
  ["Abu Dhabi", "Riyadh", "July", "Etihad"],
  ["Riyadh", "Frankfurt", "July", "Lufthansa"],
  ["Frankfurt", "Riyadh", "July", "Lufthansa"],
  ["Riyadh", "Muscat", "July", "Omanair"],
  ["Muscat", "Dubai", "July", "Omanair"],
  ["Dubai", "Dammam", "July", "Saudia"],
  ["Dammam", "Riyadh", "July", "Saudia"],
  ["Riyadh", "Frankfurt", "July", "Lufthansa"],
  ["Frankfurt", "Munich", "July", "Lufthansa"],
  ["Munich", "Budapest", "July", "Austrian"],
  ["Budapest", "Vienna", "August", "Austrian"],
  ["Vienna", "Munich", "August", "Austrian"],
  ["Munich", "Dublin", "August", "Air Lingus"],
  ["Dublin", "Munich", "August", "Air Lingus"],
  ["Munich", "Zurich", "August", "Swiss"],
  ["Zurich", "Dubai", "August", "Swiss"],
  ["Dubai", "Riyadh", "August", "Saudia"],
  ["Riyadh", "Dubai", "August", "Saudia"],
  ["Dubai", "Frankfurt", "August", "Lufthansa"],
  ["Frankfurt", "Munich", "August", "Lufthansa"],
  ["Munich", "Brussels", "September", "Lufthansa"],
  ["Brussels", "Munich", "September", "Lufthansa"],
  ["Munich", "Zurich", "September", "Swiss"],
  ["Zurich", "Dubai", "September", "Swiss"],
  ["Dubai", "Riyadh", "September", "Saudia"],
  ["Riyadh", "Dubai", "September", "Saudia"],
  ["Dubai", "Riyadh", "September", "Emirates"],
  ["Riyadh", "Dubai", "October", "FlyDubai"],
  ["Dubai", "Frankfurt", "October", "Lufthansa"],
  ["Frankfurt", "Munich", "October", "Lufthansa"],
  ["Munich", "Vienna", "November", "Lufthansa"],
  ["Vienna", "Berlin", "November", "Lufthansa"],
  ["Berlin", "Munich", "November", "Lufthansa"],
  ["Munich", "Berlin", "November", "Lufthansa"],
  ["Berlin", "Munich", "November", "Lufthansa"],
  ["Munich", "Doha", "November", "Qatar"],
  ["Doha", "Hanoi", "November", "Qatar"],
  ["Hanoi", "Da Nang", "December", "Vietjet"],
  ["Da Nang", "Ho Chi Minh", "December", "Bamboo Airways"],
  ["Ho Chi Minh", "Phu Quoc", "December", "Vietjet"],
  ["Phu Quoc", "Hanoi", "December", "Vietjet"],
  ["Hanoi", "Doha", "December", "Qatar"],
  ["Doha", "Munich", "December", "Qatar"],
  ["Munich", "Hamburg", "December", "Lufthansa"],
  ["Hamburg", "Munich", "December", "Lufthansa"],
  ["Munich", "London", "December", "Lufthansa"],
  ["London", "Munich", "December", "Lufthansa"],
  ["Frankfurt", "Doha", "December", "Qatar"],
  ["Doha", "Almaty", "December", "Qatar"],
  // 2022 flights
  ["Nursultan", "Frankfurt", "Jan", "Lufthansa"],
  ["Frankfurt", "New York", "Jan", "Singapore Airlines"],
  ["New York", "Panama", "Mar", "Copa Airlines"],
  ["Panama", "Montevideo", "Mar", "Copa Airlines"],
  ["Montevideo", "Panama", "Mar", "Copa Airlines"],
  ["Panama", "New York", "Mar", "Copa Airlines"],
  ["New York", "Frankfurt", "June", "Singapore Airlines"],
  ["Munich", "Stockholm", "July", "Lufthansa"],
  ["Stockholm", "Munich", "July", "Lufthansa"],
  ["Munich", "Copenhagen", "July", "Lufthansa"],
  ["Copenhagen", "Munich", "July", "Lufthansa"],
  ["Munich", "Copenhagen", "July", "Lufthansa"],
  ["Copenhagen", "Munich", "July", "Lufthansa"],
  ["Munich", "Copenhagen", "July", "Lufthansa"],
  ["Copenhagen", "Munich", "July", "Lufthansa"],
  ["Munich", "Berlin", "July", "Lufthansa"],
  ["Frankfurt", "San Francisco", "August", "Condor"],
  ["Oakland", "Big Island", "August", "Southwest"],
  ["Big Island", "Honolulu", "August", "Southwest"],
  ["Honolulu", "Oakland", "August", "Southwest"],
  ["San Francisco", "Frankfurt", "August", "Condor"],
  ["Munich", "Düsseldorf", "September", "Eurowings"],
  ["Düsseldorf", "London", "September", "Eurowings"],
  ["London", "Köln", "September", "Eurowings"],
  ["Köln", "Munich", "September", "Eurowings"],
  ["Munich", "Düsseldorf", "October", "Lufthansa"],
  ["Düsseldorf", "Munich", "October", "Lufthansa"],
  ["Munich", "Düsseldorf", "October", "Lufthansa"],
  ["Düsseldorf", "Munich", "October", "Lufthansa"],
  ["Munich", "Düsseldorf", "October", "Lufthansa"],
  ["Düsseldorf", "Munich", "October", "Lufthansa"],
  ["Munich", "Düsseldorf", "October", "Lufthansa"],
  ["Düsseldorf", "Munich", "October", "Lufthansa"],
  ["Munich", "Düsseldorf", "October", "Lufthansa"],
  ["Düsseldorf", "Munich", "October", "Lufthansa"],
  ["Munich", "Düsseldorf", "October", "Lufthansa"],
  ["Düsseldorf", "Munich", "October", "Lufthansa"],
  ["Frankfurt", "Doha", "December", "Qatar"],
  ["Doha", "Muscat", "December", "Qatar"],
  // 2024 flights
  ["Almaty", "Doha", "Jan", "Qatar"],
  ["Doha", "Dubai", "Jan", "Qatar"],
  ["Dubai", "Munich", "Jan", "Emirates"],
  ["Munich", "Dubai", "Jan", "Emirates"],
  ["Dubai", "Riyadh", "Feb", "Saudia"],
  ["Riyadh", "Dubai", "Feb", "Saudia"],
  ["Dubai", "Munich", "Feb", "Emirates"],
  ["Munich", "Dubai", "Feb", "Emirates"],
  ["Dubai", "Munich", "Mar", "Emirates"],
  ["Munich", "Dubai", "Mar", "Emirates"],
  ["Dubai", "Munich", "Mar", "Emirates"],
  ["Munich", "Frankfurt", "Mar", "Lufthansa"],
  ["Frankfurt", "Seattle", "Mar", "Lufthansa"],
  ["Seattle", "Seattle", "Mar", "Patrick"],
  ["Seattle", "Frankfurt", "Apr", "Lufthansa"],
  ["Munich", "London", "May", "Lufthansa"],
  ["London", "Munich", "May", "Lufthansa"],
  ["Munich", "Düsseldorf", "May", "Lufthansa"],
  ["Düsseldorf", "Munich", "May", "Lufthansa"],
  ["Munich", "Hamburg", "June", "Lufthansa"],
  ["Hamburg", "Munich", "June", "Lufthansa"],
  ["Munich", "Barcelona", "June", "Lufthansa"],
  ["Barcelona", "Munich", "June", "Lufthansa"],
  ["Munich", "Hamburg", "August", "Lufthansa"],
  ["Hamburg", "Munich", "August", "Lufthansa"],
  ["Munich", "Bodrum", "August", "Eurowings Discover"],
  ["Bodrum", "Munich", "August", "Eurowings Discover"],
  ["Munich", "Vienna", "August", "Austrian"],
  ["Vienna", "New York", "August", "Austrian"],
  ["New York", "Hong Kong", "September", "Cathay Pacific"],
  ["Hong Kong", "Chengdu", "September", "Air China"],
  ["Chengdu", "Hong Kong", "September", "Air China"],
  ["Hong Kong", "New York", "September", "Cathay Pacific"],
  ["New York", "Denver", "October", "Delta"],
  ["Denver", "New York", "October", "Delta"],
  ["New York", "Beijing", "November", "Air China"],
  ["Beijing", "Shenzhen", "November", "Air China"],
  ["Shenzhen", "Beijing", "November", "Air China"],
  ["Beijing", "New York", "November", "Air China"],
  ["New York", "Toronto", "November", "Air Canada"],
  ["Toronto", "Halifax", "November", "Air Canada"],
  ["Halifax", "Toronto", "November", "Air Canada"],
  ["Toronto", "New York", "November", "Air Canada"],
  ["New York", "Munich", "December", "Lufthansa"]
];

// Month colors
const monthColors = {
  "Jan": new THREE.Color(0x1E88E5),   // Deep Blue
  "Feb": new THREE.Color(0x8E24AA),   // Purple
  "Mar": new THREE.Color(0xD81B60),   // Pink
  "Apr": new THREE.Color(0xE53935),   // Red
  "May": new THREE.Color(0xFB8C00),   // Orange
  "June": new THREE.Color(0xFFB300),  // Amber
  "July": new THREE.Color(0xFFD600),  // Yellow
  "August": new THREE.Color(0x43A047),// Green
  "September": new THREE.Color(0x00897B), // Teal
  "October": new THREE.Color(0x00ACC1), // Cyan
  "November": new THREE.Color(0x3949AB), // Indigo
  "December": new THREE.Color(0x5E35B1) // Deep Purple
};

// Airline colors for dots - using a consistent warm color palette
const airlineColors = {
  "Qatar": 0xFF6B6B,      // Coral Red
  "Lufthansa": 0xFFA07A,  // Light Salmon
  "FlyDubai": 0xFFB347,   // Pastel Orange
  "Saudi": 0xFFD700,      // Gold
  "Saudia": 0xFFD700,     // Gold
  "Emirates": 0xFF69B4,   // Hot Pink
  "United": 0xFF8C00,     // Dark Orange
  "Etihad": 0xFFA500,     // Orange
  "Swiss": 0xFFD700,      // Gold
  "Omanair": 0xFFB6C1,    // Light Pink
  "Austrian": 0xFF6347,   // Tomato
  "Air Lingus": 0xFFA07A, // Light Salmon
  "Vietjet": 0xFFD700,    // Gold
  "Bamboo Airways": 0xFFB6C1, // Light Pink
  // New airlines for 2022 flights
  "Singapore Airlines": 0xFF6B6B, // Coral Red
  "Copa Airlines": 0xFFA07A,      // Light Salmon
  "Condor": 0xFFB347,             // Pastel Orange
  "Southwest": 0xFFD700,          // Gold
  "Eurowings": 0xFF69B4,          // Hot Pink
  // New airlines for 2024 flights
  "Patrick": 0xFF8C00,            // Dark Orange
  "Eurowings Discover": 0xFFA500, // Orange
  "Cathay Pacific": 0xFF6347,     // Tomato
  "Air China": 0xFFB6C1,          // Light Pink
  "Delta": 0xFFA07A,              // Light Salmon
  "Air Canada": 0xFF6B6B          // Coral Red
};

const FlightGlobe = () => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [flightCount, setFlightCount] = useState(0);
  const [monthFilter, setMonthFilter] = useState('All');
  const [airlineFilter, setAirlineFilter] = useState('All');
  
  useEffect(() => {
    // Initialize Three.js scene
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Dark background
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    
    // Set up post-processing with bloom effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Add bloom effect for flight paths
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.8,    // strength
      0.3,    // radius
      0.7     // threshold
    );
    composer.addPass(bloomPass);
    
    // Add resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Create a group to hold all objects that should rotate together
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    
    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    
    // Add main directional light (sun) with broader illumination
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 3, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    scene.add(dirLight);
    
    // Add secondary directional light for fill lighting
    const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.5);
    secondaryLight.position.set(-5, 3, -5);
    scene.add(secondaryLight);
    
    // Create Earth globe
    const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
    
    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Add error handling for texture loading
    const loadTextureWithErrorHandling = (path) => {
      return new Promise((resolve, reject) => {
        textureLoader.load(
          path,
          (texture) => {
            console.log(`Successfully loaded texture: ${path}`);
            resolve(texture);
          },
          undefined,
          (error) => {
            console.error(`Error loading texture ${path}:`, error);
            // Provide a fallback texture (a simple colored texture)
            const canvas = document.createElement('canvas');
            canvas.width = 2;
            canvas.height = 2;
            const context = canvas.getContext('2d');
            context.fillStyle = 'rgba(255,255,255,1)';
            context.fillRect(0, 0, 2, 2);
            const fallbackTexture = new THREE.CanvasTexture(canvas);
            resolve(fallbackTexture);
          }
        );
      });
    };
    
    // Load textures with proper color space
    const albedoMap = textureLoader.load('./textures/earth_albedo.jpg', 
      undefined, 
      undefined, 
      (error) => console.error('Error loading albedo map:', error)
    );
    albedoMap.colorSpace = THREE.SRGBColorSpace;
    
    const bumpMap = textureLoader.load('./textures/earth_bump.jpg',
      undefined,
      undefined,
      (error) => console.error('Error loading bump map:', error)
    );
    bumpMap.colorSpace = THREE.LinearSRGBColorSpace;
    
    const roughnessMap = textureLoader.load('./textures/earth_roughness.jpg',
      undefined,
      undefined,
      (error) => console.error('Error loading roughness map:', error)
    );
    roughnessMap.colorSpace = THREE.LinearSRGBColorSpace;
    
    // Add night lights texture
    const nightLightsMap = textureLoader.load('./textures/earth_night.jpg',
      undefined,
      undefined,
      (error) => console.error('Error loading night lights map:', error)
    );
    nightLightsMap.colorSpace = THREE.SRGBColorSpace;
    
    // Create specular map for oceans
    const specularMap = textureLoader.load('./textures/earth_specular.jpg',
      undefined,
      undefined,
      (error) => console.error('Error loading specular map:', error)
    );
    specularMap.colorSpace = THREE.LinearSRGBColorSpace;
    
    // Create normal map for more detailed surface
    const normalMap = textureLoader.load('./textures/earth_normal.jpg',
      undefined,
      undefined,
      (error) => console.error('Error loading normal map:', error)
    );
    normalMap.colorSpace = THREE.LinearSRGBColorSpace;
    
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: albedoMap,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      roughnessMap: roughnessMap,
      roughness: 0.8,
      metalness: 0.1,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.05, 0.05),
      emissiveMap: nightLightsMap,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.7
    });
    
    // Use displacement mapping for realistic mountains
    const displacementMap = textureLoader.load('./textures/earth_elevation.jpg');
    displacementMap.colorSpace = THREE.LinearSRGBColorSpace;
    earthMaterial.displacementMap = displacementMap;
    earthMaterial.displacementScale = 0.05;
    earthMaterial.displacementBias = 0;
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earth);
    
    // Add clouds layer
    const cloudGeometry = new THREE.SphereGeometry(1.01, 128, 128);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      alphaMap: textureLoader.load('./textures/earth_clouds.jpg'),
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(clouds);
    
    // Add atmosphere glow effect with improved realism
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 128, 128);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        atmOpacity: { value: 0.7 },
        atmPowFactor: { value: 4.1 },
        atmMultiplier: { value: 9.5 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 eyeVector;
        
        void main() {
          // modelMatrix transforms the coordinates local to the model into world space
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          
          // normalMatrix is a matrix that is used to transform normals from object space to view space
          vNormal = normalize(normalMatrix * normal);
          
          // vector pointing from camera to vertex in view space
          eyeVector = normalize(mvPos.xyz);
          
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 eyeVector;
        uniform float time;
        uniform float atmOpacity;
        uniform float atmPowFactor;
        uniform float atmMultiplier;
        
        void main() {
          // Starting from the atmosphere edge, dotP would increase from 0 to 1
          float dotP = dot(vNormal, eyeVector);
          
          // This factor is to create the effect of a realistic thickening of the atmosphere coloring
          float factor = pow(dotP, atmPowFactor) * atmMultiplier;
          
          // Adding in a bit of dotP to the color to make it whiter while thickening
          vec3 atmColor = vec3(0.35 + dotP/4.5, 0.35 + dotP/4.5, 1.0);
          
          // use atmOpacity to control the overall intensity of the atmospheric color
          gl_FragColor = vec4(atmColor, atmOpacity) * factor;
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      side: THREE.BackSide
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);
    
    // Add custom shader for water surfaces with improved dynamics
    const oceanMaterial = new THREE.ShaderMaterial({
      uniforms: {
        "time": { value: 0.0 },
        "oceanMap": { value: textureLoader.load('/textures/ocean_mask.jpg') },
        "normalMap": { value: textureLoader.load('/textures/ocean_normal.jpg') },
        "sunPosition": { value: new THREE.Vector3(5, 3, 5) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D oceanMap;
        uniform sampler2D normalMap;
        uniform float time;
        uniform vec3 sunPosition;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          // Create moving water effect
          vec2 uv = vUv;
          
          // Multiple waves in different directions
          float wave1 = sin(uv.x * 10.0 + time * 0.05) * 0.01;
          float wave2 = sin(uv.y * 8.0 + time * 0.07) * 0.01;
          
          uv.y += wave1;
          uv.x += wave2;
          
          // Sample ocean mask for ocean areas
          vec4 oceanColor = texture2D(oceanMap, uv);
          
          // Calculate fresnel effect for realistic water reflections
          vec3 viewVector = normalize(vViewPosition);
          float fresnel = dot(viewVector, vNormal);
          fresnel = pow(1.0 - fresnel, 3.0);
          
          // Deep ocean color
          vec3 deepColor = vec3(0.0, 0.1, 0.2);
          // Shallow water color
          vec3 shallowColor = vec3(0.0, 0.4, 0.7);
          
          // Mix colors based on depth (using ocean mask alpha)
          vec3 waterColor = mix(deepColor, shallowColor, oceanColor.r);
          
          // Add specular highlight
          vec3 lightDir = normalize(sunPosition);
          float specular = pow(max(0.0, dot(reflect(-lightDir, vNormal), viewVector)), 100.0);
          
          // Final color with specular highlighting
          vec3 finalColor = waterColor + vec3(1.0, 1.0, 1.0) * specular * 0.5 * fresnel;
          
          gl_FragColor = vec4(finalColor, oceanColor.r * 0.7);
        }
      `,
      transparent: true,
      opacity: 0.8,
      side: THREE.FrontSide
    });
    
    // Create ocean layer
    const oceanLayer = new THREE.Mesh(earthGeometry, oceanMaterial);
    oceanLayer.scale.setScalar(1.001); // Slightly larger than Earth
    globeGroup.add(oceanLayer);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    
    // Convert lat/lng to 3D coordinates
    const latLngToVector3 = (lat, lng, radius = 1) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      return new THREE.Vector3(x, y, z);
    };
    
    // Function to draw flight path
    const drawFlightPath = (from, to, month, airline, lineWidth = 1) => {
      if (!airports[from] || !airports[to]) return;
      
      // Generate vectors for start and end points
      const startPos = latLngToVector3(airports[from][0], airports[from][1]);
      const endPos = latLngToVector3(airports[to][0], airports[to][1]);
      
      // Create dots for airports
      const dotGeometry = new THREE.SphereGeometry(0.01, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({ 
        color: airlineColors[airline] || 0xffffff,
        transparent: true,
        opacity: 1.0
      });
      
      const startDot = new THREE.Mesh(dotGeometry, dotMaterial);
      startDot.position.copy(startPos);
      globeGroup.add(startDot);
      
      const endDot = new THREE.Mesh(dotGeometry, dotMaterial);
      endDot.position.copy(endPos);
      globeGroup.add(endDot);
      
      // Calculate the midpoint and distance
      const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
      const distance = startPos.distanceTo(endPos);
      
      // Normalize the midpoint and raise it above the surface
      const midPointElevated = midPoint.clone().normalize().multiplyScalar(1 + distance * 0.4);
      
      // Create a curve
      const curve = new THREE.QuadraticBezierCurve3(
        startPos,
        midPointElevated,
        endPos
      );
      
      // Create tube geometry for the flight path
      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        100, // segments
        lineWidth * 0.008, // radius (increased from 0.005)
        8, // radius segments
        false // closed
      );
      
      // Create material with glow effect
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: airlineColors[airline] || 0xffffff,
        transparent: true,
        opacity: 0.9,
        shininess: 120,
        specular: new THREE.Color(0xffffff),
        emissive: new THREE.Color(airlineColors[airline] || 0xffffff),
        emissiveIntensity: 0.8
      });
      
      // Create the tube mesh
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      tube.userData = { month, airline, pulsatePhase: Math.random() * Math.PI * 2 }; // Add random phase for pulsating effect
      globeGroup.add(tube);
      
      return { line: tube, startDot, endDot };
    };
    
    // Array to store all flight path objects
    const flightPaths = [];
    
    // Count route frequencies
    const routeFrequencies = new Map();
    flights.forEach(([from, to]) => {
      const routeKey = `${from}-${to}`;
      routeFrequencies.set(routeKey, (routeFrequencies.get(routeKey) || 0) + 1);
    });
    
    // Find max frequency for normalization
    const maxFrequency = Math.max(...Array.from(routeFrequencies.values()));
    
    // Add all flight paths
    flights.forEach(([from, to, month, airline], index) => {
      const routeKey = `${from}-${to}`;
      const frequency = routeFrequencies.get(routeKey) || 1;
      // Normalize line width between 0.001 and 0.003 based on frequency
      const lineWidth = 0.1 + (frequency / maxFrequency) * 0.8;
      
      const objects = drawFlightPath(from, to, month, airline, lineWidth);
      if (objects) {
        flightPaths.push(objects);
        
        // Increment counter with delay for animation effect
        setTimeout(() => {
          setFlightCount(prev => prev + 1);
        }, index * 50);
      }
    });
    
    // Apply filters
    const applyFilters = () => {
      flightPaths.forEach(({ line, startDot, endDot }) => {
        const monthMatch = monthFilter === 'All' || line.userData.month === monthFilter;
        const airlineMatch = airlineFilter === 'All' || line.userData.airline === airlineFilter;
        
        const visible = monthMatch && airlineMatch;
        line.visible = visible;
        startDot.visible = visible;
        endDot.visible = visible;
      });
    };
    
    // Handle filter changes
    const filters = { monthFilter, airlineFilter };
    Object.defineProperty(filters, 'monthFilter', {
      get: () => monthFilter,
      set: (value) => setMonthFilter(value)
    });
    Object.defineProperty(filters, 'airlineFilter', {
      get: () => airlineFilter,
      set: (value) => setAirlineFilter(value)
    });
    
    // HDR Environment (comment out or properly import these if you want to use them)
    // Instead of RGBELoader which requires external import, use a simple CubeTextureLoader
    const envMapLoader = new THREE.CubeTextureLoader();
    const envMap = envMapLoader.load([
      '/textures/space/px.jpg', '/textures/space/nx.jpg',
      '/textures/space/py.jpg', '/textures/space/ny.jpg',
      '/textures/space/pz.jpg', '/textures/space/nz.jpg'
    ]);
    scene.background = envMap;
    scene.environment = envMap;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the globe group slightly for animation
      globeGroup.rotation.y += 0.001;
      
      // Make clouds rotate independently in animation loop
      clouds.rotation.y += 0.0001; // Slower than earth rotation for realistic effect
      
      // Update atmosphere shader time
      atmosphereMaterial.uniforms.time.value += 0.01;
      
      // Animate flight paths with pulsating effect
      const time = performance.now() * 0.001; // time in seconds
      globeGroup.children.forEach(child => {
        if (child.userData && child.userData.airline) {
          const phase = child.userData.pulsatePhase || 0;
          const pulseValue = 0.7 + 0.3 * Math.sin(time * 2 + phase);
          if (child.material) {
            child.material.emissiveIntensity = 0.8 * pulseValue;
            child.material.opacity = 0.7 + 0.3 * pulseValue;
          }
        }
      });
      
      // Update controls
      controls.update();
      
      // Render the scene with post-processing
      composer.render();
    };
    
    // Start animation
    animate();
    
    // Set loading to false when everything is ready
    setLoading(false);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose geometries and materials
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      if (oceanLayer) oceanMaterial.dispose();
      renderer.dispose();
    };
  }, [monthFilter, airlineFilter]);
  
  // Extract unique months and airlines for filters
  const months = ['All', ...new Set(flights.map(flight => flight[2]))].sort((a, b) => {
    if (a === 'All') return -1;
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });
  
  const airlines = ['All', ...new Set(flights.map(flight => flight[3]))].sort();
  
  return (
      <div className="w-full h-screen relative">
        <div 
          ref={mountRef} 
          className="w-full h-full"
          style={{ background: '#000000' }}
        >
          {loading && (
            <div className="flex h-full items-center justify-center">
              <p className="text-white text-xl">Loading 3D visualization...</p>
            </div>
          )}
        </div>

        {/* Modern Glassmorphic Controls Panel */}
        <div className="absolute top-1/2 -translate-y-1/2 right-48 w-64 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-white">2022-2024 Flights</h2>
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Month</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                value={monthFilter} 
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                {months.map(month => (
                  <option key={month} value={month} className="bg-gray-800 text-white">{month}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Airline</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                value={airlineFilter} 
                onChange={(e) => setAirlineFilter(e.target.value)}
              >
                {airlines.map(airline => (
                  <option key={airline} value={airline} className="bg-gray-800 text-white">{airline}</option>
                ))}
              </select>
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-white/90 text-sm font-medium mb-3">Airline Colors</h3>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {Object.entries(airlineColors).map(([airline, color]) => (
                  <div key={airline} className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-2 rounded-full" 
                      style={{ backgroundColor: `#${color.toString(16).padStart(6, '0')}` }}
                    ></div>
                    <span className="text-white/80 text-xs">{airline}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FlightGlobe;
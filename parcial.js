
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var transladar;
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
   

    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    
    scene.add(cube);
    return(cube);
}
function init() {
    
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

   
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    Cubo = [];   // Definir un array unidimensional
    Delta=5;
    Dim=10;
    
    Cubo.push(cubo(Dim, Dim, Dim, 0x6DEA0F, 'Lambert', false));
    Cubo[0].translateX(Delta);
    Cubo[0].translateY(Delta); 
    Cubo[0].translateZ(Delta);
    // el primer cubo se translada a las coordenadas (5,5,5)
   
    Cubo.push(cubo(Dim, Dim, Dim, 0x0FEAEA, 'Lambert', false));
    Cubo[1].translateX(Delta); // el segundo cubo, se tranlada a la coordenada X=5 
    Cubo[1].translateZ(Delta); // y Z=5
    Cubo[1].scale.set(0.5,0.5,0.5); // Escalamos el cubo a la mitad de su dimension original
    Cubo[1].translateY(12); // despues transladamos en la coordenada Y
   
    
    Cubo.push(cubo(Dim, Dim, Dim, 0xCE0FEA, 'Lambert', false));
    Cubo[2].translateX(Delta); // el tercer  cubo, se tranlada a la coordenada X=5 
    Cubo[2].translateZ(Delta); // y Z=5
    Cubo[2].scale.set(0.25,0.25,0.25);// ahora se escalara el cubo a la cuarta parte del original
    Cubo[2].translateY(15.5);// y se transladara en la coordenada Y
   

   
    light = new THREE.PointLight(0xFFFFFF); 
    light.position.set(10, 30, 20);            
    scene.add( light ); 

   
    camera.position.set(30*Dim, 20*Dim, 40*Dim); // La posicion de la camara se reducira o aumentara dependiendo de la dimension del cubo
    camera.lookAt(scene.position);

   
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    
    renderer.render(scene, camera);

   
    camera.position.set(50, 20, 40);
    camera.lookAt(scene.position);

    
    document.getElementById("webgl-output").appendChild(renderer.domElement);

   
    renderer.render(scene, camera);


}
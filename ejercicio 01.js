
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado)
{
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {

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
function init()

 {
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

   
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    
    var axes = new THREE.AxesHelper(40);
    scene.add(axes);

    Cubo = [];   // Define un array unidimensional para contener los cubos

   
    Dim=16; //Valor la inicial del cubo
    Delta= Dim/2;//Valor el lado inicial del cubo dividido en 2
    Diagonal=Math.sqrt((Delta*Delta)+(Delta*Delta));
    Resta=(Diagonal-Delta);
    NewDelta=Resta+Delta;
    Angulo=Math.PI/4;

    Cubo.push(cubo(Dim, Dim, Dim, 0x6DEA0F, 'Lambert', false));//Cubo 1
    Cubo.push(cubo(Dim, Dim, Dim, 0x0FEAEA, 'Lambert', false));//Cubo 2
    Cubo.push(cubo(Dim, Dim, Dim, 0xCE0FEA, 'Lambert', false));//Cubo 3
    
  
    for(i=0;i<3;i++)// Trasladra los cubos al valor inicial de Delta
    {
         Cubo[i].translateX(NewDelta); //Se traslada en x
         Cubo[i].translateY(Delta); //Se traslada en y
         Cubo[i].translateZ(NewDelta); //Se traslada en z
    } 
    
    for(i=1;i<3;i++) //El for tomara los cubos 1 y 2, los cuales se translaran en Y y reduciran su tamaño a la mitad
    {
        Tamano=((1)/(Dim/(Delta/i)));//Aqui se reducira el cubo 1 a la mitad
        Altura=((Delta-2)*(1+i));//Se trasladara con respecto al eje Y y el tamaño al que se reduzca
        Cubo[i].scale.set(Tamano,Tamano,Tamano); //Se escalara con respecto al tamano, repetira el proceso en el cubo 1 y 2 
        Cubo[i].translateY(Altura);//Trasladara con respecto a Y y la altura correspondiente
    }
    for(i=0;i<3;i++)
    {
        if(i==0 || i==2)
        {
            Cubo[i].rotateY(Angulo);// los cubos 0 y 2, rotaran con respecto al angulo indicado 
        }
    }
    
    
    light = new THREE.PointLight(0xFFFFFF); 
    light.position.set(10, 30, -20);          
    scene.add( light ); 

   
    camera.position.set(50, 20, -40);
    camera.lookAt(scene.position);

   
    document.getElementById("webgl-output").appendChild(renderer.domElement);

   
    renderer.render(scene, camera);

}
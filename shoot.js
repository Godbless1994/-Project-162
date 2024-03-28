AFRAME.registerComponent("bowlingBall", {
    init: function () {
      this.shootBowlingBalls();
    },
    shootBowlingBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bowlingBall = document.createElement("a-entity");
  
          bowlingBall.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          bowlingBall.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          bowlingBall.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bowlingBall.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          bowlingBall.addEventListener("collide", this.removeBullet);
          
          scene.appendChild(bowlingBall);
        }
      });
    },
    removeBowlingBall: function (e) {
        //Original entity (bowling ball)
        console.log(e.detail.target.el);
    
        //Other entity, which bowling ball touched.
        console.log(e.detail.body.el);
    
        //bowling ball element
        var element = e.detail.target.el;
    
        //element which is hit
        var elementHit = e.detail.body.el;
    
        if (elementHit.id.includes("box")) {
          elementHit.setAttribute("material", {
            opacity: 1,
            transparent: true,
          });
    
          //impulse and point vector
          var impulse = new CANNON.Vec3(-2, 2, 1);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);
    
          //remove event listener
          element.removeEventListener("collide", this.shoot);
    
          //remove the bowling ball from the scene
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
  });
  
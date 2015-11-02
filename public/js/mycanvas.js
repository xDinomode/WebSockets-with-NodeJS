function go(){

    var socket = io();

    var canvas = document.getElementById("myCanvas");
    var x = 0;
    var y = 0;
    //var dx =3;
    //var dy =7;

    var mouseX;
    var mouseY;

    canvas.width = 550;
    canvas.height = 200;
    canvas.style.border = "2px solid black";
    canvas.addEventListener("mousemove", function(evt){
        var pos = getPosition(this, evt);

        socket.emit("myposition", pos);
    });
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.fill();

    function update(){

        if(x + 50 > canvas.width){
            dx = -dx;
        } else if(x < 0){
            dx = -dx;
        } else{

        }

        if(y + 50 > canvas.height){
            dy = -dy;
        } else if(y < 0){
            dy = -dy;
        } else{

        }


       // x += dx;
       // y += dy;



        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(mouseX, mouseY,50,50);

        requestAnimationFrame(update);
    }

    function getPosition(can, evt){
        var rect = can.getBoundingClientRect();
        var root = document.documentElement;
        mouseX = (evt.clientX-rect.left)/(rect.right-rect.left)*can.width;
        mouseY = (evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height;

        return {
            x : mouseX,
            y: mouseY
        }
    }

    update();

    socket.on("usersPosition", function(data){
        mouseX = data.x;
        mouseY = data.y;
    });
}
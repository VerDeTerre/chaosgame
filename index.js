var chaosgame = (function() {
    var COLORS = ['red', 'blue', 'green', 'orange', 'magenta', 'yellow'];

    var width = 800;
    var height = 800;

    var numCorners = 3;

    var currentX;
    var currentY;

    var corners;

    var mainElement;
    var context;

    var loop;

    function getContext() {
        if (!mainElement) {
            mainElement = document.getElementById('main');
        }

        var canvas = mainElement.getElementsByTagName('canvas')[0];
        if (!canvas) {
            canvas = document.createElement('canvas');
            mainElement.appendChild(canvas);
        }

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        return canvas.getContext('2d');
    }

    function start() {
        clearInterval(loop);

        var context = getContext();

        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        corners = [];
        for (var i = 0; i < numCorners; i++) {
            var angle = 2 * Math.PI * i / numCorners;
            var x = (width / 2.5) * Math.cos(angle) + (width / 2);
            var y = (height / 2.5) * Math.sin(angle) + (height / 2);
            corners.push([x, y]);
        }

        currentX = corners[0][0];
        currentY = corners[0][1];

        loop = setInterval(function() {
            var index = Math.floor(Math.random() * numCorners);
            var corner = corners[index];
            currentX = (currentX + corner[0]) / 2;
            currentY = (currentY + corner[1]) / 2;
            context.fillStyle = COLORS[index % COLORS.length];
            context.fillRect(currentX, currentY, 1, 1);
        }, 10);
    }

    function stop() {
        clearInterval(loop);
    }

    function setDimensions(w, h) {
        width = w;
        height = h;
    }

    function setNumCorners(n) {
        numCorners = n;
    }

    function setMainElement(element) {
        mainElement = element;
    }

    return {
        start: start,
        stop: stop,
        setDimensions: setDimensions,
        setNumCorners: setNumCorners,
        setMainElement: setMainElement
    };
})();
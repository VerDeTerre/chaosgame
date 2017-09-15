var chaosgame = (function() {
    var COLORS = ['red', 'blue', 'green', 'orange', 'magenta', 'yellow'];

    var width = 600;
    var height = 600;

    var numVertexes = 3;

    var currentX;
    var currentY;

    var vertexes;

    var mainElement;
    var context;

    var interval;

    var initialized = false;
    var loopsPerUpdate = 500;

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

    function initialize() {
        stop();

        context = getContext();

        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        vertexes = [];
        for (var i = 0; i < numVertexes; i++) {
            var angle = 2 * Math.PI * i / numVertexes;
            var x = (width / 2.5) * Math.cos(angle) + (width / 2);
            var y = (height / 2.5) * Math.sin(angle) + (height / 2);
            vertexes.push([x, y]);
        }

        currentX = vertexes[0][0];
        currentY = vertexes[0][1];

        lastTimestamp = new Date();
        initialized = true;
    }

    function start() {
        stop();

        if (!initialized) {
            initialize();
        }

        interval = setInterval(function() {
            for (var i = 0; i < loopsPerUpdate; i++) {
                var index = Math.floor(Math.random() * numVertexes);
                var vertex = vertexes[index];
                currentX = (currentX + vertex[0]) / 2;
                currentY = (currentY + vertex[1]) / 2;

                var colorIndex = (index + Math.floor(index / COLORS.length)) % COLORS.length
                context.fillStyle = COLORS[colorIndex];

                context.fillRect(currentX, currentY, 1, 1);
            }
        }, 10);
    }

    function restart() {
        initialize();
        start();
    }

    function stop() {
        clearInterval(interval);
    }

    function setDimensions(w, h) {
        width = w;
        height = h;
    }

    function setNumVertexes(n) {
        numVertexes = n;
    }

    function setMainElement(element) {
        mainElement = element;
    }

    function setLoopsPerUpdate(loops) {
        loopsPerUpdate = loops;
    }

    return {
        start: start,
        stop: stop,
        restart: restart,
        setDimensions: setDimensions,
        setNumVertexes: setNumVertexes,
        setMainElement: setMainElement,
        setLoopsPerUpdate: setLoopsPerUpdate
    };
})();

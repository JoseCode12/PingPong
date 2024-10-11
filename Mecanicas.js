c = document.getElementById('c').getContext('2d');
c.fillStyle = "#FFF";
c.font = "40px monospace"; // Tamaño de fuente ajustado
w = s = 1;
p = q = a = b = 0;
m = n = 190;
x = 300; y = 235;
u = -5; v = 3;

setInterval(function () {
    if (w && !s) return;

    // Detiene el juego si alguno de los jugadores llega a 10 puntos
    if (a >= 10 || b >= 10) {
        c.clearRect(0, 0, 640, 480);
        let winnerText = (a >= 10 ? "Jugador 1" : "Jugador 2") + " ha ganado";
        c.font = "40px monospace"; // Ajustamos el tamaño de la fuente
        let textWidth = c.measureText(winnerText).width;
        c.fillText(winnerText, (640 - textWidth) / 2, 240); // Centramos el texto
        return;
    }

    s = 0;
    c.clearRect(0, 0, 640, 480);
    for (i = 5; i < 480; i += 20) c.fillRect(318, i, 4, 10);
    m += p; n += q;
    m = m < 0 ? 0 : m; m = m > 380 ? 380 : m;
    n = n < 0 ? 0 : n; n = n > 380 ? 380 : n;
    x += u; y += v;

    if (y <= 0) { y = 0; v = -v; }
    if (y >= 470) { y = 470; v = -v; }

    if (x <= 40 && x >= 20 && y < m + 110 && y > m - 10) {
        u = -u + 0.2;
        v += (y - m - 45) / 20;
    }

    if (x <= 610 && x >= 590 && y < n + 110 && y > n - 10) {
        u = -u - 0.2;
        v += (y - n - 45) / 20;
    }

    if (x < -10) {
        b++; // Jugador 2 anota
        x = 360; y = 235; u = 5; w = 1;
    }

    if (x > 640) {
        a++; // Jugador 1 anota
        x = 280; y = 235; u = -5; w = 1;
    }

    // Ajustamos la posición del marcador de puntos
    let scoreText = a + " " + b;
    let scoreWidth = c.measureText(scoreText).width;
    c.fillText(scoreText, (640 - scoreWidth) / 2, 60); // Centramos el marcador

    c.fillRect(20, m, 20, 100);
    c.fillRect(600, n, 20, 100);
    c.fillRect(x, y, 10, 10);
}, 30);

document.onkeydown = function (e) {
    k = (e || window.event).keyCode;
    w = w ? 0 : k == '27' ? 1 : 0;

    // Aumenta la velocidad en función de los puntos de ambos jugadores
    let speedFactor = 5 + (a + b) * 0.5; // La velocidad aumenta según los puntos
    p = k == '65' ? speedFactor : k == '81' ? -speedFactor : p;
    q = k == '40' ? speedFactor : k == '38' ? -speedFactor : q;
};

document.onkeyup = function (e) {
    k = (e || window.event).keyCode;
    p = (k == '65' || k == '81') ? 0 : p;
    q = (k == '38' || k == '40') ? 0 : q;
};

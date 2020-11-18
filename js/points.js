let points = 0;

function getPoints() {
    return points;
}

function incrementPoints() {
    points++;
}

function resetPoints() {
    points = 0;
}

export {getPoints, incrementPoints, resetPoints};
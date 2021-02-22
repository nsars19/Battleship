const ShipFactory = (coordsArr) => {
  const hitCoords = [];
  let coords = coordsArr;

  const isSunk = () => {
    if (coords.length !== hitCoords.length) return false;

    let [a, b] = [
      coords.map((i) => i.join("")).sort(),
      hitCoords.map((i) => i.join("")).sort(),
    ];

    return a.every((coord) => b.includes(coord));
  };

  const setCoords = (newCoords) => {
    while (coords.length !== 0) coords.pop();
    coords.push(...newCoords);
  };

  return {
    coords,
    isSunk,
    setCoords,
    length: () => coords.length,
    hit: (hitCoord) => hitCoords.push(hitCoord),
    hitCoords: () => hitCoords,
  };
};

export default ShipFactory;

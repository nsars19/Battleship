const ShipFactory = (coordsArr) => {
  const hitCoords = [];
  let coords = coordsArr;

  const isSunk = () => {
    if (coords.length !== hitCoords.length) return false;

    let [a, b] = [
      coords.map((i) => i.join("")),
      hitCoords.map((i) => i.join("")),
    ];

    a.sort();
    b.sort();

    return a.every((coord) => b.includes(coord));
  };

  return {
    coords,
    isSunk,
    length: () => coords.length,
    hit: (hitCoord) => hitCoords.push(hitCoord),
    hitCoords: () => hitCoords,
  };
};

export default ShipFactory;

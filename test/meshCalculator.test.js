import {meshToLatLon} from '../src/meshCalculator';

test('mesh 5339 to equal { lat: 53 / 1.5, lon: 39 + 100 }', () => {
    expect(meshToLatLon('5339')).toEqual({
        lat: 53 / 1.5,
        lon: 39 + 100
    });
});
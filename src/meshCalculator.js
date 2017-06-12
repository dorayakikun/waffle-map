export type LatLon = {
    lat: number;
    lon: number;
}

/**
 * Convert mesh to LatLon.
 *
 * @param mesh mesh
 * @returns {LatLon} latitude and longitude
 */
export function meshToLatLon(mesh: string): LatLon {
    const newMesh = mesh.replace('-', '');

    const len = newMesh.length;
    if (len < 4) {
        throw new Error(`Illegal format. mesh is ${mesh}`);
    }
    switch (len) {
        case 4:
            return firstMeshToLonLat(mesh);
            break;
        case 6:
            throw new Error(`Not Implemented`);
            break;
        case 8:
            throw new Error(`Not Implemented`);
            break;
        default:
            throw new Error(`Unexpected length. mesh is ${mesh}`)
    }
}

/**
 * Convert first mesh to LatLon.
 *
 * @param mesh first mesh
 * @returns {LatLon} latitude and longitude
 */
function firstMeshToLonLat(mesh: string): LatLon {
    const meshLat = parseInt(mesh.substr(0, 2));
    const meshLon = parseInt(mesh.substr(2));

    if(isNaN(meshLat) || isNaN(meshLon)) {
        throw new Error(`Illegal format. mesh is ${mesh}`);
    }

    return {
        lat: meshLat / 1.5 + (2 / 3),
        lon: meshLon + 100 + (1 / 2)
    }
}

/**
 * Convert LatLon to mesh.
 *
 * @param lat latitude
 * @param lon longitude
 * @param scale scale
 * @returns {string} mesh.
 */
export function latLonToMesh(lat: number, lon: number, scale: number): string {
    switch (scale) {
        case 1:
            return latLonToFirstMesh(lat, lon);
        case 2:
            throw new Error(`Not Implemented`);
        case 3:
            throw new Error(`Not Implemented`);
        default:
            throw new Error(`Illegal scale. scale is ${scale}`);
    }
}

/**
 * Convert LatLon to first mesh.
 *
 * @param lat latitude
 * @param lon longitude
 * @returns {string} first mesh
 */
function latLonToFirstMesh(lat: number, lon: number): string {
    const meshLat = parseInt(lat * 1.5).toString();
    const meshLon = parseInt(lon - 100).toString();
    return meshLat + meshLon;
}
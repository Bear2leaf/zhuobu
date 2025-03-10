/*
 * From http://www.redblobgames.com/maps/mapgen2/
 * Copyright 2017 Red Blob Games <redblobgames@gmail.com>
 * License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
 */

'use strict';

import TriangleMesh from './TriangleMesh.js';
import { mix } from '../../util/math.js';
import { BiomeColor } from './Map.js';

function biome(ocean: boolean, water: boolean, coast: boolean, temperature: number, moisture: number):  BiomeColor {
    if (ocean) {
        return BiomeColor.OCEAN;
    } else if (water) {
        if (temperature > 0.9) return BiomeColor.MARSH;
        if (temperature < 0.2) return BiomeColor.ICE;
        return BiomeColor.LAKE;
    } else if (coast) {
        return BiomeColor.BEACH;
    } else if (temperature < 0.2) {
        if (moisture > 0.50) return BiomeColor.SNOW;
        else if (moisture > 0.33) return BiomeColor.TUNDRA;
        else if (moisture > 0.16) return BiomeColor.BARE;
        else return BiomeColor.SCORCHED;
    } else if (temperature < 0.4) {
        if (moisture > 0.66) return BiomeColor.TAIGA;
        else if (moisture > 0.33) return BiomeColor.SHRUBLAND;
        else return BiomeColor.TEMPERATE_DESERT;
    } else if (temperature < 0.7) {
        if (moisture > 0.83) return BiomeColor.TEMPERATE_RAIN_FOREST;
        else if (moisture > 0.50) return BiomeColor.TEMPERATE_DECIDUOUS_FOREST;
        else if (moisture > 0.16) return BiomeColor.GRASSLAND;
        else return BiomeColor.TEMPERATE_DESERT;
    } else {
        if (moisture > 0.66) return BiomeColor.TROPICAL_RAIN_FOREST;
        else if (moisture > 0.33) return BiomeColor.TROPICAL_SEASONAL_FOREST;
        else if (moisture > 0.16) return BiomeColor.GRASSLAND;
        else return BiomeColor.SUBTROPICAL_DESERT;
    }
}


/**
 * A coast region is land that has an ocean neighbor
 */
export function assign_r_coast(r_coast: boolean[], mesh: TriangleMesh, r_ocean: boolean[]) {
    if (mesh.numRegions === undefined) {
        throw new Error("mesh.numRegions is undefined");
    }
    r_coast.length = mesh.numRegions;
    r_coast.fill(false);
    
    let out_r: number[] = [];
    for (let r1 = 0; r1 < mesh.numRegions; r1++) {
        mesh.r_circulate_r(out_r, r1);
        if (!r_ocean[r1]) {
            for (let r2 of out_r) {
                if (r_ocean[r2]) {
                    r_coast[r1] = true;
                    break;
                }
            }
        }
    }
    return r_coast;
}


/**
 * Temperature assignment
 *
 * Temperature is based on elevation and latitude.
 * The normal range is 0.0=cold, 1.0=hot, but it is not 
 * limited to that range, especially when using temperature bias.
 *
 * The northernmost parts of the map get bias_north added to them;
 * the southernmost get bias_south added; in between it's a blend.
 */
export function assign_r_temperature(
    r_temperature: number[],
    mesh: TriangleMesh,
    r_ocean: boolean[], r_water: boolean[],
    r_elevation: number[], r_moisture: number[],
    bias_north: number, bias_south: number
) {
    if (mesh.numRegions === undefined) {
        throw new Error("mesh.numRegions is undefined");
    }
    r_temperature.length = mesh.numRegions;
    for (let r = 0; r < mesh.numRegions; r++) {
        let latitude = mesh.r_y(r) / 1000; /* 0.0 - 1.0 */
        let d_temperature = mix(bias_north, bias_south, latitude);
        r_temperature[r] = 1.0 - r_elevation[r] + d_temperature;
    }
    return r_temperature;
}


/**
 * Biomes assignment -- see the biome() function above
 */
export function assign_r_biome(
    r_biome: BiomeColor[],
    mesh: TriangleMesh,
    r_ocean: boolean[], r_water: boolean[], r_coast: boolean[], r_temperature: number[], r_moisture: number[]
) {
    if (mesh.numRegions === undefined) {
        throw new Error("mesh.numRegions is undefined");
    }
    r_biome.length = mesh.numRegions;
    for (let r = 0; r < mesh.numRegions; r++) {
        r_biome[r] = biome(r_ocean[r], r_water[r], r_coast[r],
                           r_temperature[r], r_moisture[r]);
    }
    return r_biome;
}

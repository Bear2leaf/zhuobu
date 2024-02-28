///<reference path="./wx/index.d.ts"/>

declare type WorkerResponse =
    { type: "WorkerInit"; }
    | { type: "Refresh"; }
    | { type: "SendState"; broadcast: true; args: [StateData] }

    | never;
declare type WorkerRequest =
    | { type: "SyncState"; args?: [StateData]; broadcast?: boolean }
    | { type: "TerrainCreated"; }
    | { type: "CreateTerrain"; }
    | never;

declare type StateData = {
    modelTranslation?: [number, number, number];
    animation?: boolean;
    objects?: string[];
    programs?: string[];
    textures?: string[];
    framebuffers?: string[];
    attributes?: Record<string, { name: string, type: "FLOAT" | "INT", value: number[], size: number }[]>;
    uniforms?: Record<string, { name: string, type: '1iv' | '1i' | '1f' | '2fv' | '3fv' | 'Matrix4fv', value: number[] }[]>;
    instanceCounts?: Record<string, number>;
}
declare type Matrix = number[] | Float32Array;
declare type WindowInfo = { width: number; height: number; ratio: number; }
declare type TouchInfo = { x: number, y: number }
declare type TouchInfoFunction = (info?: TouchInfo) => void
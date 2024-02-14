import HelloGLTF from "../model/HelloGLTF.js";
import CacheManager from "./CacheManager.js";
import SceneManager from "./SceneManager.js";
import EventManager from "./EventManager.js";
import IslandGLTF from "../model/IslandGLTF.js";
import Mesh from "../drawobject/Mesh.js";
import EagleMesh from "../drawobject/EagleMesh.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import RockMesh from "../drawobject/RockMesh.js";
import ShipMesh from "../drawobject/ShipMesh.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import Entity from "../entity/Entity.js";


export default class GLTFManager {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    readonly helloGLTF: HelloGLTF = new HelloGLTF();
    readonly islandGLTF: IslandGLTF = new IslandGLTF();
    private rockCounter = 6;
    private shipCounter = 1;
    async load(): Promise<void> {
        await this.getCacheManager().loadGLTFCache(this.helloGLTF.getName());
        await this.getCacheManager().loadGLTFCache(this.islandGLTF.getName());
    }
    setBufferCaches() {
        this.helloGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.islandGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.islandGLTF.setImageCache(this.getCacheManager().getImageCache());
    }
    initObservers() {
        this.getEventManager().onEntityInit.initMesh = this.initMesh.bind(this);
    }
    initMesh(entity: Entity) {
        if (entity.has(WhaleMesh)) {
            entity.get(WhaleMesh).setGLTF(this.islandGLTF);
            entity.get(WhaleMesh).setNodeIndex(47);
            entity.get(WhaleMesh).setAnimationIndex(2)
        } else if (entity.has(HelloWireframe)) {
            entity.get(HelloWireframe).setGLTF(this.helloGLTF);
        } else if (entity.has(TerrainMesh)) {
            entity.get(TerrainMesh).setGLTF(this.islandGLTF);
            entity.get(TerrainMesh).setNodeIndex(49);
        } else if (entity.has(RockMesh)) {
            entity.get(RockMesh).setGLTF(this.islandGLTF);
            entity.get(RockMesh).setNodeIndex(this.rockCounter++);
        } else if (entity.has(ShipMesh)) {
            const counter  = this.shipCounter++;
            const gltf = this.islandGLTF;
            entity.all(ShipMesh).forEach((mesh, index) => {
                const primitives = gltf.getMeshByIndex(gltf.getNodeByIndex(counter).getMesh()).getPrimitives();
                if (index < primitives.length) {
                    mesh.setPrimitiveIndex(index);
                }
                mesh.setGLTF(gltf);
                mesh.setNodeIndex(counter);
            });
            
        } else if (entity.has(EagleMesh)) {
            const allMeshs = entity.all(EagleMesh);
            for (const mesh of allMeshs) {
                mesh.setGLTF(this.islandGLTF);
                mesh.setPrimitiveIndex(allMeshs.indexOf(mesh));
                mesh.setNodeIndex(39);
            }
        }
        entity.all(Mesh).forEach(mesh => mesh.initMesh());
    }
    initGLTFs(): void {
        this.helloGLTF.init(this.getCacheManager().getGLTF(this.helloGLTF.getName()))
        this.islandGLTF.init(this.getCacheManager().getGLTF(this.islandGLTF.getName()))

    }
    setCacheManager(cacheManager: CacheManager) {
        this.cacheManager = cacheManager;
    }
    getCacheManager(): CacheManager {
        if (this.cacheManager === undefined) {
            throw new Error("cacheManager is undefined");
        }
        return this.cacheManager;
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
}
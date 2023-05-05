import { LineRenderer } from "../renderer/LineRenderer.js";
import GLTFMeshRenderer from "../renderer/MeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TextRenderer from "../renderer/TextRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";

export default class RendererFactory {
    createPointRenderer() {
        return new PointRenderer();
    }
    createSpriteRenderer() {
        return new SpriteRenderer()
    }
    createTextRenderer() {
        return new TextRenderer()
    }
    private mainRenderer?: TriangleRenderer;
    createLineRenderer() {
        return new LineRenderer()
    }
    createGLTFMeshRenderer() {
        return new GLTFMeshRenderer()
    }
    createMainRendererSingleton() {
        if (!this.mainRenderer) {
            this.mainRenderer = this.createMainRenderer();
        }
        return this.mainRenderer;
    }
    createMainRenderer() {
        return new TriangleRenderer()
    }
}
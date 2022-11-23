import Particle from "./particle.js";
import ResourceManager from "./resource_manager.js";
export default class ParticleGenerator {
    constructor(shader, texture, amount) {
        this.shader = shader;
        this.texture = texture;
        this.amount = amount;
        this.lastUsedParticle = 0;
        this.init();
        this.particles = [];
        for (let i = 0; i < this.amount; ++i) {
            this.particles.push(new Particle());
        }
    }
    init() {
        this.vao = ResourceManager.gl.createVertexArray();
        this.positionLocation = ResourceManager.gl.getAttribLocation(this.shader.program, 'a_position');
        this.positionBuffer = ResourceManager.gl.createBuffer();
        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, this.positionBuffer);
        ResourceManager.gl.bufferData(ResourceManager.gl.ARRAY_BUFFER, new Float32Array([
            // pos      // tex
            0.0, 1.0, 0.0, 1.0,
            1.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 0.0
        ]), ResourceManager.gl.STATIC_DRAW);
        ResourceManager.gl.bindVertexArray(this.vao);
        ResourceManager.gl.enableVertexAttribArray(this.positionLocation);
        ResourceManager.gl.vertexAttribPointer(this.positionLocation, 4, ResourceManager.gl.FLOAT, false, 0, 0);
        ResourceManager.gl.bindBuffer(ResourceManager.gl.ARRAY_BUFFER, null);
    }
    firstUnusedParticle() {
        // first search from last used particle, this will usually return almost instantly
        for (let i = this.lastUsedParticle; i < this.amount; ++i) {
            if (this.particles[i].life <= 0.0) {
                this.lastUsedParticle = i;
                return i;
            }
        }
        // otherwise, do a linear search
        for (let i = 0; i < this.lastUsedParticle; ++i) {
            if (this.particles[i].life <= 0.0) {
                this.lastUsedParticle = i;
                return i;
            }
        }
        // all particles are taken, override the first one (note that if it repeatedly hits this case, more particles should be reserved)
        this.lastUsedParticle = 0;
        return 0;
    }
    respawnParticle(particle, object, offset) {
        const random = ((Math.random() % 100) - 50) / 10.0;
        const rColor = 0.5 + ((Math.random() % 100) / 100.0);
        particle.position[0] = object.position[0] + random + offset[0];
        particle.position[1] = object.position[1] + random + offset[1];
        particle.color[0] = rColor;
        particle.color[1] = rColor;
        particle.color[2] = rColor;
        particle.color[3] = 1;
        particle.life = 1.0;
        particle.velocity[0] = object.velocity[0] * 0.1;
        particle.velocity[1] = object.velocity[1] * 0.1;
    }
    update(dt, object, newParticles, offset) {
        // add new particles 
        for (let i = 0; i < newParticles; ++i) {
            const unusedParticle = this.firstUnusedParticle();
            this.respawnParticle(this.particles[unusedParticle], object, offset);
        }
        // update all particles
        for (let i = 0; i < this.amount; ++i) {
            const p = this.particles[i];
            p.life -= dt; // reduce life
            if (p.life > 0.0) { // particle is alive, thus update
                p.position[0] -= p.velocity[0] * dt;
                p.position[1] -= p.velocity[1] * dt;
                p.color[3] -= dt * 2.5;
            }
        }
    }
    draw() {
        // use additive blending to give it a 'glow' effect
        ResourceManager.gl.blendFunc(ResourceManager.gl.SRC_ALPHA, ResourceManager.gl.ONE);
        this.shader.use();
        for (const particle of this.particles) {
            if (particle.life > 0.0) {
                this.shader.setVector2f("offset", particle.position);
                this.shader.setVector4f("color", particle.color);
                this.texture.bind();
                ResourceManager.gl.bindVertexArray(this.vao);
                ResourceManager.gl.drawArrays(ResourceManager.gl.TRIANGLES, 0, 6);
            }
        }
        // don't forget to reset to default blending mode
        ResourceManager.gl.blendFunc(ResourceManager.gl.SRC_ALPHA, ResourceManager.gl.ONE_MINUS_SRC_ALPHA);
    }
}
//# sourceMappingURL=particle_generator.js.map
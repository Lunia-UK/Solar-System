import * as THREE from 'three'
import Star from './World/Star'
import Stars from './World/Stars'
import Planet from './World/Planet'
import AsteroidBelt from "./World/AsteroidBelt";

export default class World
{
    constructor(_options)
    {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setStar()
                this.setStars()
                this.setPlanets()
                this.setAsteriodBelt()
            }
        })
    }

    setStar()
    {
        this.star = new Star()
    }

    setStars()
    {
        this.stars = new Stars()
    }

    setPlanets() {
        this.dataPlanets = this.resources.items.data.planets
        for(const dataPlanet of this.dataPlanets) {
            new Planet(dataPlanet)
        }

    }

    setAsteriodBelt() {
        new AsteroidBelt(this.scene)
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }
}
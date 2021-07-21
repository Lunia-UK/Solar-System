import * as THREE from 'three'
import Star from './World/Star'
import Stars from './World/Stars'

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
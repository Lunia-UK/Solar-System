import * as THREE from 'three'
import Star from './World/Star'

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
            }
        })
    }

    setStar()
    {
        this.star = new Star()
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
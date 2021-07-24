export default class InfosPlanet {

    constructor(name, data) {
        this.name = name;
        this.data = data
        this.setInfos()
    }

    setInfos() {
        this.planetData = this.data[this.name]
        this.name = document.querySelector('#name')
        this.name.innerText = this.planetData.name
        this.description = document.querySelector('#description')
        this.description.innerText = this.planetData.description
        this.distanceFromSun = document.querySelector('#distanceFromSun')
        this.distanceFromSun.innerText = this.planetData.distanceFromSun
        this.lengthOfYears = document.querySelector('#lengthOfYears')
        this.lengthOfYears.innerText = this.planetData.lengthOfYears
        this.planetType = document.querySelector('#planetType')
        this.planetType.innerText = this.planetData.planetType
        this.moons = document.querySelector('#moons')
        this.moons.innerText = this.planetData.moons

    }
}
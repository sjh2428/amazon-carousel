/**
 * model class for carousel
 */
class CarouselModel {
    constructor() {
    }

    async getCarouselData() {
        return await fetch("/api/getItem")
        .then(res => res.json())
        .then(json => json);
    }
}

export default CarouselModel
/**
 * model class for carousel
 */
class CarouselModel {
    constructor(data) {
        this.data = data;
    }

    async getCarouselData() {
        // return this.data;
        return await fetch("/api/main-carousel")
        .then(res => res.json())
        .then(json => {
            return json;
        });
    }
}

export default CarouselModel
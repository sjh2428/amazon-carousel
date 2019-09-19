/**
 * model class for carousel
 */
class CarouselModel {
    constructor(data) {
        this.data = data;
    }

    getMiniCarouselData() {
        return this.data;
        // return fetch("/api/mini-carousel")
        // .then(res => res.json())
        // .then(json => {
        //     return json;
        // });
    }
}

export default CarouselModel
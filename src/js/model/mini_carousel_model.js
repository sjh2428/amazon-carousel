import miniCarouselData from "./data/mini_carousel";

/**
 * model class for mini carousel
 */
class MiniCarouselModel {
    constructor() {}

    getMiniCarouselData() {
        return miniCarouselData;
        // return fetch("/api/mini-carousel")
        // .then(res => res.json())
        // .then(json => {
        //     return json;
        // });
    }
}

export default MiniCarouselModel
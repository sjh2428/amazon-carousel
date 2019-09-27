import "../sass/style.scss"
import "@babel/polyfill"

// import CarouselView from "./view/carousel_view";
import CardCarouselView from "./view/main_carousel_view";
import CarouselModel from "./model/carousel_model";
// import CarouselController from "./controller/carousel_controller";
import CardCarouselController from "./controller/main_carousel_controller";

// import miniCarouselData from "./model/data/mini_carousel";
// import mainCarouselData from "./model/data/main_carousel";

// import miniCarouselConfig from "./config/mini_carousel_config";
import mainCarouselConfig from "./config/main_carousel_config";

// const MiniCarouselInit = () => {
//     const Model = new CarouselModel(miniCarouselData);
//     const View = new CarouselView(Model, miniCarouselConfig);
//     const Controller = new CarouselController(View, miniCarouselConfig);
// };

// MiniCarouselInit();

const mainCarouselInit = () => {
    const Model = new CarouselModel();
    const View = new CardCarouselView(Model, mainCarouselConfig);
    const Controller = new CardCarouselController(View, mainCarouselConfig);
}

mainCarouselInit();
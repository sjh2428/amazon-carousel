import "../sass/style.scss"

import CarouselView from "./view/carousel_view";
import CarouselModel from "./model/carousel_model";
import CarouselController from "./controller/carousel_controller";

import miniCarouselData from "./model/data/mini_carousel";
import mainCarouselConfig from "./model/data/main_carousel";

import miniCarouselConfig from "./config/mini_carousel_config";
import mainCarouselConfig from "./config/mini_carousel_config";

const MiniCarouselInit = () => {
    const Model = new CarouselModel(miniCarouselData);
    const View = new CarouselView(Model, miniCarouselConfig);
    const Controller = new CarouselController(View, miniCarouselConfig);
};

MiniCarouselInit();


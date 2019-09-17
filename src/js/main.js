import "../sass/style.scss"
import MiniCarouselView from "./view/mini_carousel_view";
import MiniCarouselModel from "./model/mini_carousel_model";
import MiniCarouselController from "./controller/mini_carousel_controller";

const MiniCarouselInit = () => {
    const Model = new MiniCarouselModel();
    const Controller = new MiniCarouselController(Model);
    const View = new MiniCarouselView(Controller);
};

MiniCarouselInit();
import config from "../config";

class MiniCarouselView {
    constructor(controller) {
        this.controller = controller;
        this.mainDOM = document.getElementById(`${config.classNames.miniCarouselMain}`);
        this.mainDOM.innerHTML = controller.getModelMiniCarouselHTML();
        this.mainDOM.addEventListener("click", (e) => controller.handleEvent(e));
        controller.scrollSetting();
    }
}

export default MiniCarouselView
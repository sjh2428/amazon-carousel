import config from "../config";

/**
 * view class for mini carousel
 */
class MiniCarouselView {
    /**
     * render html, inject event, set scroll position
     *
     * @param controller controller class for mini carousel
     */
    constructor(controller) {
        const { miniCarouselMain } = config.classNames;
        this.controller = controller;
        this.mainDOM = document.getElementById(`${miniCarouselMain}`);
        this.mainDOM.innerHTML = controller.getModelMiniCarouselHTML();
        this.mainDOM.addEventListener("click", (e) => controller.handleEvent(e.target.classList[0]));
        controller.scrollSetting();
    }
}

export default MiniCarouselView
import toPx from "to-px";
import config from "../config.js";

/**
 * controller for mini carousel
 */
class MiniCarouselController {
    /**
     * set interval for auto sliding and save model to this object
     *
     * @param {Class} model model for mini carousel
     */
    constructor(model) {
        this.model = model;
        this.interval = setInterval(() => this.moveRightHandler(), config.miniCarouselIntervalTime);
    }

    /**
     * init auto sliding per every click and diverge left, right btn to handler
     *
     * @param {event} e clicked target
     */
    handleEvent(e) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.moveRightHandler(), config.miniCarouselIntervalTime);
        switch (e.target.classList[0]) {
            case config.classNames.miniCarouselLeftBtnClassName:
                this.moveLeftHandler(e.target.classList[0]);
                break;
            case config.classNames.miniCarouselRightBtnClassName:
                this.moveRightHandler(e.target.classList[0]);
                break;
            default:
                console.log(e.target);
        }
    }

    /**
     * get mini carousel HTML in model object
     *
     * @returns {string} mini carousel HTML
     */
    getModelMiniCarouselHTML() {
        return this.model.miniCarouselHTML;
    }

    /**
     * set initial scroll position
     */
    scrollSetting() {
        document.querySelector(`.${config.classNames.miniCarouselViewportClassName}`).scrollLeft
            = Math.floor(
                document.querySelectorAll(
                    `.${config.classNames.miniCarouselLiClassName}`).length / 2) * toPx(config.miniCarouselWidth);
    }

    /**
     * after move left, restore to origin position
     */
    moveLeftHandler() {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUlClassName}`);
        const crsLis = crsUl.querySelectorAll(`.${config.classNames.miniCarouselLiClassName}`);
        const crsLastLi = crsLis[crsLis.length - 1];
        this.move(crsUl, true);
        const restore = () => {
            crsUl.prepend(crsLastLi);
            crsUl.style.transition = "none";
            crsUl.style.transform = "none";
            crsUl.removeEventListener("transitionend", restore);
        };
        crsUl.addEventListener("transitionend", restore);
    }

    /**
     * after move right, restore to origin position
     */
    moveRightHandler() {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUlClassName}`);
        const crs1stLi = crsUl.querySelector(`.${config.classNames.miniCarouselLiClassName}`);
        this.move(crsUl, false);
        const restore = () => {
            crsUl.appendChild(crs1stLi);
            crsUl.style.transition = "none";
            crsUl.style.transform = "none";
            crsUl.removeEventListener("transitionend", restore);
        };
        crsUl.addEventListener("transitionend", restore);
    }

    /**
     * translateX left or right
     *
     * @param {Element} ul carousel ul element
     * @param {Boolean} direction true - left, false - right
     */
    move(ul, direction) {
        ul.style.transition = `all ${config.miniCarouselAnimationDuration}ms`;
        ul.style.transform = direction ? `translateX(${config.miniCarouselWidth})` : `translateX(-${config.miniCarouselWidth})`;
    }
}

export default MiniCarouselController
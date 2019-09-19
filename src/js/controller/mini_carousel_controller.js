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
        this.direction = {
            LEFT: true,
            RIGHT: false
        }
        this.interval = setInterval(() => this.moveRightHandler(), config.miniCarouselIntervalTime);
    }

    /**
     * init auto sliding per every click and diverge left, right btn to handler
     *
     * @param {String} className first class name in element
     */
    handleEvent(className) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.moveRightHandler(), config.miniCarouselIntervalTime);
        switch (className) {
            case config.classNames.miniCarouselLeftBtn:
                this.moveLeftHandler(className);
                break;
            case config.classNames.miniCarouselRightBtn:
                this.moveRightHandler(className);
                break;
            default:
                console.log(className);
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
        document.querySelector(`.${config.classNames.miniCarouselViewport}`).scrollLeft
            = Math.floor(
                document.querySelectorAll(
                    `.${config.classNames.miniCarouselLi}`).length / 2) * toPx(config.miniCarouselWidth);
    }

    /**
     * after move left, restore to origin position
     */
    moveLeftHandler() {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUl}`);
        const crsLis = crsUl.querySelectorAll(`.${config.classNames.miniCarouselLi}`);
        const crsLastLi = crsLis[crsLis.length - 1];
        this.move(crsUl, this.direction.LEFT);
        const restore = () => {
            crsUl.prepend(crsLastLi);
            crsUl.style.transition = "none";
            crsUl.style.transform = "none";
        };
        crsUl.addEventListener("transitionend", restore, { once: true });
    }

    /**
     * after move right, restore to origin position
     */
    moveRightHandler() {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUl}`);
        const crs1stLi = crsUl.querySelector(`.${config.classNames.miniCarouselLi}`);
        this.move(crsUl, this.direction.RIGHT);
        const restore = () => {
            crsUl.appendChild(crs1stLi);
            crsUl.style.transition = "none";
            crsUl.style.transform = "none";
        };
        crsUl.addEventListener("transitionend", restore, { once: true });
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
import toPx from "to-px";
import config from "../config.js";

/**
 * controller for mini carousel
 */
class MiniCarouselController {
    /**
     * set interval for auto sliding and save view class to this.view object
     *
     * @param {Class} view view for mini carousel
     */
    constructor(view) {
        const { miniCarouselIntervalTime } = config;
        this.view = view;
        this.direction = {
            LEFT: true,
            RIGHT: false
        }
        this.view.render();
        this.view.mainDOM.addEventListener("click", (e) => this.handleEvent(e.target.classList[0]));
        this.scrollSetting();
        this.interval = setInterval(() => this.moveRightHandler(), miniCarouselIntervalTime);
    }

    /**
     * init auto sliding per every click and diverge left, right btn to handler
     *
     * @param {String} className first class name in element
     */
    handleEvent(className) {
        const { miniCarouselIntervalTime, classNames: { miniCarouselLeftBtn, miniCarouselRightBtn } } = config;
        clearInterval(this.interval);
        this.interval = setInterval(() => this.moveRightHandler(), miniCarouselIntervalTime);
        switch (className) {
            case miniCarouselLeftBtn:
                this.moveLeftHandler(className);
                break;
            case miniCarouselRightBtn:
                this.moveRightHandler(className);
                break;
            default:
                console.log(className);
        }
    }

    /**
     * set initial scroll position
     */
    scrollSetting() {
        const { miniCarouselWidth, classNames: { miniCarouselViewport, miniCarouselLi } } = config;
        document.querySelector(`.${miniCarouselViewport}`).scrollLeft
            = Math.floor(
                document.querySelectorAll(
                    `.${miniCarouselLi}`).length / 2) * toPx(miniCarouselWidth);
    }

    /**
     * after move left, restore to origin position
     */
    moveLeftHandler() {
        const { miniCarouselUl, miniCarouselLi } = config.classNames;
        const crsUl = document.querySelector(`.${miniCarouselUl}`);
        const crsLis = crsUl.querySelectorAll(`.${miniCarouselLi}`);
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
        const { miniCarouselUl, miniCarouselLi } = config.classNames;
        const crsUl = document.querySelector(`.${miniCarouselUl}`);
        const crs1stLi = crsUl.querySelector(`.${miniCarouselLi}`);
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
        const { miniCarouselAnimationDuration, miniCarouselWidth } = config;
        ul.style.transition = `all ${miniCarouselAnimationDuration}ms`;
        ul.style.transform = direction ? `translateX(${miniCarouselWidth})` : `translateX(-${miniCarouselWidth})`;
    }
}

export default MiniCarouselController
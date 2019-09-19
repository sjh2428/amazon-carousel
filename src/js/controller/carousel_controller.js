import toPx from "to-px";

/**
 * controller for mini carousel
 */
class MiniCarouselController {
    /**
     * set interval for auto sliding and save view class to this.view object
     *
     * @param {Class} view view for mini carousel
     */
    constructor(view, config) {
        this.view = view;
        this.config = config;
        const { intervalTime } = this.config;
        this.direction = {
            LEFT: true,
            RIGHT: false
        }
        this.view.render();
        this.view.mainDOM.addEventListener("click", (e) => this.handleEvent(e.target.classList[0]));
        this.scrollSetting();
        this.interval = setInterval(() => this.moveRightHandler(), intervalTime);
    }

    /**
     * init auto sliding per every click and diverge left, right btn to handler
     *
     * @param {String} className first class name in element
     */
    handleEvent(className) {
        const { intervalTime, classNames: { leftBtn, rightBtn } } = this.config;
        clearInterval(this.interval);
        this.interval = setInterval(() => this.moveRightHandler(), intervalTime);
        switch (className) {
            case leftBtn:
                this.moveLeftHandler(className);
                break;
            case rightBtn:
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
        const { width, classNames: { viewport, li } } = this.config;
        document.querySelector(`.${ viewport }`).scrollLeft
            = Math.floor(
                document.querySelectorAll(
                    `.${li}`).length / 2) * toPx(width);
    }

    /**
     * after move left, restore to origin position
     */
    moveLeftHandler() {
        const { ul, li } = this.config.classNames;
        const crsUl = document.querySelector(`.${ul}`);
        const crsLis = crsUl.querySelectorAll(`.${li}`);
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
        const { ul, li } = this.config.classNames;
        const crsUl = document.querySelector(`.${ul}`);
        const crs1stLi = crsUl.querySelector(`.${li}`);
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
        const { animationDuration, width } = this.config;
        ul.style.transition = `all ${animationDuration}ms`;
        ul.style.transform = direction ? `translateX(${width})` : `translateX(-${width})`;
    }
}

export default MiniCarouselController
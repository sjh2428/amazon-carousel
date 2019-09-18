import toPx from "to-px";
import config from "../config.js";

class MiniCarouselController {
    constructor(model) {
        this.model = model;
        this.interval = setInterval(() => this.moveRightHandler(), 3000);
    }

    handleEvent(e) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.moveRightHandler(), 3000);
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

    getModelMiniCarouselHTML() {
        return this.model.miniCarouselHTML;
    }

    scrollSetting() {
        document.querySelector(`.${config.classNames.miniCarouselViewportClassName}`).scrollLeft
            = Math.floor(
                document.querySelectorAll(
                    `.${config.classNames.miniCarouselLiClassName}`).length / 2) * toPx(config.miniCarouselWidth);
    }

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

    move(ul, direction) {
        ul.style.transition = `all ${config.miniCarouselAnimationDuration}ms`;
        ul.style.transform = direction ? `translateX(${config.miniCarouselWidth})` : `translateX(-${config.miniCarouselWidth})`;
    }
}

export default MiniCarouselController
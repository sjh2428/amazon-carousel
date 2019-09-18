import toPx from "to-px";
import config from "../config.js";

class MiniCarouselController {
    constructor(model) {
        this.model = model;
    }

    handleEvent(e) {
        switch (e.target.classList[0]) {
            case config.classNames.miniCarouselLeftBtnClassName:
                this.moveLeftHandler(e.target);
                break;
            case config.classNames.miniCarouselRightBtnClassName:
                this.moveRightHandler(e.target);
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

    moveLeftHandler(target) {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUlClassName}`);
        this.moveLeft(crsUl);
        crsUl.addEventListener("transitionend", this.restoreMovedTransLeft);
    }

    moveRightHandler(target) {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUlClassName}`);
        this.moveRight(crsUl);
        crsUl.addEventListener("transitionend", this.restoreMovedTransRight);
    }

    moveLeft(ul) {
        ul.style.transition = `all ${config.miniCarouselAnimationDuration}ms`;
        ul.style.transform = `translateX(${config.miniCarouselWidth})`;
    }

    moveRight(ul) {
        ul.style.transition = `all ${config.miniCarouselAnimationDuration}ms`;
        ul.style.transform = `translateX(-${config.miniCarouselWidth})`;
    }

    restoreMovedTransLeft(e) {
        const crsUl = e.target;
        const crsLis = crsUl.querySelectorAll(`.${config.classNames.miniCarouselLiClassName}`);
        const crsLastLi = crsLis[crsLis.length - 1];
        crsUl.prepend(crsLastLi);
        crsUl.style.transition = "none";
        crsUl.style.transform = "none";
    }

    restoreMovedTransRight(e) {
        const crsUl = e.target;
        const crs1stLi = crsUl.querySelector(`.${config.classNames.miniCarouselLiClassName}`);
        crsUl.appendChild(crs1stLi);
        crsUl.style.transition = "none";
        crsUl.style.transform = "none";
    }
}

export default MiniCarouselController
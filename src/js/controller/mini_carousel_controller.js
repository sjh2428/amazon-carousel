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
        const crsLis = crsUl.querySelectorAll(`.${config.classNames.miniCarouselLiClassName}`);
        const crsLastLi = crsLis[crsLis.length - 1];
        this.moveLeft(crsUl, crsLastLi);
    }

    moveRightHandler(target) {
        const crsUl = document.querySelector(`.${config.classNames.miniCarouselUlClassName}`);
        const crs1stLi = crsUl.querySelector(`.${config.classNames.miniCarouselLiClassName}`);
        this.moveRight(crsUl, crs1stLi);
    }

    moveLeft(ul, li) {
        ul.style.transition = `all ${config.miniCarouselAnimationDuration}ms`;
        ul.style.transform = `translateX(${config.miniCarouselWidth})`;
        setTimeout(() => {
            ul.prepend(li);
            ul.style.transition = "none";
            ul.style.transform = "none";
        }, config.miniCarouselAnimationDuration);
    }

    moveRight(ul, li) {
        ul.style.transition = `all ${config.miniCarouselAnimationDuration}ms`;
        ul.style.transform = `translateX(-${config.miniCarouselWidth})`;
        setTimeout(() => {
            ul.appendChild(li);
            ul.style.transition = "none";
            ul.style.transform = "none";
        }, config.miniCarouselAnimationDuration);
    }
}

export default MiniCarouselController
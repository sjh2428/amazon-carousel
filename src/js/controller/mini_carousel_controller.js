import toPx from "to-px";

class MiniCarouselController {
    constructor(model) {
        this.model = model;
    }

    handleEvent(e) {
        switch (e.target.classList[0]) {
            case "crs-move-left-btn":
                this.moveLeftHandler(e.target);
                break;
            case "crs-move-right-btn":
                this.moveRightHandler(e.target);
                break;
            default:
                console.log(e.target);
        }
    }

    getModelMiniCarousel() {
        return this.model.miniCarousel;
    }

    scrollSetting() {
        document.querySelector(".seeing-crs").scrollLeft
            = Math.floor(document.querySelectorAll(".crs-item-wrap-li").length / 2) * toPx("13rem");
    }

    moveLeftHandler(target) {
        const crsUl = document.querySelector(".crs-item-ul");
        const crsLis = crsUl.querySelectorAll("li");
        const crsLastLi = crsLis[crsLis.length - 1];
        // crsUl.prepend(crsLastLi);
        crsLastLi.style.width = "0";
        crsUl.prepend(crsLastLi);
        const frame = (pos) => {
            if (pos > 13) {
                crsLastLi.style.width = "13rem";
            } else {
                pos += 2;
                crsLastLi.style.width = `${pos}rem`;
                requestAnimationFrame(() => {
                    frame(pos);
                });
            }
        };
        frame(0);
    }

    moveRightHandler(target) {
        const crsUl = document.querySelector(".crs-item-ul");
        const crs1stLi = crsUl.querySelector("li");
        const frame = (pos) => {
            if (pos < 0) {
                crsUl.appendChild(crs1stLi);
                crs1stLi.style.width = "13rem";
            } else {
                pos -= 2;
                crs1stLi.style.width = `${pos}rem`;
                requestAnimationFrame(() => {
                    frame(pos);
                });
            }
        };
        frame(13);
    }
}

export default MiniCarouselController
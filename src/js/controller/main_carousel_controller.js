import toPx from "to-px";

/**
 * controller for carousel
 */
class CardCarouselController {
    /**
     * set interval for auto sliding and save view class to this.view object
     *
     * @param {Class} view view class for carousel
     * @param {Object} config config obj for carousel
     */
    constructor(view, config) {
        this.view = view;
        this.config = config;
        this.direction = {
            LEFT: true,
            RIGHT: false
        }
        this.view.render();
        this.view.mainDOM.addEventListener("click", (e) => this.handleEvent(e));
    }

    handleEvent(e) {
        const { classList } = e.target;
        const { classNames: { leftBtn, rightBtn } } = this.config;
        const { image, cardIdxBtn } = this.config.card.classNames;
        switch (classList[0]) {
            case leftBtn:
                this.moveLeftHandler(classList[0]);
                break;
            case rightBtn:
                this.moveRightHandler(classList[0]);
                break;
            case image:
                this.cardHandler(e.target);
                break;
            case cardIdxBtn:
                this.indexBtnHandler(e.target);
                break;
            default:
                console.log(e.target);
        }
    }

    indexBtnHandler(target) {
        const crsItems = document.querySelectorAll(".card-crs-item-wrap-li");
        const seeingCarouselIdx = Math.floor(crsItems.length / 2);
        const nowSeeingIdx = crsItems[seeingCarouselIdx].getAttribute("posidx");
        const clickedIdx = target.getAttribute("idx");
        console.log("now seeing index", nowSeeingIdx);
        console.log("clicked index", clickedIdx);
        this.switchSelectedIdxBtn(target);
    }

    switchSelectedIdxBtn(target) {
        const { selectedIdxBtn } = this.config.card.classNames;
        target.parentNode.querySelectorAll("*").forEach(element => {
            const { classList } = element
            if (classList.contains(selectedIdxBtn)) {
                classList.remove(selectedIdxBtn);
            }
        });
        target.classList.add(selectedIdxBtn);
    }

    cardHandler(target) {
        const { wrapper, selectedCard, btnsWrapper, selectedIdxBtn } = this.config.card.classNames;
        for (const element of document.querySelectorAll(`.${wrapper}`)) {
            const btnsWrapperOfElement = element.querySelector(`.${btnsWrapper}`);
            element.classList.remove(selectedCard);
            btnsWrapperOfElement.style.display = "none";
            for (const child of btnsWrapperOfElement.children) {
                child.classList.remove(selectedIdxBtn);
            }
        }
        const { parentNode, parentNode: { classList } } = target;
        const btnsWrapperElement = parentNode.querySelector(`.${btnsWrapper}`);
        btnsWrapperElement.style.display = "flex";
        btnsWrapperElement.firstElementChild.classList.add(selectedIdxBtn);
        classList.add(selectedCard);
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

export default CardCarouselController
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
        this.scrollPositionSetting();
        this.liOrderSetting();
    }

    liOrderSetting() {
        const { ul, li } = this.config.classNames;
        const loop = Math.floor(
            document.querySelectorAll(
                `.${li}`).length / 2);
        const ulSelector = document.querySelector(`.${ul}`);
        for (let i = 0; i < loop; i++) ulSelector.prepend(ulSelector.lastElementChild);
    }

    /**
     * set initial scroll position
     */
    scrollPositionSetting() {
        const { width, classNames: { viewport, li } } = this.config;
        document.querySelector(`.${ viewport }`).scrollLeft
            = Math.floor(
                document.querySelectorAll(
                    `.${li}`).length / 2) * toPx(width);
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
        const { width } = this.config;
        const { ul, li } = this.config.classNames;
        const crsUl = document.querySelector(`.${ul}`);
        const crsItems = document.querySelectorAll(`.${li}`);
        const centerCarouselIdx = Math.floor(crsItems.length / 2);
        const nowSeeingIdx = crsItems[centerCarouselIdx].getAttribute("posidx");
        const clickedIdx = target.getAttribute("idx");
        console.log("now seeing index", nowSeeingIdx);
        console.log("clicked index", clickedIdx);
        this.switchSelectedIdxBtn(target);
        console.log("end of left carousel index :", crsItems[0].getAttribute("posidx"));
        console.log("end of right carousel index :",crsItems[crsItems.length - 1].getAttribute("posidx"));
        
        const children = crsUl.children;
        for(let i = 0; i < children.length; i++) {
            if (children[i].getAttribute("posidx") === clickedIdx) {
                if (i < centerCarouselIdx) {
                    console.log("왼쪽으로", centerCarouselIdx - i, "만큼 가야함");
                    this.moveCustom(crsUl, true, `${Number(width.slice(0, -3)) * (centerCarouselIdx - i)}rem`);
                    const restore = () => {
                        const crsLastLi = [];
                        for(let j = 0; j < centerCarouselIdx - i; j++) {
                            crsLastLi.push(crsItems[crsItems.length - (j + 1)]);
                        }
                        crsLastLi.forEach(li => {
                            crsUl.prepend(li);
                        });
                        crsUl.style.transition = "none";
                        crsUl.style.transform = "none";
                    };
                    crsUl.addEventListener("transitionend", restore, { once: true });
                    break;
                } else if (i > centerCarouselIdx) {
                    console.log("오른쪽", i - centerCarouselIdx, "만큼 가야남");
                    this.moveCustom(crsUl, false, `${Number(width.slice(0, -3)) * (i - centerCarouselIdx)}rem`);
                    const restore = () => {
                        const crs1stLi = [];
                        for(let j = 0; j < i - centerCarouselIdx; j++) {
                            crs1stLi.push(crsItems[j]);
                        }
                        crs1stLi.forEach(li => {
                            crsUl.appendChild(li);
                        });
                        crsUl.style.transition = "none";
                        crsUl.style.transform = "none";
                    };
                    crsUl.addEventListener("transitionend", restore, { once: true });
                    break;
                } else {
                    console.log("제자리");
                    break;
                }
            }
        }
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

    moveCustom(ul, direction, moveLength) {
        const { animationDuration } = this.config;
        ul.style.transition = `all ${animationDuration}ms`;
        ul.style.transform = direction ? `translateX(${moveLength})` : `translateX(-${moveLength})`;
    }
}

export default CardCarouselController
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
        this.liOrderPreSetting();
    }

    liOrderPreSetting() {
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
        const { classNames: { leftBtn, rightBtn }, 
                card: { 
                    classNames: { image, cardIdxBtn } } } = this.config;
        switch (classList[0]) {
            case leftBtn:
                this.arrowBtnHandler(this.direction.LEFT);
                break;
            case rightBtn:
                this.arrowBtnHandler(this.direction.RIGHT);
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

    findMatchingPositionIndex(f, iter) {
        let index = 0;
        for (const a of iter) {
            if (f(a)) return index;
            index++;
        }
        return undefined;
    }

    indexBtnHandler(target) {
        const { width, classNames: { ul, li } } = this.config;
        const crsUl = document.querySelector(`.${ul}`);
        const crsItems = document.querySelectorAll(`.${li}`);
        const centerCarouselIdx = Math.floor(crsItems.length / 2);
        const clickedIdx = target.getAttribute("idx");
        const index = this.findMatchingPositionIndex(a => a.getAttribute("posidx") === clickedIdx, crsUl.children);
        this.switchSelectedIdxBtn(target);
        if (index < centerCarouselIdx) {
            this.move(crsUl,
                this.direction.LEFT,
                `${Number(width.slice(0, -3)) * (centerCarouselIdx - index)}rem`);
            const liList = 
                this.getToPushList((i) => i < centerCarouselIdx - index, crsItems, this.direction.LEFT);
            crsUl.addEventListener("transitionend", 
            e => this.restore(crsUl, liList, this.direction.LEFT),
            { once: true });
        } else if (index > centerCarouselIdx) {
            this.move(crsUl, 
                this.direction.RIGHT,
                `${Number(width.slice(0, -3)) * (index - centerCarouselIdx)}rem`);
            const liList = 
                this.getToPushList((i) => i < index - centerCarouselIdx, crsItems, this.direction.RIGHT);
            crsUl.addEventListener("transitionend", 
            e => this.restore(crsUl, liList, this.direction.RIGHT),
            { once: true });
        }
    }



    getToPushList(condition, items, direction) {
        const list = [];
        for(let i = 0; condition(i); i++) list.push(this.getItem(direction, i, items));
        return list;
    }

    getItem(direction, index, items) {
        return direction ? items[items.length - (index + 1)] : items[index];
    }

    moveLiTag(ulTag, liTagList, direction) {
        if (!Array.isArray(liTagList)) {
            liTagList = [liTagList];
        }
        if (direction) for(const liTag of liTagList) ulTag.prepend(liTag);
        else for(const liTag of liTagList) ulTag.appendChild(liTag);
    }

    restore(ul, liTagsList, direction) {
        this.moveLiTag(ul, liTagsList, direction);
        ul.style.transition = "none";
        ul.style.transform = "none";
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
        this.cardInit();
        const { selectedCard, btnsWrapper, selectedIdxBtn } = this.config.card.classNames;
        const { parentNode, parentNode: { classList } } = target;
        const btnsWrapperElement = parentNode.querySelector(`.${btnsWrapper}`);
        btnsWrapperElement.style.display = "flex";
        btnsWrapperElement.firstElementChild.classList.add(selectedIdxBtn);
        classList.add(selectedCard);
        this.indexBtnHandler(btnsWrapperElement.firstElementChild);
    }

    cardInit() {
        const { wrapper, selectedCard, btnsWrapper } = this.config.card.classNames;
        for (const element of document.querySelectorAll(`.${wrapper}`)) {
            const btnsWrapperOfElement = element.querySelector(`.${btnsWrapper}`);
            element.classList.remove(selectedCard);
            this.cardIdxBtnInit(btnsWrapperOfElement);
        }
    }

    cardIdxBtnInit(btnsWrapper) {
        const { selectedIdxBtn } = this.config.card.classNames;
        btnsWrapper.style.display = "none";
        for (const child of btnsWrapper.children) {
            child.classList.remove(selectedIdxBtn);
        }
    }

    arrowBtnHandler(direction) {
        const { ul, li } = this.config.classNames;
        const crsUl = document.querySelector(`.${ul}`);
        const crsLis = crsUl.querySelectorAll(`.${li}`);
        const crsLi = direction ? crsLis[crsLis.length - 1] : crsLis[0];
        this.move(crsUl, direction);
        crsUl.addEventListener("transitionend", e => this.restore(crsUl, crsLi, direction), { once: true });
        const nextLi = direction ? crsLis[Math.floor(crsLis.length / 2) - 1] : crsLis[Math.floor(crsLis.length / 2) + 1];
        this.cardUpdate(nextLi);
    }

    cardUpdate(nextLi) {
        const { selectedCard, selectedIdxBtn, cardIdxBtn } = this.config.card.classNames;
        const btn = document.querySelector(`.${cardIdxBtn}[idx='${nextLi.getAttribute("posidx")}']`);
        this.cardInit();
        btn.parentElement.parentElement.classList.add(`${selectedCard}`);
        btn.parentElement.style.display = "flex";
        btn.classList.add(selectedIdxBtn);
    }

    /**
     * translateX left or right
     *
     * @param {Element} ul carousel ul element
     * @param {Boolean} direction true - left, false - right
     * @param {String} moveLength width to move
     */
    move(ul, direction, moveLength = this.config.width) {
        const { animationDuration } = this.config;
        ul.style.transition = `all ${animationDuration}ms`;
        ul.style.transform = direction ? `translateX(${moveLength})` : `translateX(-${moveLength})`;
    }
}

export default CardCarouselController
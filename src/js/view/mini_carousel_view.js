import config from "../config";

/**
 * view class for mini carousel
 */
class MiniCarouselView {
    /**
     * 
     * @param model 
     */
    constructor(model) {
        const { miniCarouselMain } = config.classNames;
        this.mainDOM = document.querySelector(`.${miniCarouselMain}`);
        this.model = model;
    }

    getHTML() {
        let html = /*html*/`
        <div class="${config.classNames.miniCarouselWrapper}">
            <div class="${config.classNames.miniCarouselViewportWrap}">
                <div class="${config.classNames.miniCarouselLeftBtn} ${config.classNames.miniCarouselMoveBtn}"></div>
                <div class="${config.classNames.miniCarouselShadow} ${config.classNames.miniCarouselShadowLeft}"></div>
                <div class="${config.classNames.miniCarouselViewport}">
                    <ul class="${config.classNames.miniCarouselUl}">`;
        this.model.getMiniCarouselData().forEach((data, idx) => {
            html += /*html*/`
                <li class="${config.classNames.miniCarouselLi}" posidx=${idx + 1}>
                    <a href="${data.link}">
                        <img src="${data.imgSrc}" 
                        alt="${data.description}" target="_blank">
                    </a>
                </li>
            `;
        });
        html += /*html*/`</ul>
                </div>
                <div class="${config.classNames.miniCarouselShadow} ${config.classNames.miniCarouselShadowRight}"></div>
                <div class="${config.classNames.miniCarouselRightBtn} ${config.classNames.miniCarouselMoveBtn}"></div>
            </div>
            <div class="${config.classNames.benefitWrap}">
                <h2 class="${config.classNames.benefitHeader}">
                    Amazon Originals, exclusively on Prime Video
                </h2>
                <div class="${config.classNames.benefitContent}">
                    Prime Video is the only place where you can watch Amazon Original series like "The Marvelous Mrs. Maisel", "Tom Clancy's Jack Ryan", "Homecoming", and "The Man in the High Castle".
                </div>
                <div class="${config.classNames.benefitFooter}">
                    <a href="${config.footerLink}">Explore Prime Video ▶︎</a>
                </div>
            </div>
        </div>`;
        return html;
    }

    render() {
        this.mainDOM.innerHTML = this.getHTML();
    }
}

export default MiniCarouselView
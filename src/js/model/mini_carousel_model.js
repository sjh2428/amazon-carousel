import config from "../config";
import miniCarouselData from "../miniCarouselData";

/**
 * model class for mini carousel
 */
class MiniCarouselModel {
    /**
     * set mini carousel HTML
     */
    constructor() {
        this.miniCarouselHTML = /*html*/`
            <div class="${config.classNames.miniCarouselWrapper}">
                <div class="${config.classNames.miniCarouselViewportWrap}">
                    <div class="${config.classNames.miniCarouselLeftBtn} ${config.classNames.miniCarouselMoveBtn}"></div>
                    <div class="${config.classNames.miniCarouselShadow} ${config.classNames.miniCarouselShadowLeft}"></div>
                    <div class="${config.classNames.miniCarouselViewport}">
                        <ul class="${config.classNames.miniCarouselUl}">`;
        miniCarouselData.forEach((data, idx) => {
            this.miniCarouselHTML += /*html*/`
                <li class="${config.classNames.miniCarouselLi}" posidx=${idx + 1}>
                    <a href="${data.link}">
                        <img src="${data.imgSrc}" 
                        alt="${data.description}" target="_blank">
                    </a>
                </li>
            `;
        });
        this.miniCarouselHTML += /*html*/`</ul>
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
            </div>
        `;
    }
}

export default MiniCarouselModel
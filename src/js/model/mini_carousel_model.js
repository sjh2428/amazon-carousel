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
        this.miniCarouselHTML = `
            <div class="${config.classNames.miniCarouselWrapperClassName}">
                <div class="${config.classNames.miniCarouselViewportWrapClassName}">
                    <div class="${config.classNames.miniCarouselLeftBtnClassName} ${config.classNames.miniCarouselMoveBtnClassName}"></div>
                    <div class="${config.classNames.miniCarouselShadow} ${config.classNames.miniCarouselShadowLeft}"></div>
                    <div class="${config.classNames.miniCarouselViewportClassName}">
                        <ul class="${config.classNames.miniCarouselUlClassName}">`;
        miniCarouselData.forEach((data, idx) => {
            this.miniCarouselHTML += `
                <li class="${config.classNames.miniCarouselLiClassName}" posidx=${idx + 1}>
                    <a href="${data.link}">
                        <img src="${data.imgSrc}" 
                        alt="${data.description}" target="_blank">
                    </a>
                </li>
            `;
        });
        this.miniCarouselHTML += `</ul>
                    </div>
                    <div class="${config.classNames.miniCarouselShadow} ${config.classNames.miniCarouselShadowRight}"></div>
                    <div class="${config.classNames.miniCarouselRightBtnClassName} ${config.classNames.miniCarouselMoveBtnClassName}"></div>
                </div>
                <div class="${config.classNames.benefitWrapClassName}">
                    <h2 class="${config.classNames.benefitHeaderClassName}">
                        Amazon Originals, exclusively on Prime Video
                    </h2>
                    <div class="${config.classNames.benefitContentClassName}">
                        Prime Video is the only place where you can watch Amazon Original series like "The Marvelous Mrs. Maisel", "Tom Clancy's Jack Ryan", "Homecoming", and "The Man in the High Castle".
                    </div>
                    <div class="${config.classNames.benefitFooterClassName}">
                        <a href="${config.footerLink}">Explore Prime Video ▶︎</a>
                    </div>
                </div>
            </div>
        `;
    }
}

export default MiniCarouselModel
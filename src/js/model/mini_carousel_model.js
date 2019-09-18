import config from "../config";
import miniCarouselData from "../miniCarouselData";

class MiniCarouselModel {
    constructor() {
        this.miniCarouselHTML = `
            <div class="${config.classNames.miniCarouselWrapperClassName}">
                <div class="${config.classNames.miniCarouselLeftBtnClassName} ${config.classNames.miniCarouselMoveBtnClassName}"></div>
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
                <div class="${config.classNames.miniCarouselRightBtnClassName} ${config.classNames.miniCarouselMoveBtnClassName}"></div>
            </div>
        `;
    }
}

export default MiniCarouselModel
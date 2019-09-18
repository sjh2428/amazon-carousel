import config from "../config";

class MiniCarouselModel {
    constructor() {
        this.miniCarouselHTML = `
            <div class="${config.classNames.miniCarouselWrapperClassName}">
                <div class="${config.classNames.miniCarouselLeftBtnClassName} ${config.classNames.miniCarouselMoveBtnClassName}"></div>
                <div class="${config.classNames.miniCarouselViewportClassName}">
                    <ul class="${config.classNames.miniCarouselUlClassName}">
                        <li class="${config.classNames.miniCarouselLiClassName}" posidx=1>1번마</li>
                        <li class="${config.classNames.miniCarouselLiClassName}" posidx=2>2번마</li>
                        <li class="${config.classNames.miniCarouselLiClassName}" posidx=3>3번마</li>
                        <li class="${config.classNames.miniCarouselLiClassName}" posidx=4>4번마</li>
                    </ul>
                </div>
                <div class="${config.classNames.miniCarouselRightBtnClassName} ${config.classNames.miniCarouselMoveBtnClassName}"></div>
            </div>
        `;
    }
}

export default MiniCarouselModel
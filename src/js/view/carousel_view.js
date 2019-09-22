/**
 * view class for carousel
 */
class CarouselView {
    /**
     * 
     * @param {Class} model model class for carousel
     * @param {Object} config config obj for carousel
     */
    constructor(model, config) {
        this.model = model;
        this.config = config;
        const { main } = this.config.classNames;
        this.mainDOM = document.querySelector(`.${main}`);
    }

    getHTML() {
        const { 
            footerLink, classNames: {
                wrapper, viewportWrap, leftBtn, moveBtn, shadow, shadowLeft, viewport, ul, li,
                rightBtn, shadowRight, benefitWrap, benefitHeader, benefitContent, benefitFooter,
            } 
        } = this.config;
        let html = /*html*/`
        <div class="${wrapper}">
            <div class="${viewportWrap}">
                <div class="${leftBtn} ${moveBtn}"></div>
                <div class="${shadow} ${shadowLeft}"></div>
                <div class="${viewport}">
                    <ul class="${ul}">`;
        this.model.getMiniCarouselData().forEach((data, idx) => {
            const { link, imgSrc, imgAlt } = data;
            html += /*html*/`
                <li class="${li}" posidx=${idx + 1}>
                    <a href="${link}">
                        <img src="${imgSrc}" 
                        alt="${imgAlt}" target="_blank">
                    </a>
                </li>
            `;
        });
        html += /*html*/`</ul>
                </div>
                <div class="${shadow} ${shadowRight}"></div>
                <div class="${rightBtn} ${moveBtn}"></div>
            </div>
            <div class="${benefitWrap}">
                <h2 class="${benefitHeader}">
                    Amazon Originals, exclusively on Prime Video
                </h2>
                <div class="${benefitContent}">
                    Prime Video is the only place where you can watch Amazon Original series like "The Marvelous Mrs. Maisel", "Tom Clancy's Jack Ryan", "Homecoming", and "The Man in the High Castle".
                </div>
                <div class="${benefitFooter}">
                    <a href="${footerLink}">Explore Prime Video ▶︎</a>
                </div>
            </div>
        </div>`;
        return html;
    }

    render() {
        this.mainDOM.innerHTML = this.getHTML();
    }
}

export default CarouselView
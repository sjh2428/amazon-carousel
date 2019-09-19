/**
 * view class for carousel
 */
class CardCarouselView {
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
        const data = this.model.getMiniCarouselData();
        const { 
            classNames: {
                wrapper, viewportWrap, leftBtn, moveBtn, viewport, ul, li, rightBtn, contentContainer,
                contentWrap, contentBody, contentHeader, contentCategory, contentFooter
            } 
        } = this.config;
        let html = /*html*/`
        <div class="${wrapper}">
            <div class="${viewportWrap}">
                <div class="${leftBtn} ${moveBtn}"></div>
                <div class="${viewport}">
                    <ul class="${ul}">`;
        let idx = 0;
        Object.keys(data.carousel).forEach(key => {
            for (const categoryData of data.carousel[key]) {
                const { image, title, head, body, tail, link } = categoryData;
                html += /*html*/`
                    <li class="${li}" posidx=${idx++}>
                        <div class="${contentWrap}" style="background-image: url('${image}')">
                            <div class="${contentContainer}">
                                <div class="${contentCategory}">${title}</div>
                                <h2 class="${contentHeader}">${head}</h2>
                                <div class="${contentBody}">${body}</div>
                                <div class="${contentFooter}">
                                    <a href="${link}">${tail} ▶︎</a>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }
        });
        html += /*html*/`</ul>
                </div>
                <div class="${rightBtn} ${moveBtn}"></div>
            </div>
        </div>`;
        return html;
    }

    render() {
        this.mainDOM.innerHTML = this.getHTML();
    }
}

export default CardCarouselView
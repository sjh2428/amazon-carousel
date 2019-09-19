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
        const { containerWrap } = this.config.classNames;
        this.mainDOM = document.querySelector(`.${containerWrap}`);
    }

    getHTML() {
        const { card, carousel } = this.model.getMiniCarouselData();
        const { 
            classNames: {
                main, wrapper, viewportWrap, leftBtn, moveBtn, viewport, ul, li, rightBtn,
                contentContainer, contentWrap, contentBody, contentHeader, contentCategory, contentFooter
            } 
        } = this.config;
        const {
            container: cardContainer, wrapper: cardWrapper, image: cardImage, 
            title: cardTitle, btnsWrapper: cardBtnsWrapper
        } = this.config.card.classNames;
        
        let idx = 0;
        let html = /*html*/`
        <div class="${cardContainer}">`
        Object.keys(card).forEach(key => {
            html += /*html*/`
            <div class="${cardWrapper}">
                <div class="${cardImage}" style="background-image: url('${card[key].imgSrc}')">
                    <div class="${cardTitle}">${key}</div>
                </div>
                <div class="${cardBtnsWrapper}">`
                carousel[key].forEach(_ => {
                    html += /*html*/`
                    <div idx=${idx++}></div>`;
                });
            html += /*html*/`
                </div>
            </div>`;
        });
        html += /*html*/`
        </div>
        <div class="${main}">
            <div class="${wrapper}">
                <div class="${viewportWrap}">
                    <div class="${leftBtn} ${moveBtn}"></div>
                    <div class="${viewport}">
                        <ul class="${ul}">`;
        idx = 0;
        Object.keys(carousel).forEach(key => {
            for (const categoryData of carousel[key]) {
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
            </div>
        </div>`;
        return html;
    }

    render() {
        this.mainDOM.innerHTML = this.getHTML();
    }
}

export default CardCarouselView
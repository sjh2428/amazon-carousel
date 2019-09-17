class MiniCarouselModel {
    constructor() {
        this.miniCarousel = `
            <div class="crs-wrap">
                <div class="crs-move-left-btn crs-move-btn"></div>
                <div class="seeing-crs">
                    <ul class="crs-item-ul">
                        <li class="crs-item-wrap-li" posidx=1>1번마</li>
                        <li class="crs-item-wrap-li" posidx=2>2번마</li>
                        <li class="crs-item-wrap-li" posidx=3>3번마</li>
                        <li class="crs-item-wrap-li" posidx=4>4번마</li>
                    </ul>
                </div>
                <div class="crs-move-right-btn crs-move-btn"></div>
            </div>
        `;
    }
}
export default MiniCarouselModel
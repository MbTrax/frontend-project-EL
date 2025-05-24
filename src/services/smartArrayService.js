export default class SmartArrayService {
    constructor(loader, threshold = 3) {
        this.items = [];
        this.threshold = threshold;
        this.loader = loader; // async функция, загружает новые элементы
    }

    async init() {
        this.items.push(...await this.loader());
    }

    async getNext() {
        if (this.items.length === 0) {
            this.items.push(...await this.loader());
        }

        const item = this.items.shift();

        // Если осталось мало — подгружаем заранее
        if (this.items.length < this.threshold) {
            this.loader().then(newItems => {
                this.items.push(...newItems);
            });
        }

        return item;
    }
    clear() {
        this.items = [];
    }
}
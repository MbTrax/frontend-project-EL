export default new class {
    //Нормализация строки, удаляем лишние пробелы и приводим к нижнему регистру
    normalize = (str) => {
        // Нормализация: нижний регистр + удаление лишних пробелов вокруг пунктуации
        return str.toLowerCase()
            .replace(/\s*([,.!?])\s*/g, '$1 ')
            .trim()
            .split(/\s+/);
    };
    //Перетасовываем массив с помощью Алгоритма тасования Фишера — Йетса
    shuffle = (array) => {
        let m = array.length, t, i;

        // Пока есть элементы для перемешивания
        while (m) {

            // Взять оставшийся элемент
            i = Math.floor(Math.random() * m--);

            // И поменять его местами с текущим элементом
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }
    splitString(text) {
        return text.match(/[а-яА-ЯёЁa-zA-Z0-9'-]+|[^\sа-яА-ЯёЁa-zA-Z0-9'-]/g) || [];
    }

}
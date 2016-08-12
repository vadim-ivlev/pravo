/*
 * Добавляем совместимость для IE
 *
 */

// BttrLazyLoading для IE8
// Поддержка свойства innerWidth
if (!window.innerWidth) {
    window.innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
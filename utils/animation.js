// shake head 摇头
export function shakeHead(selector) {
  this.animate(
    selector,
    [
      { translateX: 15 },
      { translateX: -10 },
      { translateX: 5 },
      { translateX: -5 },
      { translateX: 0 }
    ],
    1000,
    () => {
      this.clearAnimation(selector, () => {
        console.log('清除了.block上的所有动画属性');
      });
    }
  );
}


export function scale(selector) {
    this.animate(
        selector,
      [{ scale: [1, 1] }, { scale: [1.3, 1.3] }, { scale: [1, 1] }],
      1000,
      () => {
        this.clearAnimation('.ani', () => {
          console.log('清除了.block上的所有动画属性');
        });
      }
    );
  },
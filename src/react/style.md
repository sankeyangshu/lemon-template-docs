# 样式

本文主要介绍 `主题配置`，`UnoCSS` 的使用和如何与 `设计稿尺寸` 对应。

## 主题配置

主题配置组件位于 `src/views/ThemeSetting/index.tsx`，主要功能包括：

- **主题色切换**：支持动态更改主题色。
- **暗黑模式切换**：支持在明暗模式之间切换。

更多详细用法请参考源码：[ThemeSetting](https://github.com/sankeyangshu/lemon-template-react/blob/main/src/views/ThemeSetting/index.tsx)

## UnoCSS

`UnoCSS` 是一款按需使用的原子化 CSS 引擎，提供了灵活高效的样式支持。以下是一个示例：

```html
<div
  class="my-10 box-border w-full rounded-12 bg-[var(--color-block-background)] px-20 py-12 text-18"
>
  <div class="flex-center leading-35">
    <div class="font-bold">Lemon-Template-React</div>
  </div>
  <div class="mb-6 mt-12 text-14 leading-24">欢迎使用模版！！！</div>
</div>
```

在上面的代码中，使用了 UnoCSS 提供的原子化类名，快速实现了以下样式：

- 外边距和内边距：通过 my-10、px-20、py-12 等类名设置。
- 盒模型：使用 box-border 定义盒模型。
- 圆角和背景色：通过 rounded-12 和 bg-[var(--color-block-background)] 设置。
- 字体和排版：通过 text-18、font-bold、leading-35 等类名定义字体大小、加粗和行高。

## 设计稿尺寸

本模板的设计稿尺寸为 375px，并集成了 [postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever) 插件，用于支持响应式页面开发。同时，模板对 UnoCSS 的 rem 转 px 单位进行了优化，具体说明如下：

- 如果设计稿尺寸为 375px，则 1rem 等于 1px。
- 无需再为复杂的 rem 换算而烦恼，直接按照设计稿尺寸进行开发即可。

通过这种方式，开发者可以更高效地实现与设计稿一致的页面布局。

## 相关链接

- [UnoCSS 官方文档](https://unocss.dev/)
- [postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever)

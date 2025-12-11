# 样式

本文主要介绍 `主题配置`、`TailwindCSS` 和组件库的使用。

## 主题配置

主题配置组件位于 `src/pages/_authenticated/settings.tsx`，主要功能包括：

- **主题色切换**：支持动态更改主题色。
- **暗黑模式切换**：支持在明暗模式之间切换。

更多详细用法请参考源码：[ThemeSetting](https://github.com/sankeyangshu/lemon-template-react/blob/main/src/pages/_authenticated/settings.tsx)

## TailwindCSS

`TailwindCSS` 是一款按需使用的原子化 CSS 引擎，提供了灵活高效的样式支持。以下是一个示例：

```tsx
<div className="my-2.5 box-border w-full rounded-xl px-5 py-3 text-lg bg-white">
  <div className="flex items-center justify-center leading-9">Lemon-Mobile-React</div>
  <div className="mt-3 mb-1.5 text-center text-sm leading-6 font-bold">欢迎使用模版！！！</div>
</div>;
```

在上面的代码中，使用了 TailwindCSS 提供的原子化类名，快速实现了以下样式：

- 外边距和内边距：通过 my-2.5、px-5、py-3 等类名设置。
- 盒模型：使用 box-border 定义盒模型。
- 圆角和背景色：通过 rounded-xl 和 bg-white 设置。
- 字体和排版：通过 text-sm、font-bold、leading-6 等类名定义字体大小、加粗和行高。

## 组件库

模版使用了 `daisyUI` 作为基础组件库，并参考Vant的设计，封装了一些基础组件。

基础组件使用请查看源码: [components/custom](https://github.com/sankeyangshu/lemon-template-react/blob/main/src/components/custom)

`daisyUI` 是 CSS 类名的集合，这些类名是 TailwindCSS 实用程序类的高级抽象。与Vant等组件库不同，它不包含JavaScript逻辑，更轻量且框架无关。你可以继续使用任何您喜欢的组件库。

## 相关链接

- [TailwindCSS 官方文档](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [Vant](https://vant-ui.github.io/vant/?source=vuejsorg#/zh-CN/)

# Styles

This article mainly introduces `theme configuration`, `UnoCSS` usage, and how to correspond with `design draft dimensions`.

## Theme Configuration

The theme configuration component is located at `src/views/ThemeSetting/index.tsx`, with main features including:

- **Theme Color Switching**: Supports dynamically changing theme colors.
- **Dark Mode Switching**: Supports switching between light and dark modes.

For more detailed usage, please refer to the source code: [ThemeSetting](https://github.com/sankeyangshu/lemon-template-react/blob/main/src/views/ThemeSetting/index.tsx)

## UnoCSS

`UnoCSS` is an on-demand atomic CSS engine that provides flexible and efficient style support. Here's an example:

```html
<div
  class="my-10 box-border w-full rounded-12 bg-[var(--color-block-background)] px-20 py-12 text-18"
>
  <div class="flex-center leading-35">
    <div class="font-bold">Lemon-Template-React</div>
  </div>
  <div class="mb-6 mt-12 text-14 leading-24">Welcome to use the template!!!</div>
</div>
```

In the above code, we used atomic class names provided by UnoCSS to quickly implement the following styles:

- Margins and padding: Set through class names like my-10, px-20, py-12.
- Box model: Define box model using box-border.
- Border radius and background color: Set through rounded-12 and bg-[var(--color-block-background)].
- Font and typography: Define font size, weight, and line height through class names like text-18, font-bold, leading-35.

## Design Draft Dimensions

This template's design draft dimension is 375px, and integrates the [postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever) plugin to support responsive page development. Meanwhile, the template has optimized UnoCSS's rem to px unit conversion, specifically:

- If the design draft dimension is 375px, then 1rem equals 1px.
- No need to worry about complex rem calculations anymore, just develop directly according to the design draft dimensions.

Through this approach, developers can more efficiently implement page layouts consistent with the design draft.

## Related Links

- [UnoCSS Official Documentation](https://unocss.dev/)
- [postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever)

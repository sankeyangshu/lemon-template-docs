# Echarts 图表

本项目使用 **ECharts** 作为数据可视化解决方案，这是一个强大的、开源的可视化图表库，能够流畅运行在 PC 和移动设备上，兼容当前绝大部分浏览器。

## 技术方案

本项目采用以下技术实现数据可视化功能：

- **Apache ECharts 6** - 强大的开源可视化库，支持丰富的图表类型
- **按需引入** - 只引入需要的图表和组件，减小打包体积
- **自定义 Hook** - 封装 `useECharts` Hook，简化图表使用
- **主题适配** - 自动跟随系统主题切换（亮色/暗色模式）
- **响应式设计** - 自动监听容器尺寸变化，智能调整图表大小
- **TypeScript 支持** - 完整的类型定义，提供类型安全

这种组合提供了：

- 📊 **丰富图表** - 支持折线图、柱状图、饼图、散点图等 20+ 图表类型
- 🎨 **主题系统** - 内置亮色/暗色主题，自动跟随系统切换
- 🔧 **高度可配置** - 灵活的配置项，满足各种可视化需求
- ⚡ **性能优化** - 按需引入、Canvas 渲染、防抖处理
- 📱 **移动优化** - 针对移动端优化，支持触摸交互
- 🛠️ **开发体验** - 封装的 Hook 简化了图表的创建和管理

## 核心特性

### ECharts 核心能力

- **丰富的图表类型** - 折线图、柱状图、饼图、散点图、雷达图、地图等 20+ 种图表
- **强大的交互** - 支持缩放、平移、数据区域选择、tooltip 等丰富交互
- **多维数据支持** - 支持多系列、多维度数据可视化
- **灵活的样式** - 高度可定制的视觉样式和主题系统
- **移动端优化** - 针对移动设备优化，支持触摸操作
- **动画效果** - 丰富的动画效果和过渡动画

### useECharts Hook 特性

- **主题自动切换** - 自动跟随系统主题（亮色/暗色模式）
- **响应式调整** - 监听容器尺寸变化，自动调整图表大小
- **防抖优化** - 内置防抖处理，避免频繁调整尺寸
- **加载状态** - 内置加载动画，提升用户体验
- **生命周期管理** - 自动初始化和销毁图表实例
- **类型安全** - 完整的 TypeScript 类型支持

## 按需引入

为了减小打包体积，本项目采用按需引入的方式使用 ECharts。在 `src/plugins/echarts.ts` 中配置需要的图表和组件：

```typescript
import {
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  ScatterChart,
} from 'echarts/charts';

import {
  AriaComponent,
  CalendarComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  ParallelComponent,
  PolarComponent,
  RadarComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';

import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  // 图表类型
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  ScatterChart,

  // 组件
  AriaComponent,
  CalendarComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  ParallelComponent,
  PolarComponent,
  RadarComponent,
  TimelineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,

  // 特性
  LabelLayout,
  UniversalTransition,

  // 渲染器
  CanvasRenderer,
]);

export { echarts };
```

**配置说明：**

- **图表类型（Chart）** - 如 `LineChart`、`BarChart` 等，按需引入需要使用的图表
- **组件（Component）** - 如 `GridComponent`、`TooltipComponent` 等，提供图表功能
- **特性（Features）** - 如 `LabelLayout`、`UniversalTransition` 等，提供额外功能
- **渲染器（Renderer）** - `CanvasRenderer` 或 `SVGRenderer`，必须引入其中之一

::: tip 提示
如果需要使用其他图表类型或组件，需要先在 `echarts.ts` 中引入并注册。
:::

## useECharts Hook

本项目封装了 `useECharts` Hook，简化 ECharts 在 React 中的使用，提供了主题切换、响应式调整等功能。

### Hook 参数

```typescript
interface ConfigProps {
  /**
   * ECharts 初始化配置
   */
  echartsInitOpts?: EChartsInitOpts;
  /**
   * 是否开启过渡动画
   * @default true
   */
  animation?: boolean;
  /**
   * 过渡动画持续时间（毫秒）
   * @default 300
   */
  animationDuration?: number;
  /**
   * 是否自动调整大小
   * @default true
   */
  autoResize?: boolean;
  /**
   * 调整大小的防抖等待时间（毫秒）
   * @default 300
   */
  resizeDebounceWait?: number;
}

function useECharts(
  domRef: RefObject<HTMLDivElement | null>,
  config?: ConfigProps
);
```

### Hook 返回值

```typescript
interface UseEChartsReturn {
  // 获取图表实例
  getChartInstance: () => echarts.ECharts | null;
  // 渲染图表（替换模式）
  renderChart: (options: EChartsCoreOption, opts?: SetOptionOpts) => void;
  // 更新图表配置（合并模式）
  updateOptions: (options: Partial<EChartsCoreOption>) => void;
  // 直接设置图表配置
  setOptions: (options: EChartsCoreOption) => void;
  // 重置图表（清空数据）
  resetChart: () => void;
  // 切换加载状态
  toggleLoading: (show: boolean) => void;
}
```

## 基础使用

### 创建简单图表

```tsx
import type { EChartsOption } from 'echarts';
import { useEffect, useRef } from 'react';
import { useECharts } from '@/hooks/use-chart';

function SimpleChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef);

  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  useEffect(() => {
    renderChart(options);
  }, []);

  return <div ref={chartRef} className="h-80 w-full" />;
}
```

**关键步骤：**

1. 创建 DOM 容器的 ref：`useRef<HTMLDivElement>(null)`
2. 使用 `useECharts` Hook，传入 ref
3. 定义图表配置项 `options`
4. 在 `useEffect` 中调用 `renderChart` 渲染图表
5. 为容器设置高度（ECharts 需要明确的容器高度）

### 配置自定义参数

```tsx
function CustomChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  // 自定义配置
  const { renderChart } = useECharts(chartRef, {
    animation: true, // 开启动画
    animationDuration: 500, // 动画时长 500ms
    autoResize: true, // 自动调整大小
    resizeDebounceWait: 200, // 防抖等待时间 200ms
  });

  // 渲染图表...
}
```

## 常用图表类型

### 折线图

```tsx
function LineChartDemo() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef);

  const options: EChartsOption = {
    title: {
      text: '一周数据趋势',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '访问量',
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        smooth: true, // 平滑曲线
      },
    ],
  };

  useEffect(() => {
    renderChart(options);
  }, []);

  return <div ref={chartRef} className="h-80" />;
}
```

### 柱状图

```tsx
function BarChartDemo() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef);

  const options: EChartsOption = {
    title: {
      text: '一周销售数据',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '销售额',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          borderRadius: [4, 4, 0, 0], // 圆角
        },
      },
    ],
  };

  useEffect(() => {
    renderChart(options);
  }, []);

  return <div ref={chartRef} className="h-80" />;
}
```

### 饼图

```tsx
function PieChartDemo() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef);

  const options: EChartsOption = {
    title: {
      text: '访问来源',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
          { value: 300, name: '视频广告' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  useEffect(() => {
    renderChart(options);
  }, []);

  return <div ref={chartRef} className="h-80" />;
}
```

### 环形图

```tsx
function DoughnutChartDemo() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef);

  const options: EChartsOption = {
    title: {
      text: '设备占比',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: 0,
      left: 'center',
    },
    series: [
      {
        name: '设备类型',
        type: 'pie',
        radius: ['40%', '70%'], // 内外半径，形成环形
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        data: [
          { value: 1048, name: 'iOS' },
          { value: 735, name: 'Android' },
          { value: 580, name: 'Web' },
        ],
      },
    ],
  };

  useEffect(() => {
    renderChart(options);
  }, []);

  return <div ref={chartRef} className="h-80" />;
}
```

## 进阶用法

### 动态更新数据

```tsx
function DynamicChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart, updateOptions } = useECharts(chartRef);
  const [data, setData] = useState([150, 230, 224, 218, 135, 147, 260]);

  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data,
        type: 'line',
      },
    ],
  };

  // 初始渲染
  useEffect(() => {
    renderChart(options);
  }, []);

  // 数据更新时重新渲染
  useEffect(() => {
    updateOptions({
      series: [{ data }],
    });
  }, [data]);

  // 模拟数据更新
  const handleUpdate = () => {
    const newData = data.map(() => Math.floor(Math.random() * 300));
    setData(newData);
  };

  return (
    <div>
      <button onClick={handleUpdate}>更新数据</button>
      <div ref={chartRef} className="h-80" />
    </div>
  );
}
```

### 多图表页面

```tsx
function MultiCharts() {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);

  const { renderChart: renderLine } = useECharts(lineChartRef);
  const { renderChart: renderBar } = useECharts(barChartRef);
  const { renderChart: renderPie } = useECharts(pieChartRef);

  const lineOptions: EChartsOption = {
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'value' },
    series: [{ data: [150, 230, 224, 218, 135], type: 'line' }],
  };

  const barOptions: EChartsOption = {
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }],
  };

  const pieOptions: EChartsOption = {
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'A' },
          { value: 735, name: 'B' },
          { value: 580, name: 'C' },
        ],
      },
    ],
  };

  useEffect(() => {
    renderLine(lineOptions);
    renderBar(barOptions);
    renderPie(pieOptions);
  }, []);

  return (
    <div className="grid gap-4">
      <div ref={lineChartRef} className="h-80" />
      <div ref={barChartRef} className="h-80" />
      <div ref={pieChartRef} className="h-80" />
    </div>
  );
}
```

### 异步加载数据

```tsx
function AsyncChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart, toggleLoading } = useECharts(chartRef);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 显示加载状态
        toggleLoading(true);
        setLoading(true);

        // 模拟异步请求
        const response = await fetch('/api/chart-data');
        const data = await response.json();

        // 渲染图表
        const options: EChartsOption = {
          xAxis: { type: 'category', data: data.categories },
          yAxis: { type: 'value' },
          series: [{ data: data.values, type: 'line' }],
        };

        renderChart(options);
      }
      catch (error) {
        console.error('加载数据失败', error);
      }
      finally {
        toggleLoading(false);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {loading && <div>加载中...</div>}
      <div ref={chartRef} className="h-80" />
    </div>
  );
}
```

### 图表交互

```tsx
function InteractiveChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart, getChartInstance } = useECharts(chartRef);

  const options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'bar',
      },
    ],
  };

  useEffect(() => {
    renderChart(options);

    // 获取图表实例
    const chartInstance = getChartInstance();
    if (!chartInstance)
      return;

    // 监听点击事件
    chartInstance.on('click', (params) => {
      console.log('点击了:', params.name, params.value);
    });

    // 监听鼠标悬停事件
    chartInstance.on('mouseover', (params) => {
      console.log('鼠标悬停:', params.name);
    });

    // 组件卸载时清理事件
    return () => {
      chartInstance.off('click');
      chartInstance.off('mouseover');
    };
  }, []);

  return <div ref={chartRef} className="h-80" />;
}
```

### 响应式图表

```tsx
function ResponsiveChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef, {
    autoResize: true, // 自动调整大小
    resizeDebounceWait: 200, // 防抖 200ms
  });

  const options: EChartsOption = {
    // 使用响应式配置
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  useEffect(() => {
    renderChart(options);
  }, []);

  // 容器大小变化时，图表会自动调整
  return <div ref={chartRef} className="h-80 w-full" />;
}
```

## 最佳实践

### 1. 容器高度设置

```tsx
// ✅ 好的做法 - 明确设置容器高度
function GoodExample() {
  return <div ref={chartRef} className="h-80 w-full" />;
}

// ❌ 避免 - 未设置容器高度
function BadExample() {
  return <div ref={chartRef} className="w-full" />;
}
```

**说明：** ECharts 需要明确的容器高度才能正确渲染，如果未设置高度，图表可能无法显示。

### 2. useEffect 依赖项

```tsx
// ✅ 好的做法 - 正确的依赖项
function GoodExample() {
  const { renderChart } = useECharts(chartRef);

  useEffect(() => {
    renderChart(options);
  }, []); // 只在首次渲染时执行
}

// ❌ 避免 - 缺少依赖项或依赖项错误
function BadExample() {
  const { renderChart } = useECharts(chartRef);

  useEffect(() => {
    renderChart(options);
  }); // 缺少依赖项，每次渲染都会执行
}
```

### 3. 数据更新策略

```tsx
// ✅ 好的做法 - 使用 updateOptions 增量更新
function GoodExample() {
  const { renderChart, updateOptions } = useECharts(chartRef);

  // 初始渲染
  useEffect(() => {
    renderChart(initialOptions);
  }, []);

  // 数据更新
  useEffect(() => {
    updateOptions({ series: [{ data: newData }] });
  }, [newData]);
}

// ❌ 避免 - 每次都完全重新渲染
function BadExample() {
  const { renderChart } = useECharts(chartRef);

  useEffect(() => {
    renderChart(options); // 每次都完全重新渲染
  }, [data]);
}
```

### 4. 按需引入

```typescript
// ✅ 好的做法 - 只引入需要的图表类型
import { BarChart, LineChart, PieChart } from 'echarts/charts';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  // 只引入项目中使用的图表
]);
```

```typescript
// ❌ 避免 - 引入全部 ECharts
import * as echarts from 'echarts'; // 体积较大
```

### 5. 主题适配

```tsx
// ✅ 好的做法 - 使用 Hook 的自动主题切换
function GoodExample() {
  const { renderChart } = useECharts(chartRef);
  // Hook 会自动处理主题切换
}

// ❌ 避免 - 手动处理主题
function BadExample() {
  const { theme } = useTheme();

  useEffect(() => {
    // 手动销毁重建图表，容易出错
    const chart = echarts.init(dom, theme);
  }, [theme]);
}
```

### 6. 性能优化

```tsx
// ✅ 好的做法 - 使用防抖优化
const { renderChart } = useECharts(chartRef, {
  autoResize: true,
  resizeDebounceWait: 300, // 防抖 300ms
});

// ✅ 好的做法 - 大数据量使用采样
const options: EChartsOption = {
  series: [
    {
      type: 'line',
      data: largeData,
      sampling: 'lttb', // 降采样
    },
  ],
};
```

### 7. 移动端优化

```tsx
// ✅ 好的做法 - 移动端适配
const options: EChartsOption = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true, // 包含坐标轴标签
  },
  tooltip: {
    trigger: 'axis',
    confine: true, // 限制在图表区域内
  },
  xAxis: {
    axisLabel: {
      fontSize: 10, // 移动端使用较小字号
      rotate: 45, // 旋转标签避免重叠
    },
  },
};
```

## 常见问题

### 1. 图表不显示？

**问题：** 图表容器为空白，看不到图表。

**解决方案：**

```tsx
// 检查以下几点：
// 1. 容器是否设置了高度
<div ref={chartRef} className="h-80" />; // ✅

// 2. 是否在 useEffect 中调用 renderChart
useEffect(() => {
  renderChart(options);
}, []);

// 3. 检查 options 是否正确
console.log('options:', options);
```

### 2. 图表不跟随主题切换？

**问题：** 切换暗色/亮色模式时，图表主题不变。

**解决方案：** `useECharts` Hook 会自动处理主题切换，确保：

1. 使用了 `useECharts` Hook
2. 项目中正确配置了 `ThemeProvider`

```tsx
// 正确使用
const { renderChart } = useECharts(chartRef);
// Hook 会自动监听主题变化并重新初始化图表
```

### 3. 图表尺寸不响应容器变化？

**问题：** 容器大小变化时，图表不会自动调整。

**解决方案：**

```tsx
// 确保启用了 autoResize
const { renderChart } = useECharts(chartRef, {
  autoResize: true, // 默认为 true
});
```

### 4. 如何添加新的图表类型？

**问题：** 需要使用项目中未注册的图表类型（如雷达图）。

**解决方案：** 在 `src/plugins/echarts.ts` 中引入并注册：

```typescript
import { RadarChart } from 'echarts/charts';
import { RadarComponent } from 'echarts/components';

echarts.use([
  // 现有图表...
  RadarChart,
  RadarComponent,
]);
```

### 5. 图表数据更新不生效？

**问题：** 调用 `updateOptions` 后，图表没有更新。

**解决方案：**

```tsx
// 方式1：使用 updateOptions（合并模式）
updateOptions({
  series: [{ data: newData }],
});

// 方式2：使用 renderChart（替换模式）
renderChart({
  ...options,
  series: [{ data: newData }],
});

// 方式3：直接使用 setOptions
setOptions({
  series: [{ data: newData }],
});
```

### 6. 如何监听图表事件？

**问题：** 需要在点击图表时执行操作。

**解决方案：**

```tsx
useEffect(() => {
  const chartInstance = getChartInstance();
  if (!chartInstance)
    return;

  // 监听点击事件
  const handleClick = (params: any) => {
    console.log('点击了:', params);
  };

  chartInstance.on('click', handleClick);

  // 清理事件
  return () => {
    chartInstance.off('click', handleClick);
  };
}, []);
```

### 7. 图表在弹窗中不显示？

**问题：** 在 Dialog/Modal 中渲染的图表不显示。

**解决方案：**

```tsx
function ChartDialog({ visible }: { visible: boolean }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { renderChart } = useECharts(chartRef);

  // 在弹窗显示后再渲染图表
  useEffect(() => {
    if (visible) {
      // 延迟渲染，确保 DOM 已挂载
      setTimeout(() => {
        renderChart(options);
      }, 100);
    }
  }, [visible]);

  return (
    <Dialog visible={visible}>
      <div ref={chartRef} className="h-80" />
    </Dialog>
  );
}
```

### 8. 如何导出图表为图片？

**问题：** 需要将图表导出为图片。

**解决方案：**

```tsx
function ExportableChart() {
  const { getChartInstance } = useECharts(chartRef);

  const exportImage = () => {
    const chartInstance = getChartInstance();
    if (!chartInstance)
      return;

    // 导出为 base64
    const dataURL = chartInstance.getDataURL({
      type: 'png',
      pixelRatio: 2, // 分辨率
      backgroundColor: '#fff',
    });

    // 下载图片
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div>
      <button onClick={exportImage}>导出图片</button>
      <div ref={chartRef} className="h-80" />
    </div>
  );
}
```

## 相关链接

- [Apache ECharts 官方文档](https://echarts.apache.org/handbook/zh/get-started/)
- [ECharts 配置项手册](https://echarts.apache.org/zh/option.html)
- [ECharts 示例](https://echarts.apache.org/examples/zh/index.html)
- [@reactuses/core 文档](https://www.reactuse.com/)

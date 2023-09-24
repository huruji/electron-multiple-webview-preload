# electron 多 webview 预渲染容器替换demo

这是 electron 的性能优化大杀器之一，核心思想是通过 browserView 提前渲染下一页的 内容，进入下一页时将提前渲染好的 browserView 替换老的 browserView

如下，常见的图片 list 页面，可以看到通过这个手段，下一页的 img 提前渲染好了，已经没有了图片加载的过程了

![./demo.gif](./demo.gif)

# 我要做一个 相声基本功练习 APP 名叫 练活儿 工作名 可改 使用者是相声学习者 票友 艺考生 他们每天要练 贯口 大段一气呵成的念白 比如 报菜名 一口气报两百多道菜名 这门艺术的灵魂在...

我要做一个「相声基本功练习」APP，名叫「练活儿」（工作名，可改）。使用者是相声学习者、票友、艺考生——他们每天要练"贯口"：大段一气呵成的念白，比如《报菜名》一口气报两百多道菜名。这门艺术的灵魂在"气口"：演员在哪里换气、哪里停顿、停多久、哪个字要重音，决定了整段的节奏和韵味。市面上没有任何产品做好这件事，请你帮我把它设计出来。

先读懂这个领域，它决定组件设计对不对：

- 内容层级是 曲目 → 版本 → 气口段。同一段贯口，不同演员的词不一样（用字、顺序、段落都有差异），所以每个曲目下并存多个"版本"（如马志明版、郭德纲版、用户自己的整理版），用户可以新建和编辑版本

- 气口：版本文本被切成一段一段，比如"蒸羊羔、蒸熊掌、蒸鹿尾儿"‖"烧花鸭、烧雏鸡、烧子鹅"，段与段之间就是气口。气口有层级：小顿（词组间）、大气口（段落间、常带重音）、还有"偷气"（快速隐蔽换气）。怎么把气口可视化到"边看边念"的界面上——间距、符号、颜色、节奏条还是别的什么——完全交给你设计，唯一标准：字要大，扫一眼就知道哪里停、停多大

- 练习方式：跟原声变速跟练（0.5x~1.5x，变速不变调）、框选任意片段单独循环、每遍录音、回放和原声对比

- 练习数据：每段今天练了几遍、每遍用时几秒、连续打卡天数——这是用户最在乎的东西

APP 共四大板块：

1. 贯口练习（核心首页）：曲目库（按类别浏览：贯口/绕口令/太平歌词/定场诗…）→ 曲目详情（多版本切换、版本编辑入口）→ 练习页（气口可视化台词 + 播放控制 + 片段选择 + 录音 + 遍数计时）

2. 理论知识：相声常识小课程——逗哏与捧哏、说学逗唱、相声简史、春典（行话）、师承常识，卡片式阅读带学习进度

3. 对战与排行：两种玩法——即时对战（同一段贯口，错误率低+用时短者胜，给出分数）和勤奋榜（打卡天数/总遍数排行）。这是"社区"的形态：没有论坛、没有帖子，用对战和打卡把人连接起来

4. 我的：每日任务、打卡日历热力图、录音档案库、练习数据看板（趋势曲线、成就徽章）

形态与边界：

- 移动端竖屏 APP 优先（约 390px 宽），中文界面

- 只做前端：所有数据用 mock（造几条像样的《报菜名》《八扇屏》数据），音频用占位元素，图表用轻量方式表达

- 不要做真实登录、真实 API、不要写 mock server

视觉方向我不限制你，只有一个感受上的要求：它要同时有"传统曲艺的味儿"和"现代练习工具的利落"，不要做成资讯类 APP。

工程方式（重要，请严格执行）：

1. 先搭完整骨架：把四大板块所有页面、路由、布局、空态先全部搭出来，形成完整可点导航航的低保真结构，然后再逐页精修——顺序不能反

2. 设计系统先行：颜色、字号、间距、圆角、阴影、组件样式全部集中定义在主题文件里（CSS 变量或 Tailwind 主题配置），所有页面只引用 token 不写裸值——这样即使生成中断，骨架和样式表也是完整可继承的资产

3. 你的全部精力都放在界面设计上，不要过度工程化

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ec65b3b-e432-4e00-9ba7-ecd64e694e70).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# AI助手

AI助手需要配置`token`,才可使用。

## 配置方法一

在你电脑上直接全局配置，最简单（需要重启终端）。

windows：

```sh
setx VITE_COZE_TOKEN "your_token"
```

macOS/Linux：

```sh
echo 'export VITE_COZE_TOKEN="your-token-value"' >> ~/.zshrc && source ~/.zshrc
```

## 配置方法二

在项目中配置。

在项目根目录下创建`.env`文件，添加`VITE_COZE_TOKEN=your_token`。

例如vite会自动读取。

```sh
VITE_COZE_TOKEN=your_token
```

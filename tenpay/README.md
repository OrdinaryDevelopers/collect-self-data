## 微信账单爬虫

debug5x只支持安卓

1. 在微信里打开 `debugx5.qq.com` 勾选调试
2. 手机打开 `USB` 调试,微信打开账单页面
3. 在 `chrome` 上打开 `Inspect` 页面,点击账单 `Inspect`
4. 滑动账单列表发起请求
5. 拷贝 `cookie` 黏贴赋值给 `settings.py` `TOKEN` 

```shell script
pip install -r requirements.txt
python quickstart.py
```

### 参考文档

[非官方统计2018微信年度账单实现](https://juejin.im/post/5c383aa66fb9a049e412e9f3)

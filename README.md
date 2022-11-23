# app 启动
## 第一步:安装npm包
```
cnpm i
```
## 第二步:运行项目(确保node版本为v16.15.0):
```
npm run serve
```
## 第三步：安装 nginx服务器，并部署到服务器上
### 安装nginx服务器 ，看如下链接：
[http://t.csdn.cn/M1ChG](http://t.csdn.cn/M1ChG)
### 修改nginx.conf 文件
```
location / { 
root /RanGuMo/www/shangpinhui/dist; 
index index.html; 
try_files $uri $uri/ /index.html; 
} 
location /api { 
proxy_pass http://gmall-h5-api.atguigu.cn; 
} 
```

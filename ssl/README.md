## 证书失效的解决方法

#### 进入 ssl 目录，依次执行以下命令即可：

### 一
`openssl req -x509 -out localhost.crt -keyout localhost.key \
-newkey rsa:2048 -nodes -sha256 \
-subj '/CN=localhost' -extensions EXT -config <( \
printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")`


### 二
`sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localhost.crt`



### 三
`openssl x509 -in localhost.crt -out localhost.pem -outform PEM`

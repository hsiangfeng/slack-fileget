# slack-fileget

> 使用者可透過該系統取得 Slack 下所有檔案，只需要去 Slack 下提供相對應站點的 Token 即可。

## 使用技術

- Vue Cli 4
- Vuex
- Vue-Router
- Vue-Sweetalert2
- Bootstrap
- Vue-Axios
- Crypto.js
- LocalStorage

## 風格管理

- ESLint Airbnb

## 介面說明

### 取得 Token

![點擊此處](https://i.imgur.com/DB2P2HH.png)

搜尋「**Legacy token generator**」，並點一下下方產生傳統 Token 即可。

![產生 Token](https://i.imgur.com/11D38Ir.png)

最後只需要將取得的 Token 丟入以下欄位即可登入。

![登入](https://i.imgur.com/nTHF31J.png)

**附帶一提，該 Token 會暫存於使用者電腦中的 localStorage 並加密。**

## 登入介面

這邊範例將以 六角學院的 Slack 頻道，「hexschool-share」當作範例。

![登入首頁](https://i.imgur.com/xfp529z.png)

## 檔案下載介面

![檔案下載](https://i.imgur.com/u5kTNX0.png)

此外也可以做篩選功能，這邊就不再截圖，可自行進入該站嘗試。

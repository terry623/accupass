# Accupass

## Introduction
此為應徵 [ Accupass 活動通 ] Front-end Engineer 的作業

基本
1. 進入首頁後，可看到 Header 有各種景點分類
2. 選擇喜歡的分類，底下會列出對應的景點
3. 點擊景點卡片，會跳到景點介紹的單獨頁面

功能
1. 收藏景點：
   - 方法：按景點卡片中的愛心圖示 ( 變成紅色 ) 加入，再按一次即可移除 ( 變會灰色 )
   - 點擊右下角按鈕會列出目前已收藏的景點
   - 清單中也可以直接連到該景點的單獨頁面，或者移除該景點
2. 分享景點：
   - 方法：按景點卡片中的分享圖示
   - 會複製該景點頁面的網址
   - 就可以分享給朋友了


其他
1. 使用 Redux 做狀態管理
2. 採用延遲載入 ( 景點 )，優化網站效能
3. 滑到最底，會再 load 下一頁的景點

## Installation

Accupass-Frontend / Accupass-Backend 都要 install 和 run !

```bash
yarn install
yarn run start
```
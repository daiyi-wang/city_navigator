# City Navigator：英語方向指引學習遊戲

## 1. 專案概述

本專案是一款供學生單人自行練習的網頁式英語學習遊戲，核心目標是訓練學生：

1. 聽懂英文方向指令。
2. 使用英文口語說出方向指令。
3. 理解人物面向與左轉、右轉之間的關係。
4. 理解常見城市地點與位置關係。
5. 根據連續指令規劃並完成路線。

遊戲以城市地圖為主要場景。學生控制地圖上的人物，依照系統播放的英文指令移動，或使用麥克風說出英文指令，引導人物前往指定地點。

第一版以「單人學生自行練習」為主，不加入多人競賽或教師端連線功能，但程式架構應保留未來擴充的可能性。

---

## 2. 遊戲名稱

英文名稱：

**City Navigator**

副標題：

**Listen, Speak, and Find the Way!**

中文可顯示為：

**城市英語導航挑戰**

---

## 3. 主要學習內容

### 3.1 基本方向指令

- Go straight.
- Go straight ahead.
- Turn left.
- Turn right.
- Stop.

### 3.2 地標指令

- Turn left at the traffic light.
- Turn right at the traffic light.
- Turn left at the stop sign.
- Turn right at the stop sign.
- Stop at the traffic light.
- Stop at the stop sign.

### 3.3 距離與轉彎位置指令

第一版可先支援：

- Go straight for one block.
- Go straight for two blocks.
- Turn left at the first traffic light.
- Turn right at the second traffic light.
- Turn left at the stop sign.
- Turn right at the stop sign.

若開發複雜度過高，第一版可先完成 one block、two blocks 與 first traffic light，其他保留資料結構。

### 3.4 地點位置描述

- The bakery is on your left.
- The post office is on your right.
- The park is across from the department store.
- The school is next to the police station.
- The bookstore is between the bakery and the convenience store.
- Go past the restaurant.

### 3.5 城市地點字彙

第一版至少支援以下地點：

- police station
- fire station
- school
- park
- mall
- restaurant
- post office
- bakery
- convenience store
- bookstore
- shoe store
- department store

可額外加入：

- hospital
- bank
- library
- supermarket
- bus stop
- train station
- coffee shop

每張地圖不需同時顯示所有地點。第一版建議顯示 8 至 10 個地點。

---

## 4. 目標使用者

- 國小高年級至國中學生。
- 正在學習方向指引英文的學生。
- 使用桌上型電腦、筆記型電腦、平板或電子白板。
- 第一版以單人練習為主。

---

## 5. 支援裝置與瀏覽器

### 5.1 裝置

遊戲應支援：

- 桌上型電腦
- 筆記型電腦
- 平板
- 觸控螢幕
- 電子白板

手機可以開啟，但不列為第一版主要使用裝置。

### 5.2 瀏覽器

建議優先支援：

- Google Chrome
- Microsoft Edge

語音辨識功能以瀏覽器實際支援能力為準。

若瀏覽器不支援語音辨識，遊戲仍必須可以透過按鈕完成聽力模式，不可造成整個遊戲無法使用。

---

## 6. 技術原則

### 6.1 建議技術

Codex 可依專案需要選擇：

- HTML
- CSS
- JavaScript

或：

- Vite
- Vue 3
- JavaScript

若採用 Vue，請使用 Composition API。

第一版必須能在本機執行，也應容易部署至 GitHub Pages。

### 6.2 不依賴後端

第一版不需要：

- 使用者登入
- 資料庫
- 後端 API
- 雲端語音服務
- 付費服務

所有題目、地圖、句型、遊戲紀錄皆可由本機 JSON 與瀏覽器 localStorage 管理。

### 6.3 可維護性

不可把所有程式寫在單一 HTML 檔案。

建議至少拆分：

```text
src/
  assets/
  components/
  data/
  game/
  services/
  styles/
  utils/
```

若使用原生 HTML、CSS、JavaScript，也應拆分：

```text
index.html
css/
js/
data/
assets/
```

---

## 7. 遊戲模式

首頁至少提供兩種主要模式。

### 7.1 Listening Mode

中文名稱：

**聽力導航**

系統播放英文方向指令，學生依照聽到的內容操作人物。

主要流程：

1. 顯示任務。
2. 播放英文語音。
3. 學生按下方向按鈕。
4. 人物執行動作。
5. 系統判斷是否正確。
6. 顯示回饋。
7. 進入下一個動作或下一題。

### 7.2 Speaking Mode

中文名稱：

**口語導航**

系統顯示目的地，學生使用麥克風說出英文方向指令，引導人物移動。

主要流程：

1. 顯示起點與目的地。
2. 學生按下麥克風。
3. 學生說出一句英文指令。
4. 系統顯示辨識結果。
5. 系統分析指令意圖。
6. 人物執行對應動作。
7. 系統判斷路線是否合理。
8. 學生繼續說下一句，直到抵達目的地。

口語模式採「一句一個主要動作」，避免要求學生一次說出整段長路線。

---

## 8. 難度分級

遊戲應提供至少五個學習等級。

### Level 1：Basic Directions

內容：

- Go straight.
- Turn left.
- Turn right.
- Stop.

每題只包含一個動作。

### Level 2：Landmarks

內容：

- traffic light
- stop sign

例如：

- Turn left at the traffic light.
- Turn right at the stop sign.

### Level 3：Places and Positions

內容：

- on your left
- on your right
- across from
- next to
- between

### Level 4：Short Routes

每題包含兩至三個連續步驟。

例如：

1. Go straight.
2. Turn left at the traffic light.
3. The bakery is on your right.

### Level 5：Full Navigation

每題包含三至五個步驟，可加入：

- blocks
- first intersection
- second intersection
- go past
- destination position

---

## 9. 地圖設計

### 9.1 地圖風格

地圖應採用清楚、友善、適合兒童與青少年的平面插畫風格。

不要使用真實 Google Maps 或過度複雜的城市圖。

地圖至少包含：

- 道路
- 路口
- 交通號誌
- stop sign
- 建築物
- 地點名稱
- 起點
- 目的地
- 可移動人物
- 已走過的路線

### 9.2 道路節點系統

人物不可任意穿越畫面。

人物只能沿著預先定義的道路節點移動。

每個節點至少包含：

```json
{
  "id": "node-01",
  "x": 320,
  "y": 180,
  "type": "intersection",
  "landmark": "trafficLight",
  "connections": ["node-02", "node-05"]
}
```

可用的節點類型：

```text
road
intersection
trafficLight
stopSign
buildingEntrance
start
destination
```

### 9.3 人物狀態

人物至少包含：

```json
{
  "currentNodeId": "node-01",
  "facing": "north",
  "visitedNodes": [],
  "wrongMoves": 0
}
```

面向只能是：

```text
north
east
south
west
```

### 9.4 左右方向判定

左轉與右轉必須依照人物目前面向判定。

例如：

- 面向 north，turn left 後面向 west。
- 面向 north，turn right 後面向 east。
- 面向 east，turn left 後面向 north。
- 面向 east，turn right 後面向 south。

不可將畫面的左側固定當成 turn left。

### 9.5 動作與移動分離

建議遵守：

- Turn left：只改變面向。
- Turn right：只改變面向。
- Go straight：沿目前面向移動至下一個合法節點。
- Stop：停止並檢查是否到達正確位置。

這樣可以明確訓練學生理解 turn 與 go 的差異。

---

## 10. 畫面配置

### 10.1 整體版面

使用橫向版面。

桌機版建議：

- 左側 70%：城市地圖
- 右側 30%：任務、控制與回饋區

平板或較窄畫面可改為：

- 上方：地圖
- 下方：控制面板

### 10.2 頂部資訊列

包含：

- 遊戲名稱
- 目前模式
- 目前關卡
- 題號
- 星星或分數
- 設定按鈕
- 返回首頁按鈕

### 10.3 地圖區

顯示：

- 城市地圖
- 人物
- 人物面向
- 起點標記
- 目的地標記
- 路線動畫
- 正確路線提示
- 建築物名稱

在聽力模式中，目的地標記是否顯示應依題型決定。

### 10.4 控制區

聽力模式至少有：

- Play
- Listen Again
- Go Straight
- Turn Left
- Turn Right
- Stop
- Hint

口語模式至少有：

- 麥克風按鈕
- Start Speaking
- Stop Listening
- 再說一次
- 顯示辨識結果
- 按鈕替代操作
- Hint

### 10.5 避免過度文字

初級模式應搭配圖示：

- ↑ Go straight
- ↰ Turn left
- ↱ Turn right
- ■ Stop

但按鈕仍需顯示英文文字，不能只顯示符號。

---

## 11. 聽力模式詳細規則

### 11.1 一次一個動作

初級與中級關卡中，系統一次播放一個指令。

例如：

```text
Turn right.
```

學生按下對應按鈕後，系統立即判定。

### 11.2 連續指令

高級關卡可一次播放多個步驟。

提供兩種設定：

- Step-by-step：一句一句播放。
- Full route：一次播放完整路線。

第一版至少完成 Step-by-step。

### 11.3 語音播放

可使用 Web Speech API 的 SpeechSynthesis。

語音設定應可調整：

- 播放速度
- 英文語音
- 音量
- 是否自動播放

預設速度建議：

```text
0.85
```

教師或學生可切換：

- Slow
- Normal

### 11.4 重播限制

預設每題可重播兩次。

可在設定中調整：

- Unlimited
- 1 time
- 2 times
- 3 times

重播會影響星級，但不阻止學生完成任務。

---

## 12. 口語模式詳細規則

### 12.1 語音辨識

優先使用：

```text
SpeechRecognition
webkitSpeechRecognition
```

辨識語言：

```text
en-US
```

若使用者拒絕麥克風權限，需顯示清楚說明，並提供按鈕替代方案。

### 12.2 辨識流程

1. 學生按下麥克風。
2. 畫面顯示 Listening...
3. 錄音結束。
4. 顯示：
   - I heard: “Turn right.”
5. 解析句子。
6. 若可解析，執行動作。
7. 若無法解析，請學生再試一次。

### 12.3 語音辨識失敗

不可直接判定英文能力錯誤。

顯示：

```text
I couldn’t hear you clearly.
Please try again.
```

提供：

- Try Again
- Show a Hint
- Use Buttons Instead

### 12.4 指令語意解析

不可只使用完整字串相等判斷。

應將語音轉成標準化意圖。

例如：

```json
{
  "action": "turn",
  "direction": "right",
  "landmarkType": "trafficLight",
  "landmarkOrder": 1
}
```

### 12.5 可接受句型變化

以下可視為 go straight：

- Go straight.
- Go straight ahead.
- Walk straight.
- Keep going straight.
- Continue straight.

以下可視為 turn right：

- Turn right.
- Go right.
- Make a right turn.
- Take a right.

以下可視為 turn left：

- Turn left.
- Go left.
- Make a left turn.
- Take a left.

學生使用可接受變化時，動作可判定正確，但畫面可回饋課程建議句型：

```text
Correct!
In this lesson, we say: “Turn right.”
```

### 12.6 關鍵字正規化

語音辨識後先處理：

- 全部轉小寫
- 移除標點
- 移除多餘空格
- 常見同音或辨識錯誤對照
- left / right / straight / stop 關鍵字
- first / second / one / two 數字正規化

---

## 13. 任務類型

第一版至少完成前三種。

### 13.1 Follow the Directions

系統播放指令，學生操作人物。

### 13.2 Find the Place

系統播放位置描述。

例如：

```text
The park is across from the department store.
```

學生選擇或走到正確地點。

### 13.3 Give Directions

系統顯示起點與目的地，學生用語音引導人物。

### 13.4 Fix the Route

人物故意走錯，學生要修正。

例如：

```text
Turn left, not right.
```

此任務可列為第二版。

### 13.5 Delivery Mission

例如：

```text
Deliver the cake from the bakery to the school.
```

### 13.6 Rescue Mission

例如：

```text
Help the police officer get to the park.
```

情境任務可共用相同導航機制，只更換角色與任務文字。

---

## 14. 題目資料格式

題目不可直接硬編碼在元件中。

建議使用 JSON。

範例：

```json
{
  "id": "listening-l2-001",
  "mode": "listening",
  "level": 2,
  "mapId": "city-map-01",
  "startNodeId": "node-01",
  "startFacing": "north",
  "destinationNodeId": "node-08",
  "steps": [
    {
      "instruction": "Go straight.",
      "intent": {
        "action": "move",
        "direction": "straight",
        "distance": 1
      }
    },
    {
      "instruction": "Turn right at the traffic light.",
      "intent": {
        "action": "turn",
        "direction": "right",
        "landmarkType": "trafficLight"
      }
    }
  ]
}
```

位置題範例：

```json
{
  "id": "place-l3-001",
  "mode": "findPlace",
  "level": 3,
  "mapId": "city-map-01",
  "instruction": "The park is across from the department store.",
  "targetPlaceId": "park",
  "relation": {
    "type": "acrossFrom",
    "referencePlaceId": "departmentStore"
  }
}
```

---

## 15. 地圖資料格式

地圖應由資料驅動。

範例：

```json
{
  "id": "city-map-01",
  "name": "Sunny Town",
  "backgroundImage": "assets/maps/city-map-01.webp",
  "nodes": [],
  "places": [],
  "edges": []
}
```

建築物範例：

```json
{
  "id": "bakery",
  "name": "Bakery",
  "nodeId": "node-07",
  "x": 620,
  "y": 280,
  "image": "assets/places/bakery.webp"
}
```

道路連線範例：

```json
{
  "from": "node-01",
  "to": "node-02",
  "direction": "north",
  "distance": 1
}
```

---

## 16. 正確與錯誤判定

### 16.1 正確操作

正確時：

- 人物執行移動或轉向動畫。
- 正確路段短暫亮起。
- 顯示勾勾。
- 播放簡短正確音效。
- 顯示簡短英文回饋。

例如：

```text
Great!
Turn right.
```

### 16.2 錯誤操作

第一次錯誤：

```text
Try again.
Listen for “left” or “right.”
```

第二次錯誤：

- 自動降低語速。
- 重播指令。
- 突出顯示相關地標。

第三次錯誤：

- 顯示完整英文句子。
- 將 left、right、traffic light 等關鍵字醒目呈現。
- 允許學生完成該步驟。

錯誤時不要立刻重置整條路線。

### 16.3 不合法移動

若前方沒有道路：

```text
You can’t go that way.
Try another direction.
```

不合法移動應記錄為操作錯誤，但不應造成程式故障。

---

## 17. 提示系統

提示應分層提供。

### Hint 1

只提示關鍵概念：

```text
Listen for “left” or “right.”
```

### Hint 2

顯示地標：

```text
Look for the traffic light.
```

### Hint 3

顯示部分句子：

```text
Turn ___ at the traffic light.
```

### Hint 4

顯示完整句子並可播放慢速語音。

使用提示會影響星級。

---

## 18. 計分與星級

每題最高三顆星。

### 三顆星

- 沒有錯誤。
- 沒有使用提示。
- 重播不超過一次。
- 口語模式辨識成功。

### 兩顆星

- 一次錯誤。
- 或使用一次提示。
- 或重播兩次以上。

### 一顆星

- 多次錯誤後完成。
- 使用完整答案提示。
- 使用按鈕替代語音完成。

即使只獲得一顆星，仍應鼓勵學生完成。

---

## 19. 學習紀錄

使用 localStorage 儲存：

```json
{
  "completedMissions": [],
  "totalStars": 0,
  "listeningAccuracy": 0,
  "speakingAccuracy": 0,
  "wrongPatterns": {},
  "lastPlayedAt": ""
}
```

需記錄：

- 完成題數
- 星星
- 聽力正確率
- 口語正確率
- 重播次數
- 提示次數
- 錯誤句型
- 常混淆的 left / right
- 常混淆的位置關係
- 完成時間

---

## 20. 錯題複習

每次遊戲結束後顯示：

```text
You need more practice with:
```

例如：

- Turn left.
- Turn right at the traffic light.
- Across from.
- On your right.

提供：

- Practice Mistakes
- Play Again
- Back to Home

「Practice Mistakes」應只抽取本次答錯或使用完整提示的內容重新出題。

---

## 21. 結算畫面

結算畫面至少顯示：

- 任務完成數
- 總星星
- Listening Accuracy
- Speaking Accuracy
- Hints Used
- Listen Again 次數
- 需要加強的句型
- 重新挑戰錯題按鈕
- 返回首頁按鈕

回饋文字應簡短、正向，例如：

```text
Great job!
You completed 8 missions.
```

---

## 22. 設定功能

設定頁或彈出視窗至少提供：

- 語音速度：Slow / Normal
- 音效開關
- 背景音樂開關
- 是否自動播放指令
- 允許重播次數
- 是否顯示英文字幕
- 是否啟用語音模式
- 動畫速度
- 重設學習紀錄

聽力模式預設不顯示指令字幕。

使用提示後才顯示字幕。

---

## 23. 首頁設計

首頁包含：

- 遊戲名稱
- 簡短說明
- Listening Mode
- Speaking Mode
- Practice Mistakes
- Progress
- Settings

主要按鈕要大、清楚，適合觸控。

---

## 24. 新手教學

第一次進入遊戲時顯示互動教學。

教學內容：

1. 人物面向很重要。
2. Turn left 與 turn right 依人物面向判定。
3. Turn 只改變方向。
4. Go straight 才會向前移動。
5. 可以按 Listen Again 重聽。
6. 口語模式要先允許麥克風權限。

新手教學可略過，且之後可從設定重新觀看。

---

## 25. 視覺與美術需求

### 25.1 整體風格

- 明亮
- 友善
- 清楚
- 適合教學
- 不幼稚
- 避免過度裝飾

### 25.2 人物

人物需要至少四個方向：

- facing north
- facing east
- facing south
- facing west

可使用四張圖，或使用一張圖搭配旋轉。

人物移動時應有平滑動畫。

### 25.3 建築物

每個地點最好有：

- 簡單插圖
- 英文名稱
- 足夠大的辨識特徵

若沒有現成圖片，可先使用：

- CSS 繪製
- emoji
- 簡單 SVG
- 有意義的色塊與標籤

不可因缺少圖片而中止開發。

### 25.4 圖片尺寸

Codex 可依版面需求適當調整圖片大小、裁切比例與顯示方式。

圖片應使用：

```css
object-fit: contain;
```

或：

```css
object-fit: cover;
```

依素材用途決定。

---

## 26. 音效與動畫

### 正確

- 短促、愉快的音效
- 綠色勾勾
- 人物小跳躍或慶祝

### 錯誤

- 柔和的提示音
- 不使用刺耳蜂鳴聲
- 不使用紅色大叉長時間停留

### 移動

人物應沿道路平滑移動，不可瞬間跳到下一點。

轉向時應先旋轉，再接受下一個移動指令。

### 抵達目的地

- 顯示任務完成動畫
- 目的地亮起
- 星星飛入計分區

---

## 27. 無障礙與使用性

- 按鈕需有足夠尺寸。
- 文字與背景需有足夠對比。
- 不可只用顏色表示正確或錯誤。
- 圖示應搭配文字。
- 所有互動按鈕需支援鍵盤操作。
- 圖片加入 alt。
- 重要狀態使用 aria-live。
- 麥克風狀態要清楚顯示。

---

## 28. 狀態管理

遊戲至少有以下狀態：

```text
home
tutorial
modeSelection
loadingMission
playingInstruction
waitingForInput
listeningToSpeech
processingSpeech
showingFeedback
missionComplete
gameComplete
settings
```

避免使用大量互相衝突的布林值。

---

## 29. 核心模組建議

```text
MapRenderer
CharacterController
RouteEngine
DirectionParser
SpeechService
SpeechRecognitionService
MissionManager
ScoreManager
HintManager
ProgressStorage
AudioManager
SettingsManager
```

### MapRenderer

負責顯示地圖、節點、建築物與路線。

### CharacterController

負責人物面向、轉向與移動動畫。

### RouteEngine

負責檢查：

- 前方是否有道路
- 左轉後面向
- 右轉後面向
- 是否抵達目的地
- 學生路線是否符合任務

### DirectionParser

將語音文字轉為標準化意圖。

### SpeechService

負責播放英文指令。

### SpeechRecognitionService

負責麥克風權限、語音辨識與錯誤處理。

### MissionManager

負責抽題、載入任務與控制關卡流程。

### ScoreManager

負責錯誤、提示、重播與星級。

---

## 30. 方向解析參考邏輯

### 30.1 轉向

```javascript
const turnMap = {
  north: { left: "west", right: "east" },
  east: { left: "north", right: "south" },
  south: { left: "east", right: "west" },
  west: { left: "south", right: "north" }
};
```

### 30.2 前進

根據人物目前節點與面向，找到 direction 相符的 edge。

若無符合 edge，回傳 invalidMove。

### 30.3 地標限制

例如：

```text
Turn right at the traffic light.
```

系統需檢查人物目前所在節點是否為 trafficLight，或人物是否已抵達指定 trafficLight 節點。

若學生提早轉彎，應判定錯誤。

---

## 31. 第一版預設內容

第一版至少提供：

- 1 張固定地圖
- 8 至 10 個地點
- 1 個人物
- 4 個人物方向
- 5 個難度等級
- Listening Mode
- Speaking Mode
- 15 至 25 個預設任務
- 方向按鈕
- SpeechSynthesis
- SpeechRecognition
- 語音失敗替代按鈕
- 提示系統
- 三星評分
- localStorage
- 錯題複習
- 響應式版面
- GitHub Pages 部署能力

---

## 32. 第一版可暫緩功能

以下功能不必在第一版完成：

- 使用者帳號
- 教師後台
- 多人競賽
- 即時連線
- 排行榜
- 自訂地圖編輯器
- 雲端同步
- AI 自由對話
- 完整自然語言理解
- 多語言介面
- 多角色收藏系統

請先確保核心聽力與口語導航流程穩定。

---

## 33. 錯誤處理

必須處理：

- 瀏覽器不支援語音辨識
- 使用者拒絕麥克風
- 語音辨識逾時
- 語音辨識結果為空
- 語音無法解析
- 前方沒有道路
- 任務資料遺失
- 圖片載入失敗
- localStorage 無法使用
- 音效無法播放

錯誤訊息需用學生看得懂的方式呈現，不顯示技術錯誤堆疊。

---

## 34. 測試要求

### 34.1 路線測試

確認：

- 四種面向的左轉正確。
- 四種面向的右轉正確。
- 無道路時不可前進。
- 人物不可穿過建築物。
- 抵達正確目的地可完成。
- 抵達錯誤地點不可完成。

### 34.2 語音測試

確認：

- 語音播放正常。
- 語速調整正常。
- 麥克風權限被拒時有替代方案。
- 常見句型變化可解析。
- 無法解析時不會移動人物。
- 辨識失敗不直接算學生答錯。

### 34.3 裝置測試

至少測試：

- Chrome 桌機
- Edge 桌機
- 平板橫向
- 觸控操作
- 不支援語音辨識的情況

### 34.4 學習紀錄測試

確認：

- 重新整理後進度仍保留。
- 錯題可以重新練習。
- 重設紀錄可正常清除。
- 不同模式分數可分開記錄。

---

## 35. 建議資料夾結構

Vue 版本可參考：

```text
city-navigator/
  public/
    audio/
    images/
  src/
    assets/
      characters/
      maps/
      places/
      icons/
      sounds/
    components/
      map/
      controls/
      feedback/
      common/
    data/
      maps.json
      missions.json
      vocabulary.json
      phrases.json
    game/
      CharacterController.js
      RouteEngine.js
      DirectionParser.js
      MissionManager.js
      ScoreManager.js
    services/
      speechSynthesis.js
      speechRecognition.js
      storage.js
    views/
      HomeView.vue
      TutorialView.vue
      GameView.vue
      ResultsView.vue
      ProgressView.vue
    styles/
    App.vue
    main.js
  README.md
  package.json
```

---

## 36. 驗收標準

專案完成時，至少符合以下條件：

1. 學生可以選擇聽力模式或口語模式。
2. 人物可以依面向正確左轉、右轉與前進。
3. 人物只能沿道路節點移動。
4. 聽力模式可以播放英文指令。
5. 學生可以透過方向按鈕操作。
6. 口語模式可以辨識常見英文方向指令。
7. 語音失敗時可以改用按鈕。
8. 系統可以判斷正確與錯誤操作。
9. 系統有分層提示。
10. 每題可以計算一至三顆星。
11. 遊戲結束會整理錯題。
12. 學生可以只練習錯題。
13. 學習紀錄可以保存於 localStorage。
14. 畫面可在桌機與平板正常使用。
15. 專案可部署至 GitHub Pages。
16. 程式碼模組化，不將所有邏輯塞在單一檔案。
17. 缺少部分圖片時，系統仍有可用的替代呈現。
18. 瀏覽器不支援語音辨識時，遊戲仍可正常進行聽力練習。

---

## 37. 開發順序建議

請依下列順序開發，避免先花大量時間在美術或非核心功能。

### Phase 1：核心地圖

- 建立地圖。
- 建立道路節點。
- 建立人物。
- 完成轉向與前進。
- 完成目的地判定。

### Phase 2：聽力模式

- 建立任務資料。
- 播放英文語音。
- 建立方向按鈕。
- 完成正誤判定。
- 完成基本回饋。

### Phase 3：計分與提示

- 錯誤次數。
- 重播次數。
- 提示層級。
- 三星評分。
- 結算畫面。

### Phase 4：口語模式

- 麥克風權限。
- 語音辨識。
- 指令正規化。
- DirectionParser。
- 語音失敗替代方案。

### Phase 5：學習紀錄

- localStorage。
- 錯題紀錄。
- 錯題複習。
- Progress 頁面。

### Phase 6：美術與動畫

- 建築物圖片。
- 人物動畫。
- 音效。
- 響應式調整。
- 無障礙改善。

---

## 38. Codex 開發注意事項

- 先確保遊戲邏輯正確，再處理進階美術。
- 不可因沒有圖片素材而停止開發。
- 可使用 SVG、CSS、emoji 或簡單圖示作為替代方案。
- 圖片可依版面需求適當調整大小。
- 避免將題目、地圖與句型硬編碼在畫面元件中。
- 語音辨識不能只用完整字串比對。
- 左右方向必須依人物面向計算。
- 轉向與前進必須是不同動作。
- 所有核心功能都應提供清楚的錯誤處理。
- 建立簡短但清楚的程式註解。
- README 中加入安裝、啟動、測試與部署方式。
- 完成後自行測試主要流程並修正明顯錯誤。

---

## 39. 安裝、啟動與測試

本專案版本 1 採用原生 HTML、CSS 與 JavaScript ES Modules，不需要後端或套件安裝。

### 本機啟動

```bash
npm run dev
```

接著開啟 `http://127.0.0.1:4185`。也可以使用任何可提供靜態檔案的 HTTP server；請勿直接以 `file://` 開啟，以確保 ES Modules 正常載入。內附的安靜伺服器不會寫入存取紀錄，適合課堂與自動化驗證。

### 核心邏輯測試

```bash
npm test
```

測試涵蓋四面向轉向、道路移動限制、指令解析、星級計算與版本 1 內容數量。

### GitHub Pages 部署

所有路徑皆為相對路徑。將 repository 的 Pages source 設為根目錄即可部署；不需要 build step。若使用 GitHub Actions，可直接上傳 repository 內容作為 Pages artifact。

### 瀏覽器相容性

- 聽力語音使用 `SpeechSynthesis`。
- 口語辨識優先使用 `SpeechRecognition` 或 `webkitSpeechRecognition`。
- 不支援或未允許麥克風時，口語任務會保留完整方向按鈕，不影響聽力模式。
- 學習紀錄與設定分別保存在 `cityNavigator.progress.v1` 與 `cityNavigator.settings.v1`。

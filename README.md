# To Do管理 Webアプリ

## 考慮した実装、画面設計
1. redux不使用

通信関係で複雑になることが想定されたため、不使用。
代替として、react queryを使用。

2. FastAPIライブラリによるREST APIサーバ実装

3. ボタンのアイコン化

文字でなく、一目で機能がわかるように見た目に変更

4. Atomic Design

|グループ名|コンポーネント|特徴|
|---|---|---|
|atoms|TaskItem, TaskForm|UIパーツ最小構成部品|
|molecules|TaskList|atomsの組み合わせ部品|
|organisms||独立して機能し、他のページでも同じ意図で使える|
|templates||atoms,molecules,organismsの配置|
|pages|App|templatesにデータを流し込みページを動かす|
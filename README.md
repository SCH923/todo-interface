# To Do管理 Webアプリ

To Doを管理するREST APIとブラウザで表示するwebクライアントで構成される。
# To Do管理 サーバ仕様

### サーバ起動手順

1. 必要なライブラリのインストール
    - [uvicorn](https://pypi.org/project/uvicorn/)
    - [fastapi](https://fastapi.tiangolo.com/ja/)

2. todo-fastapiフォルダでコマンド実行
```
    sh ./start.sh
```
### サーバ仕様

1. 起動手順に従い、サーバ起動
2. ブラウザで http://localhost:8000/docs へアクセス
# To Do管理 クライアント仕様

### クライアント起動手順

1. react-ts-todoフォルダへ移動  

2. 必要なライブラリのインストール
```
    npm install
```
3. コマンド実行
```
    sh ./start.sh
```

### 考慮した実装、画面設計

1. Redux-Toolkit不使用

    複雑になることが想定されたため、不使用。  
    データ取得として、React Queryを使用。

2. FastAPIライブラリによるREST APIサーバ実装

    FastAPI採用。APIドキュメントは自動生成される。  
    pydanticでTaskクラスを定義。

3. ボタンのアイコン化

    文字でなく、一目で機能がわかるように見た目に変更。  
    Material UI v5で統一。

4. リストのデザイン

    タスク完了チェック済の場合は取り消し線を引くことで、  
    完了していることをユーザに伝える。

5. Atomic Design

    |グループ名|コンポーネント|特徴|
    |---|---|---|
    |atoms|Checkbox, TextField, Button, Icon, select|UIパーツ最小構成部品|
    |molecules|TaskItem, TaskForm|atomsの組み合わせ部品|
    |organisms|TaskList, TaskForm|独立して機能し、他のページでも同じ意図で使える|
    |templates|App|atoms,molecules,organismsの配置|
    |pages|App|templatesにデータを流し込みページを動かす|

6. タスクの状態

    booleanではなく、stringに設定。  
    booleanだと２つの状態(未着手・完了)しか保持できないが、  
    stringで状態を保持することで、作業中断・削除などに対応できる。

7. フォームのクリア

    タスク投稿後、フォームはクリアし、次の入力に備える。  
    フォームから投稿したタスク名が、タスク一覧に移動したように見える。

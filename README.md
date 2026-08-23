# Atena

## 概要

Atenaは、店舗向けの宛名・顧客管理Webアプリケーションです。
顧客名や複数の宛名、店舗名、指名、備考などの情報を一元管理し、必要な顧客情報をすぐに検索・確認できることを目的としています。

## 開発背景

店舗業務では、領収書を作成する際や顧客情報を確認する際に、
紙のファイルから宛名を探したり、他のスタッフへ確認したりする手間が発生していました。

そこで、顧客ごとに複数の宛名や関連情報を一元管理し、
必要な情報をすぐに検索・確認できるようにすることで、宛名確認にかかる時間やスタッフ間の確認作業を減らすことを目的としてAtenaを開発しました。

## 主な機能

- ログイン・ログアウト
- 顧客一覧表示
- 顧客検索
- 顧客詳細表示
- 顧客登録
- 顧客編集
- 顧客削除

## 使用技術

- フロントエンド：React
- バックエンド：Java / Spring Boot
- データベース：MySQL
- 開発環境：Docker

## 起動方法

### 1. 事前準備

本アプリケーションをローカル環境で起動するには、以下の環境が必要です。

- Java 21
- Node.js / npm
- Docker
- Git

### 2. リポジトリの取得

以下の2つのリポジトリを任意のフォルダにcloneします。

```bash
git clone https://github.com/hgm-log/atena.git
git clone https://github.com/hgm-log/atena-frontend.git
```

### 3. MySQL(Docker)の起動

Docker Desktopを起動し、以下のコマンドでMySQLコンテナを作成・起動します。

```bash
docker run --name atena-mysql -e MYSQL_ROOT_PASSWORD=任意のパスワード -e MYSQL_DATABASE=atena -p 3312:3306 -d mysql:8.4
```

`MYSQL_ROOT_PASSWORD` には、任意のMySQL rootパスワードを設定してください。

### 4. application.properties の作成

バックエンドの `src/main/resources/` 配下に `application.properties` を作成し、以下の内容を設定します。

```properties
spring.application.name=atena
spring.datasource.url=jdbc:mysql://localhost:3312/atena
spring.datasource.username=root
spring.datasource.password=任意のパスワード
spring.jpa.hibernate.ddl-auto=update
```

`spring.datasource.password` には、手順3で `MYSQL_ROOT_PASSWORD` に設定したものと同じパスワードを入力してください。

### 5. 初期データの登録

バックエンドのルートディレクトリにある `init-data.sql` を実行し、テスト用ログインユーザーとサンプル顧客データを登録します。

まず、MySQLコンテナへ `init-data.sql` をコピーします。

```bash
docker cp init-data.sql atena-mysql:/tmp/init-data.sql
```

次に、MySQLコンテナ内でSQLを実行します。

```bash
docker exec -it atena-mysql bash
mysql -u root -p atena < /tmp/init-data.sql
exit
```

`Enter password:`と表示されたら、手順3で`MYSQL_ROOT_PASSWORD`に設定したパスワードを入力してください。

### 6. バックエンドの起動

バックエンドのルートディレクトリで、以下のコマンドを実行します。

```bash
./mvnw spring-boot:run
```

Windows PowerShellの場合は、以下のコマンドを実行します。

```powershell
.\mvnw spring-boot:run
```

起動後、バックエンドは`http://localhost:8080`で動作します。

### 7. フロントエンドの起動

フロントエンドのルートディレクトリで、以下のコマンドを実行して必要なパッケージをインストールします。

```bash
npm install
```

続けて、以下のコマンドでフロントエンドを起動します。

```bash
npm run dev
```

起動後、ブラウザで`http://localhost:5173`にアクセスします。

### 8. テスト用ログイン情報

以下のテスト用アカウントでログインできます。

- ユーザーID：`demo01`
- パスワード：`AtenaDemo123`

### 9. 動作確認

ブラウザで `http://localhost:5173` にアクセスし、手順8のテスト用アカウントでログインします。

ログイン後、顧客一覧画面にサンプル顧客データが表示されることを確認してください。

[See this lab in English](./README.md)


# FabCar Blockchain Sample

>Hyperledger Fabric sample Fabcar on IBM Blockchain Platform

このコードパターンは、IBM Blockchain Platformでネットワークを設定し、Fabcarスマートコントラクトをネットワークに展開する方法を示しています。 次に、IDを含むネットワークとやり取りしてスマートコントラクトでトランザクションを送信するようにアプリケーションをセットアップします。 アプリケーションは、Fabric Node SDKを使用してネットワークへのリクエストを処理するNode.jsサーバーと、Webインターフェースを起動するAngularクライアントでセットアップされます。

このコードパターンを完了すると、次のことができるようになります:

* IBM Blockchain PlatformでHyperledger Fabricネットワークをセットアップする
* IBM Blockchain Platformを介してスマートコントラクトをインストールおよびインスタンス化する
* Hyperledger Fabric SDKを使用してNode.jsサーバーを開発し、展開されたネットワークと対話する
* WebアプリのAngularフロントエンドを作成して、ネットワークとインターフェイスする

## アプリケーション構成図

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/72905801-17b0a100-3cff-11ea-8b4d-0cd6df807aa6.png">
</p>

1. Blockchain Operatorは、IBM Blockchain Platformサービスをセットアップします
2. IBM Blockchain Platformを使用すると、IBM Kubernetes Service上にHyperledger Fabricネットワークを作成でき、ネットワーク上にFabcarスマートコントラクトをインストールしてインスタンス化できます。
3. Node.jsアプリケーションサーバーは、Fabric sdkを使用して、IBM Blockchain Platformにデプロイされたネットワークとやり取りし、Webクライアント用のAPIを作成します
4. AngularクライアントはNode.jsアプリケーションAPIを使用してネットワークと対話します
5.ユーザーは、Fabcar Angular Webインターフェースと対話して、ブロックチェーン台帳と状態を更新および照会します


## 必要なコンポーネント

*	[IBM Blockchain Platform](https://www.ibm.com/cloud/blockchain-platform) は、デプロイ手順を簡素化および加速できるユーザーインターフェイスを使用して、ブロックチェーンネットワークを完全に制御できます。また、IBM Cloud Kubernetes Serviceでブロックチェーンコンポーネントを管理します。
*	[IBM Cloud Kubernetes Service](https://www.ibm.com/cloud/container-service) は、コンピュートホストのクラスターを作成し、高可用性コンテナーを展開します。 Kubernetesクラスターを使用すると、アプリケーションを迅速にデプロイ、更新、スケーリングするために必要なリソースを安全に管理できます。
* [IBM Blockchain Platform Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform) は、Hyperledger Fabric環境への接続を含む、スマートコントラクトの開発、テスト、および展開においてユーザーを支援するように設計されています。


## 利用技術

+ [Hyperledger Fabric v1.4](https://hyperledger-fabric.readthedocs.io/en/release-1.4/) は、高度な機密性、弾力性、柔軟性、およびスケーラビリティを提供するモジュール式アーキテクチャに支えられた分散型台帳ソリューションのプラットフォームです。
+ [Node.js](https://nodejs.org/en/) は、サーバー側のJavaScriptコードを実行するオープンソースのクロスプラットフォームJavaScriptランタイム環境です。
+ [Express.js](https://expressjs.com/) は、Webおよびモバイルアプリケーションに堅牢な機能セットを提供する、最小限で柔軟なNode.js Webアプリケーションフレームワークです。
+ [Angular.io](https://angular.io/) これは、Webアプリケーションを構築するためのフロントエンドフレームワークです。

## 事前準備

- [IBM Cloud account](https://cloud.ibm.com/registration/?target=%2Fdashboard%2Fapps)
- [Node v8.x or v10.x and npm v6.x or greater](https://nodejs.org/en/download/)
- [VSCode version 1.38.0 or greater](https://code.visualstudio.com)
- [IBM Blockchain Platform Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)


## アプリケーションの実行

次の手順に従って、このコードパターンをセットアップして実行します。 手順の詳細は以下のとおりです。

## ステップ

> ローカルネットワークで実行する場合は [こちら](./run-local.md) を参照して下さい。

1. [リポジトリのクローン](#1-リポジトリのクローン)
2. [スマートコントラクトのパッケージ](#2-スマートコントラクトのパッケージ)
3. [IBM Cloud サービスの作成](#3-IBM-Cloud-サービスの作成)
4. [ネットワークのビルド](#4-ネットワークのビルド)
5. [FabCarスマートコントラクトのネットワークへのデプロイ](#5-FabCarスマートコントラクトのネットワークへのデプロイ)
6. [アプリケーションのネットワークへの接続](#6-アプリケーションのネットワークへの接続)
7. [アプリケーションの実行](#7-アプリケーションの実行)


### 1. リポジトリのクローン

こちらのリポジトリを任意のローカロフォルダへクローンします:

```bash
git clone https://github.com/IBM/fabcar-blockchain-sample.git
cd fabcar-blockchain-sample
```

### 2. スマートコントラクトのパッケージ

IBM Blockchain Platform拡張機能を使用して、Fabcarスマートコントラクトをパッケージ化します。

* Visual Studioコードを開き、事前にCloneした `fabcar-blockchain-sample` リポジトリから `contract` フォルダーを開きます。
    ** `fabcar-blockchain-sample` ディレクトリ全体ではなく、 `contract` フォルダーを開くことが重要です。そうしないと、使用しているプログラミング言語が理解できないというエラーが表示されます。**

* いろいろなVS Code オプションを表示するには、 `F1`キーを押します。 `IBM Blockchain Platform：Package Open Project` を選択します。

<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910509-05036d00-3140-11ea-8b15-7c8aeb403974.png">
</p>

* 左側の `IBM Blockchain Platform` 拡張ボタンをクリックします。 これにより、パッケージ化されたコントラクトが上部に、ブロックチェーン接続が下部に表示されます。

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/8854447/73010107-bdd3d800-3ddf-11ea-8505-aff152d604e4.png">
</p>

* 次に、スマートコントラクトをエクスポートするために、パッケージ化されたコントラクトを右クリックして（この場合はfabcar@1.0.0を選択）、 `Export Package` を選択します。

* ローカルマシン上の場所を選択し、 `.cds` ファイルを保存します。 このパッケージ化されたスマートコントラクトを後で使用して、IBM Blockchain Platformサービスにデプロイします。

次に、IBM Cloud上でHyperledger Fabricネットワークを構成し、このネットワークを使用してアプリケーションを実行するために、必要ないろいろなサービスのセットアップを開始します。


### 3. IBM Cloud サービスの作成

* [IBM Cloud Kubernetes Service](https://cloud.ibm.com/kubernetes/catalog/cluster) を作成します。 サービスは `カタログ` で見つけることができます。 このコードパターンでは、 `Free(無料)` クラスターを使用して名前を付けることができます。IBM Cloudでは、30日後に有効期限が切れる無料クラスターのインスタンスを1つ許可しています。 **注：IBM Cloud Kubernetes Serviceのセットアップが完了するまで20分かかる場合があります**。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910506-046ad680-3140-11ea-9f4b-8bcb4d2a651b.gif">
</p>
<br>

* IBM Cloud上に [IBM Blockchain Platform](https://cloud.ibm.com/catalog/services/blockchain-platform) サービスを作成します。このサービスは `カタログ` から見つけることができ、任意の名前を付与できます。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910502-046ad680-3140-11ea-9853-3598b9363d91.gif">
</p>
<br>

* Kubernetesクラスターが稼働したら、クラスターにIBM Blockchain Platformをデプロイできます。IBM Blockchain Platformサービスを作成するステップの中で、サービスをデプロイするIBM Cloud上のクラスターを選択します。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71910501-046ad680-3140-11ea-8440-9d2fef0be426.gif">
</p>
<br>

* ブロックチェーンプラットフォームがKubernetesクラスターにデプロイされると、コンソールを起動してブロックチェーンネットワークでの運用を開始できます。


### 4. ネットワークのビルド

IBM Blockchain Platformが提供するネットワークを構築します [ドキュメント](https://console.bluemix.net/docs/services/blockchain/howto/ibp-console-build-network.html#ibp-console-build-network) 。 これには、独自のMSPとCA（認証局）を持つ単一のピア組織と、独自のMSPとCAを持つ注文者組織とのチャネルの作成が含まれます。 ピアを展開してノードを操作するために、それぞれのIDを作成します。


#### 組織 CA のピアを作成します
  - <b>認証局の追加</b>をクリックします。
  - <b>IBM Cloud 認証局の作成</b>を選択し<b>次へ</b>をクリックします。
  - <b>CA 表示名</b>に `Org1 CA` を記述します。  
  - <b>CA 管理者登録 ID</b>に `admin` を、<b>CA 管理者登録秘密事項</b>に `adminpw` を記述します。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71913565-bb1d8580-3145-11ea-9eaa-1b4e8a10e985.gif">
</p>
<br>


#### 組織ピアのCA管理IDを関連付ける
  - 作成した<b>Org1 CA</b>認証局が実行中であることを確認し、選択します。（タイルの右上のボックスが緑色になってることを確認）
  - 最初に、アイデンティティの関連付けを行います。<b>アイデンティティの関連付け</b>ボタンをクリックします。
  - サイドパネルで、<b>登録ID </b>を選択します。
  - <b>登録ID</b>に `admin` を、<b>登録秘密事項</b>に `adminpw` を指定します。<b>ID表示名</b>には `Org1 CA Identity` を使用します。
  - <b>アイデンティティの関連付け</b>をクリックします。ウォレットにアイデンティティを追加し、管理者のアイデンティティを<b> Org1 CA </b>に関連付けます。
  
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71913744-1e0f1c80-3146-11ea-85e4-eea5280aa8e9.gif">
</p>
<br>

#### ピア組織CAを使用して、ピアおよびorg1管理者IDを登録します
  - <b> Org1 CA </b>認証局を選択し、CA用に作成された `admin` identityがテーブルに表示されていることを確認します。
  - 組織`org1`の管理者を登録します。<b>ユーザーの登録</b>ボタンをクリックします。<b>登録ID</b>に `org1admin` を、<b>登録秘密事項</b>に `org1adminpw` を指定し、<b>次へ</b>をクリックします。このIDの<b>Type</b>を `client` に設定します。 <b>ルートアフィリエーションを使用</b>を指定するか、このフィールドのチェックを外して、ドロップダウンリストから関連組織のいずれかを選択できます。<b>最大登録数</b>フィールドは空白のままにします。 <b>次へ</b>]をクリックします。
  - このユーザーには属性を追加しません。 <b>ユーザーを登録</b>をクリックします。
  - 再度ピアのIDを作成するプロセスを行います。<b>ユーザーの登録</b>ボタンをクリックします。<b>登録ID</b>に `peer1` を、<b>秘密の登録登録秘密事項</b>に ` peer1pw` を指定し、<b>次へ</b>をクリックします。このIDの<b>Type</b>を `peer` に設定します。 <b>ルートアフィリエーションを使用</b>を指定するか、このフィールドのチェックを外して、ドロップダウンリストから関連組織のいずれかを選択できます。 <b>次へ</b>をクリックします。
  - このユーザーには属性を追加しません。 <b>ユーザーを登録</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71913929-7c3bff80-3146-11ea-9930-a455f1e45fe2.gif">
</p>
<br>


#### 組織ピアのMSP定義を作成します
  - 左側のナビゲーションの<b>組織</b>タブに移動し、<b>MSP定義の作成</b>をクリックします。
  - <b>MSP表示名</b>に`Org1 MSP`と入力し、<b>MSP ID</b>に`Org1msp`を入力します。
  - <b>ルート認証局</b>の詳細の下で、組織のルートCAとして`Org1 CA`を作成したピアCAを指定します。
  - 組織管理者のの<b>登録ID</b>に、`org1admin`を、<b>登録秘密事項</b>に、`org1adminpw`を指定します。 次に、ID名`Org1 Admin`を指定します。
  - <b>生成</b>ボタンをクリックして、このIDを組織の管理者として登録し、IDをウォレットにエクスポートします。 <b>エクスポート</b>をクリックして、管理者証明書をファイルシステムにエクスポートします。 最後に、<b>MSP定義の作成</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914115-e5bc0e00-3146-11ea-891c-6422bc4c2c4e.gif">
</p>
<br>


#### ピアを作成します
  - <b>ノード</b>ページで、<b>ピアの追加</b>をクリックします。
  - 新しいピアの作成の下の<b>IBM Cloud</b>および<b>次</b>をクリックします。
  - ピアに`Peer Org1`の<b>表示名</b>を付けます。
  - 次の画面で、<b>認証機関</b>として`Org1 CA`を選択します。次に、ピア用に作成したピアIDの<b>登録ID </b>および<b>登録秘密事項</b>を `peer1`、`peer1pw` で指定します。次に、ドロップダウンリストから<b>管理者証明書（MSPから）</b>、`Org1 MSP`を選択し、<b>次</b>をクリックします。
  - <b>TLS登録ID</b>に、`admin`、および<b>TLS登録秘密事項</b>に、`adminpw`を指定します。作成時に指定した登録IDと登録秘密事項と同じです CA。 <b> TLS CSRホスト名</b>は空白のままにします。
  - 最後のサイドパネルでは、<b>IDを関連付ける</b>ように求められ、ピアの管理者になります。ピア管理ID`Org1 Admin`を選択します。
  - 概要を確認し、<b>ピアの追加</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914297-53683a00-3147-11ea-9ecb-bace14e5e5c5.gif">
</p>
<br>


### トランザクションの順序付け(Orderer)用ノードを作成します
  - <b>認証局の追加</b>をクリックします。
  - <b>IBM Cloud認証局の作成</b>を選択し<b>次へ</b>をクリックします。
  - <b>CA 表示名</b> に `Orderer CA` を入力します。  
  - <b>CA 管理者登録 ID</b>に `admin` を、<b>CA 管理者登録機密事項</b>に `adminpw` を設定します。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914392-86123280-3147-11ea-9a6f-b6eddab790b1.gif">
</p>
<br>


#### 発注者組織のCA管理者IDを関連付ける
  - <b>ノード</b>タブで、作成した認証局<b>Orderer CA</b>が実行中なのを確認し選択します。（タイルの右上のボックスが緑色になってることを確認）
  - 最初に、アイデンティティの関連付けを行います。<b>アイデンティティの関連付け</b>ボタンをクリックします。
  - サイドパネルで、<b>登録ID </b>を選択します。
  - <b>登録ID</b>に `admin` を、<b>登録秘密事項</b>に `adminpw` を指定します。<b>ID表示名</b>には `Orderer CA Identity` を使用します。
  - <b>アイデンティティの関連付け</b>をクリックします。ウォレットにアイデンティティを追加し、管理者のアイデンティティを<b>Orderer CA</b>に関連付けます。
  
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914593-e73a0600-3147-11ea-8944-1c5e2bbecfba.gif">
</p>
<br>

#### 発注者組織CAを使用して、OrdererとOrdererの管理者IDを登録します
  - <b>Orderer CA</b>認証局を選択し、CA用に作成された `admin` identityがテーブルに表示されていることを確認します。
  - 組織`org1`の管理者を登録します。<b>ユーザーの登録</b>ボタンをクリックします。<b>登録ID</b>に `ordereradmin` を、<b>登録秘密事項</b>に `ordereradminpw` を指定し、<b>次へ</b>をクリックします。このIDの<b>Type</b>を `client` に設定します。 <b>ルートアフィリエーションを使用</b>を指定するか、このフィールドのチェックを外して、ドロップダウンリストから関連組織のいずれかを選択できます。<b>最大登録数</b>フィールドは空白のままにします。 <b>次へ</b>]をクリックします。
  - このユーザーには属性を追加しません。 <b>ユーザーを登録</b>をクリックします。
  - 再度ピアのIDを作成するプロセスを行います。<b>ユーザーの登録</b>ボタンをクリックします。<b>登録ID</b>に `orderer1` を、<b>秘密の登録登録秘密事項</b>に `orderer1pw` を指定し、<b>次へ</b>をクリックします。このIDの<b>Type</b>を `orderer` に設定します。 <b>ルートアフィリエーションを使用</b>を指定するか、このフィールドのチェックを外して、ドロップダウンリストから関連組織のいずれかを選択できます。 <b>次へ</b>をクリックします。
  - このユーザーには属性を追加しません。 <b>ユーザーを登録</b>をクリックします。
  
<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914721-35e7a000-3148-11ea-8db6-2d3584fca238.gif">
</p>
<br>


#### 順序付けサービス組織のMSP定義を作成します
  - 左側のナビゲーションの<b>組織</b>タブに移動し、<b>MSP定義の作成</b>をクリックします。
  - <b>MSP表示名</b>に`Orderer MSP`、<b> MSP ID </b>に`orderermsp`を入力します。
  - <b>ルート認証局</b>の詳細の下で、組織のルートCAとして、作成したピアCA `Orderer CA` を指定します。
  - 組織管理者に、`ordereradmin`を、<b>登録ID </b>に、`ordereradminpw`を指定します。 次に、<b>ID名</b>、`Orderer Admin`を指定します。
  - <b>生成</b>ボタンをクリックして、このIDを組織の管理者として登録し、IDをウォレットにエクスポートします。<b>エクスポート</b>をクリックして、管理者証明書をファイルシステムにエクスポートします。最後に、<b>MSP定義の作成</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71914893-95de4680-3148-11ea-8a9d-5952c26c8cdc.gif">
</p>
<br>

#### 順序付けサービスを作成します
  - <b>ノード</b>ページで、<b>順序付けサービスの追加</b>をクリックします。
  - <b>IBM Cloud順序付けサービスの作成</b>をクリックして、<b>次へ</b>に進みます。
  - 順序付けサービスの<b>表示名</b>に `Orderer` を入力します。
  - 次の画面で、<b>認証機関</b>として`Orderer CA`を選択します。次に、注文者用に作成したピアIDの<b>登録ID</b>と<b>登録秘密事項</b>を `orderer1`、`orderer1pw` で指定します。次に、組織MSPドロップダウンリストから<b>Administrator Certificate（from MSP）</b>である`Orderer MSP`を選択します。<b>TLS CSRホスト名</b>は空白のままにし、<b>次へ</b>をクリックします。

  - 次のステップは、このピアにIDを関連付けて、ピアの管理者にすることです。 ピア管理ID `Orderer Admin` を選択し、<b>次へ</b>をクリックします。
  - 概要を確認し、<b>順序付けサービスの追加</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915205-42b8c380-3149-11ea-8050-5edfd461ae10.gif">
</p>
<br>


#### トランザクションのために、順序付けサービスにコンソーシアムメンバー（共同事業体メンバー）として組織を追加します
注文者に組織をコンソーシアムメンバーとして追加して取引します
  - <b>ノード</b>タブに移動し、作成した<b>Orderer</b>をクリックします。
  - <b>共同事業体メンバー</b>で、<b>組織の追加</b>をクリックします。
  - ドロップダウンリストから `Org1 MSP` を選択します。これは、ピアの組織Org1を表すMSPであるためです。
  - <b>組織の追加</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915342-88758c00-3149-11ea-98e2-2ed00dc9c8c3.gif">
</p>
<br>


#### チャネルを作成します
  - 左側のナビゲーションタブから<b>チャネル</b>を選択します。 
  - <b>チャネルの作成</b>をクリックします。
  - チャネル名に `mychannel` を設定します。
  - 作成した順序付けサービス `Orderer` を順序付けサービスリストから選択します。
  - 組織セクションで、組織の下のチャネルメンバー `Org1 MSP (Org1MSP)` を選択します。
  - ドロップダウンリストからチャネル作成者の組織を識別するMSPを選択します。 これは `Org1 MSP (Org1MSP)` である必要があります。
  - 組織の横にある<b>追加</b>をクリックします。 組織を<b>Operator</b>にします。
  - チャネル作成者の組織セクションで、<b>チャネル作成者の MSP</b>に`Org1 MSP (Org1MSP)` を、<b>アイデンティティ</b>に `Org1 Admin` を選択します。
  - <b>チャネルの作成</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915595-15b8e080-314a-11ea-9843-d7df9be30fe5.gif">
</p>
<br>


#### ピアをチャネルへ参加させます
  - 作成した<b>mychannel</b>のタイルをクリックして、サイドパネルを起動します。
  - `Peer Org1(Org1MSP)` を選択して、 `チャネルへの結合` をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/71915747-67fa0180-314a-11ea-984b-80deb0877d03.gif">
</p>
<br>


## 5. FabCarスマートコントラクトのネットワークへのデプロイ

#### スマートコントラクトをインストールします
  - 左側のナビゲーションの<b>スマートコントラクト</b>タブに移動し、<b>スマートコントラクトのインストール</b>をクリックします。
  - Visual Studioコード用のIBM Blockchain Platform Extensionを使用し、事前にパッケージ化したFabcarスマートコントラクトパッケージファイル（おそらく `fabcar@1.0.0.cds` という名前）のBlockchainの場所を参照します。
  - <b>ファイルの追加</b>をクリックして、パッケージ化されたスマートコントラクトを見つけます。
  - スマートコントラクトがアップロードされたら、<b>インストール</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73293647-42549b00-41d2-11ea-9e57-48ccb584ec94.gif">
</p>
<br>

#### スマートコントラクトをインスタンス化します
  - スマートコントラクトタブで、ピアにインストールされているリストからスマートコントラクトを見つけ、行の右側のオーバーフローメニューから<b>インスタンス化</b>をクリックします。
  - 開いたサイドパネルで、スマートコントラクトをインスタンス化するチャネル `mychannel` を選択します。<b>次へ</b>をクリックします。
  - ポリシーに、組織メンバー `Org1MSP` を選択します。 <b>次へ</b>を2回クリックします。
  - <b>機能名</b>に `initLedger` を指定し、<b>引数</b>を空白のままにします。
  -　<b>スマートコントラクトのインスタンス化</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73294157-459c5680-41d3-11ea-848e-f7c70ea3fe64.gif">
</p>
<br>


## 6. アプリケーションのネットワークへの接続

#### 接続プロファイルを介してSDKに接続します
  - <b>インスタンス化されたスマート・コントラクト</b>の下で、リストで「fabcar」コントラクトを見つけます。 行の右側のオーバーフローメニューから `SDKを使用した接続` をクリックします。
  - <b>接続用のMSP</b>のドロップダウンから`Org1MSP`を選択します。
  - <b>認証局</b>ドロップダウンから `Org1 CA` を選択します。
  - 下にスクロールして<b>接続プロファイルのダウンロード</b>をクリックして、接続プロファイルをダウンロードします。これにより、Node.js WebアプリケーションとBlockchain Network間の接続を確立するために使用する接続JSONがダウンロードされます。
  - ダウンロードが完了したら、<b>閉じる</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73294452-e1c65d80-41d3-11ea-930b-cf225f68e52d.gif">
</p>
<br>


#### アプリ管理者を作成します
  - 左側のバーの<b>ノード</b>タブに移動し、<b>認証局</b>で組織のCAである<b>Org1 CA</b>を選択します。
  - <b>ユーザーの登録</b>をクリックします。
  - <b>登録ID</b>と<b>登録機密事項</b>に `app-admin` と `app-adminpw` を指定します。このIDの<b>Type</b>を `client` として設定します。 <b>ルートアフィリエーションを使用</b>を指定するか、このフィールドのチェックを外して、ドロップダウンリストから関連組織のいずれかを選択できます。<b>最大登録数</b>フィールドは空白のままにします。<b>次へ</b>をクリックします。
  - <b>属性</b>で、<b>属性の追加</b>をクリックします。属性を  `hf.Registrar.Roles` = `*`　として指定します。 これにより、このIDがレジストラとして機能し、アプリのIDが発行されます。<b>属性の追加</b>をクリックします。
  - <b>登録</b>をクリックします。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/72450922-25a77480-3789-11ea-9ce3-2319e7e11008.gif">
</p>
<br>


#### アプリケーション接続を更新します
  - ダウンロードした接続プロファイルを[サーバーフォルダー](web-app/server)にコピーします
  - [config.json](web-app/server/config.json)ファイルを次のように更新します。
    - ダウンロードした接続jsonファイル名。
    - アプリ管理者の<b>enroll id</b>および<b>enroll secret</b>。事前に`app-admin`および`app-adminpw`として作成しました。
    - `Org1MSP`として提供したorgMSP ID。
    - `organizations`->`Org1MSP`-> certificateAuthoritiesの下の接続jsonファイルにあるcaName。これはIPアドレスとポートのようなものです。
    - 登録するユーザー名。
    - IBM Blockchain Platformに接続するために、ゲートウェイ検出を `{enabled：true、asLocalhost：false}`に更新。

> デフォルト設定では、VS Codeからローカルファブリックインスタンスに接続するようになっています。

```js
{
    "connection_file": "mychannel_fabcar_profile.json",
    "appAdmin": "app-admin",
    "appAdminSecret": "app-adminpw",
    "orgMSPID": "Org1MSP",
    "caName": "169.46.208.151:30404",
    "userName": "user1",
    "gatewayDiscovery": { "enabled": true, "asLocalhost": false }
}
```


## 7. アプリケーションの実行

* #### 管理者を登録する
  - 最初に `web-app` ディレクトリに移動し、ノードの依存関係をインストールします。
    ```bash
    cd web-app/server
    npm install
    ```

  - `enrollAdmin.js` を実行します。
    ```bash
    node enrollAdmin.js
    ```

  - ターミナルに次のように表示されれば成功です。
    ```bash
    msg: Successfully enrolled admin user app-admin and imported it into the wallet
    ```

* #### ユーザーを登録する 
  - `registerUser.js` を実行します。
    ```bash
    node registerUser.js
    ```

  - ターミナルに次のように表示されれば成功です。
    ```bash
    Successfully registered and enrolled admin user user1 and imported it into the wallet
    ```

* #### アプリケーションサーバーの起動
  - `server` ディレクトリからサーバーを開始します。
    ```bash
    npm start
    ```

* #### Webクライアントの開始
  - 新しいターミナルで、Webクライアントフォルダーを開き、依存関係をインストールします。
    ```bash
    cd web-app/client
    npm install
    ```

  - クライアントアプリを開始します。
    ```bash
    npm start
    ```

http://localhost:4200/ にアクセスし、実行されているアプリを確認することができます。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73296572-fc9ad100-41d7-11ea-9c55-f378741b56b4.gif">
</p>
<br>

IBM Blockchain Platformコンソールにアクセスしてユーザーを監視し、追加されたブロックを含むチャンネルに関する情報を取得できます。

<br>
<p align="center">
  <img src="https://user-images.githubusercontent.com/8854447/73297271-3fa97400-41d9-11ea-825d-a2943e6ca929.gif">
</p>
<br>


## トラブルシューティング

* If you encounter an error ``discover error: access denied``, you need to set the `gatewayDiscovery` properly in your `config.json` file. This is <b>REQUIRED</b>  You must set it as follows to connect to IBP:

                 `"gatewayDiscovery": {"enabled": true, "asLocalhost": false }`


## リンク
* [Hyperledger Fabric Docs](http://hyperledger-fabric.readthedocs.io/en/latest/)
* [IBM Code Patterns for Blockchain](https://developer.ibm.com/patterns/category/blockchain/)


## ライセンス（英語）

This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

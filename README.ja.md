# Agora 講座相談アシスタント デモ

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

この文書のみを日本語に翻訳しています。アプリの画面と音声会話は英語です。以下の発話例は英語で話してください。日本語訳は意味を確認するためのものです。

Agora と Next.js で構築した講座相談の音声 AI デモです。架空のジュニア向けバスケットボール体験について質問し、子どもの希望を相談して、模擬申し込みを体験できます。

**[Agora Recipes で音声 AI デモをもっと探す →](https://recipes.agora.io/)**

[![Agora](https://img.shields.io/badge/Voice_AI-Agora-099DFD)](https://www.agora.io/en/products/conversational-ai-engine/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/docs)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[機能](#features) · [技術構成](#tech-stack) · [ローカル実行](#run-locally) · [Vercel へのデプロイ](#deploy-to-vercel) · [使い方](#how-it-works) · [カスタマイズ](#customize) · [よくある質問](#faq) · [関連リンク](#more)

<a id="what-you-can-do"></a>

<a id="features"></a>

## 機能

- **体験レッスンの紹介：** 初心者向けの内容、料金、会場、用具、準備事項を確認できます。
- **保護者の相談：** 子どもの年齢、経験、興味、バスケットボールを始める際の不安を相談できます。
- **体験日程：** デモ内の今後の週末クラスを確認できます。時刻はすべてオースティンの現地時間です。
- **模擬申し込み：** 選んだ日程と料金例を確認してから、確定するかを決めます。
- **音声と文字起こし：** 相談を音声とリアルタイムのテキストで確認できます。

<a id="tech-stack"></a>

## 技術構成

- **フロントエンド：**  Next.js、React、TypeScript。
- **音声 AI：**  Agora Conversational AI、Agents SDK、RTC、RTM。
- **モデル：**  Deepgram STT、OpenAI LLM、MiniMax TTS。

<a id="quick-start"></a>

<a id="run-it"></a>

<a id="try-it"></a>

<a id="conversation"></a>

## はじめに

<a id="run-locally"></a>

### ローカル実行

Node.js 24、pnpm 9.15.9、Conversational AI を有効にした [Agora プロジェクト](https://console.agora.io/)が必要です。

**1. インストールと設定**

このリポジトリをクローンまたはダウンロードし、そのディレクトリでターミナルを開きます。

```bash
pnpm install --frozen-lockfile

if [ ! -f .env.local ]; then
  cp env.local.example .env.local
fi
```

[Agora Console](https://console.agora.io/) でプロジェクトを作成または選択します。**Manage credentials** を開き、**App ID** と **Primary certificate** を `.env.local` にコピーします（[手順](https://docs.agora.io/en/introduction/console-setup)）。

```dotenv
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
NEXT_AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

デフォルトの音声・言語モデルには別途 API キーは不要です。App Certificate はサーバー専用です。`.env.local` に保存し、ブラウザーのコードに公開しないでください。設定例は [env.local.example](env.local.example) を参照してください。

**2. アプリを起動**

```bash
pnpm run doctor
pnpm run dev
```

[http://localhost:3000](http://localhost:3000) を開き、**Start course consultation** を選んでマイクの使用を許可します。必要に応じて要約を依頼し、終了ボタン（**End session**）で通話を終えます。

<a id="deployment"></a>

<a id="deploy-to-vercel"></a>

### Vercel へのデプロイ

[![Vercel にデプロイ](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAgoraIO-Community%2Fagora-course-consultation-assistant-demo&env=NEXT_PUBLIC_AGORA_APP_ID%2CNEXT_AGORA_APP_CERTIFICATE&envDescription=Agora%20App%20ID%20and%20App%20Certificate%20from%20Agora%20Console.%20Enable%20Conversational%20AI%20for%20the%20project.&envLink=https%3A%2F%2Fdocs.agora.io%2Fen%2Fintroduction%2Fconsole-setup&project-name=agora-course-consultation-assistant-demo&repository-name=agora-course-consultation-assistant-demo)

1. ボタンからリポジトリを自分の Git アカウントにクローンし、Vercel に取り込みます。
2. **Next.js** と Node.js 24 を選びます。
3. **Environment Variables** で `NEXT_PUBLIC_AGORA_APP_ID` と `NEXT_AGORA_APP_CERTIFICATE` を設定してデプロイします。

<a id="how-it-works"></a>

## 使い方

1. **会話を開始：**  **Start course consultation** を選び、マイクの使用を許可します。
2. **希望を説明：** 子どもの年齢、経験、目標を伝えます。
3. **体験内容を確認：** レッスン、会場、料金、今後のサンプル日程について質問します。
4. **申し込みを確認：** 日程を選び、模擬申し込みを確定または変更します。

### アーキテクチャ

```mermaid
flowchart TB
  Browser[ブラウザーの音声画面] <-->|RTC 音声| Agent[Agora 音声 AI Agent]
  Agent -->|RTM 文字起こしとイベント| Browser
  Browser -->|開始と停止のリクエスト| Server[Next.js サーバー]
  Server -->|RTC と RTM のトークン| Browser
  Server -->|開始と停止| Agent
  Reference[同梱のシナリオ資料] -->|プロンプトのコンテキスト| Server
```

Next.js がブラウザー用トークンを発行し、Agora Agent の起動時にシナリオの指示を渡します。会話はプロンプトに基づき、実際の業務システムには接続していません。詳細は [ARCHITECTURE.md](ARCHITECTURE.md) を参照してください。

<a id="faq-and-limitations"></a>

<a id="faq"></a>

## よくある質問

### 試すには講座予約システムが必要ですか？

いいえ。同梱の講座情報で相談と模擬申し込みを試せます。

### 申し込みはどのように試せますか？

子どもの年齢と経験を伝え、料金、準備、サンプル日程を尋ねます。例：「My child is nine and has never played basketball. What is the trial like?」（訳：「9歳でバスケットボールは未経験です。体験はどんな内容ですか？」）模擬確定で実際の席は予約されず、正式氏名や連絡先も不要です。

### 体験の申し込みが受け付けられないのはなぜですか？

設定済みの初心者体験は8〜12歳向けで、今後の土日のクラスとサンプルの残席数を使います。対象年齢、日程、残席の条件に合わない場合は確定できません。別の掲載クラスを尋ねてください。

### 音声セッションを開始できないのはなぜですか？

ブラウザーのマイク権限、入力機器、Agora App ID、App Certificate、Conversational AI の利用権限を確認します。localhost または HTTPS を使ってください。`pnpm run doctor` でローカル設定を確認し、画面のエラーに従って再試行します。

### 会話のコピーを保存できますか？

はい。Inspector で **Export session evidence** を選び、現在または直前の通話を JSON でダウンロードできます。次の通話やページ更新の前にエクスポートしてください。

<a id="customize"></a>

### 実際の業務に近づけるにはどうしますか？

[RAG](https://docs.agora.io/en/ai/build/custom-model-integration/custom-llm)、[ツール呼び出し](https://docs.agora.io/en/ai/build/tools/custom-tools)、[MCP](https://docs.agora.io/en/ai/build/tools/mcp-tools) で独自のナレッジベースや業務サービスに接続します。 ツールを追加する際は [Agent 設定](app/api/invite-agent/route.ts)で `advancedFeatures.enable_tools` を `true` にします。

### 自分の用途に合わせるにはどうしますか？

用途に合わせて Agent のプロンプト、業務ツール、インターフェースを変更します。

## ライセンスと出典

[MIT License](LICENSE) の下で公開しています。[第三者の権利表記](THIRD_PARTY_NOTICES.md)を保持してください。

<a id="more"></a>

## 関連リンク

- **[Recipes](https://recipes.agora.io/)：** Agora のデモや連携例を探せます。
- **[Docs](https://docs.agora.io/en/ai)：** 音声 Agent の構築と拡張を学べます。
- **[Console](https://console.agora.io/)：** プロジェクト、認証情報、使用量を管理します。

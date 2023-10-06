# Embedding Asiad 2022

## Introduction

This repository is used to experiment with an Embeddings-based conversational chatbot implemented using OpenAI and Vectra. It includes a crawler for obtaining the Hangzhou Asian Games news dataset.

## Getting Started

1. Install dependencies.

```bash
$ npm i -g pnpm # or use `corepack enable`
$ pnpm install
```

2. Create dotenv file `.env.local` to setup environment variables.

```shell
OPENAI_BASEURL=https://***.****.**/v1 # Optional, if you are in a region that has access to OpenAI.
OPENAI_API_KEY=sk-NQA9*****************************************Ehf
```

## Usages

### Add new record

```bash
$ pnpm start add "我喜欢吃苹果"
```

```
> embeddings-asiad-2022@1.0.0 start /WORKSPACE/embeddings-asiad-2022
> tsx src/cli.ts "add" "我喜欢吃苹果"

Add: 我喜欢吃苹果
```

### Query and rank records

```bash
$ pnpm start add "I bought some stocks of Apple Inc."
$ pnpm start add "I like to eat apples."
$ pnpm start add "我喜欢吃苹果"
$ pnpm start query "I tend to favor value investing and usually invest in some tech giants."
```

```
> embeddings-asiad-2022@1.0.0 start /Users/asuka109/repositories/embeddings-asiad-2022
> tsx src/cli.ts "query" "I tend to favor value investing and usually invest in some tech giants."

Query: I tend to favor value investing and usually invest in some tech giants.
[0.84487] I bought some stocks of Apple Inc.
[0.78892] I like to eat apples.
[0.72585] 我喜欢吃苹果
```

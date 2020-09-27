# Get Started

### 環境変数の設定

`.env.local`

```
GOOGLE_APPLICATION_CREDENTIALS_BASE64=<base64_encode_google_application_credentials>
```

### 起動

```bash
yarn
yarn dev
```

# デプロイ

`vercel`の`Environment Variables`に`GOOGLE_APPLICATION_CREDENTIALS_BASE64`を登録し、githubのレポジトリをインポートさせればデプロイされる。

# Trouble Shooting

ローカル環境にて実行した時、下記のエラーが起きていれば`Next`のキャッシュが問題の可能性があります。
`.next`を削除して、再度実行してみてください。

`Getting metadata from plugin failed with error: Request failed with status code 502`

# 参考
- https://medium.com/better-programming/how-to-set-up-next-js-with-tailwind-css-b93ccd2d4164
- https://cloud.google.com/vision/docs/quickstart-client-libraries?hl=ja
- https://jwt.io/

# camp.dev

> A GitHub App built with [Probot](https://github.com/probot/probot) that This Github App creates BitLabs and guides students through courses.&#x27;

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t camp.dev .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> camp.dev
```

## Contributing

If you have suggestions for how camp.dev could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Bit Project <info@bitproject.org>

# 🌍 Contributing.

Contributions are welcome, and they are greatly appreciated! Every little bit helps, and credit will always be given.

## 👶 Getting Started!

Ready to contribute? Here's how to set up `brave-chat` for local development.

1. Fork the `brave-chat` repo on GitHub.
2. Clone your fork locally:

```sh
git clone git@github.com:your_name_here/brave-chat.git
```

3. Navigate to the recently created directory:

```sh
cd brave-chat
```

4. Install the main dependencies:

```sh
npm install
```

5. Create a branch for local development:

```sh
git checkout -b name-of-your-bugfix-or-feature
```

6. Set the following env variable for redux debugging purposes:

```sh
export REACT_APP_STAGE="dev"
```

This will allow you to inspect every state and action payload.

7. Set the following env variables:

```sh
export REACT_APP_SERVER_URL=http://localhost:8000/api/v1
export REACT_APP_SOCKET_URL=ws://localhost:8000/api/v1/ws
```

Now you can make your changes locally.

8. Commit your changes and push your branch to GitHub:

```sh
git add .
git commit -m "Your detailed description of your changes."
git push origin name-of-your-bugfix-or-feature
```

9. Submit a pull request through the GitHub website.


## 📜 Docs: Getting Started!

Ready to contribute? Here's how to set up `brave-chat` for docs contribution.

1. Fork the `brave-chat` repo on GitHub.
2. Clone your fork locally:

```sh
git clone git@github.com:your_name_here/brave-chat.git
```

3. Navigate to the recently created directory:

```sh
cd brave-chat
```

4. change directory into docs:

```sh
cd ./chat/docs
```

5. Create a branch for your changes:

```sh
git checkout -b name-of-your-bugfix-or-feature
```

6. You can work on coming soon sections.

7. Commit your changes and push your branch to GitHub::

```sh
git add .
git commit -m "Your detailed description of your changes."
git push origin name-of-your-bugfix-or-feature
```

8. Submit a pull request through the GitHub website.

## 📙 Pull Request Guidelines.

Before you submit a pull request, check that it meets these guidelines:

1. The pull request should include tests, if applicable.

Thank you for helping us improve!
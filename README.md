# Brave Chat

![Brave Chat](./docs/static/images/banner.PNG "Brave Chat")

Brave Chat is a fully featured chat application developed to bring the power back to people. It's designed to be the ultimate open source slack alternative with privacy in mind. It is user-friendly with a clean interface that is easy to navigate.

As well as being feature-rich, Brave Chat is also fully responsive, meaning it will work seamlessly on a wide range of devices. So whether you're chatting on your desktop or your mobile, you'll always have a great experience.

## Supported Features

- Forms validations.

![Email validation.](./docs/static/images/input-validation.png)

![Email validation.](./docs/static/images/password-validation.png)

- Keyboard shortcuts.

![Keyboard shortcuts.](./docs/static/images/keyboard-shortcuts.png)

- Sending and receiving text messages in real time.

![Sending and receiving text messages.](./docs/static/images/send-messages.png)

- Sending and receiving images in real time.

![Sending and receiving images.](./docs/static/images/send-images.png)

- Instant notifications when submitting a form.

![Joining a room notification.](./docs/static/images/join-room-notification.png)

![add contact notification.](./docs/static/images/add-contact-notification.png)

- Adding and removing a contact using an email address of a registered user.

![Add contact form.](./docs/static/images/add-contact-form.png)

- Display chat list with unread messages count as a badge and timestamps.

![Custom badges, unread messages count, and timestamps.](./docs/static/images/custom-badges.png)

- Joining and creating rooms given a room name and or description.

![Create room form.](./docs/static/images/create-room.png)

- The ability to click on an avatar in a room to reveal detailed information about a given user.

![Room User Details.](./docs/static/images/room-user-details.png)

- Emojies support.

![Emojies support.](./docs/static/images/emojies.png)

- The ability to leave a room, and delete sent messages.

![Delete messages.](./docs/static/images/delete-messages.png)

![Deleted messages.](./docs/static/images/deleted-messages.png)

- The ability to render HTML tags, links, emails in the chat area.

![HTML tags being rendered.](./docs/static/images/bold-italic.png)

## 2022 Roadmap

- The ability to render Markdown text in the chat area.
- Enrypt and decrypt text messages on the client side using the signal protocol.
- Add support for voice, videos, files messages.
- Add support for voice and video calls.

## Components

Brave Chat code base is written to be developer-friendly, with code that is both standards-compliant and optimised for performance. It contains a handful list of reusable components. You can take a look at various components in [this section](https://chat-docs.wiseai.dev/folder-structure) of the docs, or expand the following collapsed section.

<details>
<summary><code>tree src</code></summary>

```sh
├── 📂 src
│
│   │
│   ├── 📂 components
│   │
│   │   ├──  📂 AddContact
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 AddRoom
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 AppTextInput
│   │   │ 
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 ChatContainer
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 ChatFooter
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 ContentHeader
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 ContentLoader
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 Conversation
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    │
│   │   │    ├── 📂 ReceivedMessageCell
│   │   │    │
│   │   │    │   ├── 📄 index.js
│   │   │    │   └── 📄 TypingMessage.js
│   │   │    │
│   │   │    ├── 📂  SentMessageCell
│   │   │    │
│   │   │    │   └── 📄 index.js
│   │   │    │
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 CustomAlert
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 CustomAvatar
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 CustomCarousel
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 CustomImage
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 CustomList
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    ├── 📄 ListEmptyResult.js
│   │   │    ├── 📄 ListFooter.js
│   │   │    ├── 📄 ListView.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 CustomPassword
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 CustomTextInput
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 DropdownMenu
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 EditInfo
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 EmojiPicker
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 GridContainer
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 Helper
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 MediaViewer
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 PageLoader
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 RoomContentHeader
│   │   │
│   │   │    └── 📄 index.js
│   │   │
│   │   ├──  📂 RoomConversation
│   │   │
│   │   │    ├── 📄 index.js
│   │   │    │
│   │   │    ├── 📂 ReceivedMessageCell
│   │   │    │
│   │   │    │   ├── 📄 index.js
│   │   │    │   └── 📄 TypingMessage.js
│   │   │    │ 
│   │   │    ├── 📂 SentMessageCell
│   │   │    │  
│   │   │    │   └── 📄 index.js
│   │   │    │
│   │   │    └── 📄 style.css
│   │   │
│   │   ├──  📂 Sidebar
│   │   │
│   │   │    ├── 📂 ChatUserCell
│   │   │    │
│   │   │    │   └── 📄 index.js
│   │   │    │
│   │   │    ├── 📂 ChatUserList
│   │   │    │ 
│   │   │    │   └── 📄 index.js
│   │   │    │
│   │   │    ├── 📂 ContactCell
│   │   │    │ 
│   │   │    │   └── 📄 index.js
│   │   │    │ 
│   │   │    ├── 📂 ContactList
│   │   │    │ 
│   │   │    │   └── 📄 index.js
│   │   │    │  
│   │   │    ├── index.js
│   │   │    │ 
│   │   │    ├── 📂 NoRecordFound
│   │   │    │ 
│   │   │    │   ├── 📄 index.js
│   │   │    │   └── 📄 style.css
│   │   │    │ 
│   │   │    ├── 📂 ProfileDetail
│   │   │    │ 
│   │   │    │   └── 📄 index.js
│   │   │    │    
│   │   │    ├── 📂 RoomCell
│   │   │    │ 
│   │   │    │   └── 📄 index.js
│   │   │    ├── 📂 RoomList
│   │   │    │ 
│   │   │    │   └── 📄 index.js
│   │   │    │ 
│   │   │    ├── 📂 SidebarHeader
│   │   │    │  
│   │   │    │   └── 📄 index.js
│   │   │    │  
│   │   │    ├── 📄 style.css
│   │   │    │ 
│   │   │    └── 📂 UserStatus
│   │   │ 
│   │   │        └── 📄 index.js
│   │   │ 
│   │   ├── 📂 SignIn
│   │   │ 
│   │   │   ├── 📄 index.js
│   │   │   └── 📄 style.css
│   │   │ 
│   │   ├── 📂 SignUp
│   │   │ 
│   │   │   └── 📄 index.js
│   │   │ 
│   │   ├── 📄 style.css
│   │   │ 
│   │   └── 📂 TextToHtml
│   │ 
│   │       └── 📄 index.js
```

</details>

### Running locally with NPM

- Fork/Clone the repo:

```sh
git clone git@github.com:wiseaidev/brave-chat.git
```

- Open the newly created directory:

```sh
cd brave-chat
npm install
```

In order to run the project locally or build for production use, you will need to set the following environment variables to connect with the server: 

```sh
REACT_APP_SERVER_URL=http://localhost:8000/api/v1
REACT_APP_SOCKET_URL=ws://localhost:8000/api/v1/ws
```

Now, you can run the client:

```sh
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to explore the landing page.

## Running locally with Compose v2

Navigate to [the server repository](https://github.com/brave-chat/brave-chat-server) and follow the instructions listed in [this section](https://github.com/brave-chat/brave-chat-server#running-locally-with-compose-v2) to run both the client and the server in docker containers.

## Deployment

To deploy the client, you will need to set the following environment variables that help the client connect to the server.

```sh
* REACT_APP_SERVER_URL - Your deployed server APIs url.
* REACT_APP_SOCKET_URL - Your deployed server Sockets url.
```

## **Deploy to a Static Hosting Provider**

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/brave-chat/brave-chat)

[![Deploy on Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/brave-chat/brave-chat)


## Documentation

You can refer to [the official documentation](file:///home/harmouch/Desktop/redis-hackaton/chat/brave-chat/docs/index.html) for additional guides, examples, and APIs.

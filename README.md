<a href="https://ibb.co/vXQF9z2"><img src="https://i.ibb.co/tLxGRCy/2024-03-21-035944.png" alt="2024-03-21-035944" border="0"></a>
<a href="https://ibb.co/gjR6hK5"><img src="https://i.ibb.co/7Y1bLmw/2024-03-21-035952.png" alt="2024-03-21-035952" border="0"></a>

# miniBid-frontend

miniBid is a really simple and tiny live P2P bidding platform where everyone can buy and sell their items or services.

This project has started from [Tetthys](https://github.com/tetthys)!

# DEMO LINK

[CLICK HERE!](http://tetthys.ru/)

# Software Requirements

```
NodeJS v20.4.0
```

# Installiation

### Install dependency

```
npm install
```

### Create `./src/config/config.js` from `./src/config/config.example.js`

You must have to do this. As this is CSR, You can't use the `.env` file, which is a server-side module.

### Start development server!

```
npm run dev
```

**DONE!**

You can customize your needs now.

# Library

### TailwindCSS + HeadlessUI

[TailwindCSS](https://v2.tailwindcss.com/docs) speeds up development time. No need to learn BEM methodology or others. Also, [HeadlessUI](https://headlessui.com/) is a fantasic component to use with.

### Redux Toolkit

State management tool for general UI states. For example, Dialog, Tabs, etc.

### Redux Toolkit Query

This provides caching, other useful things and more general way to handle handling HTTP REST API.

### Axios

To simplify file uploading process, Axios is only used for file uploading.

### MSW API Mocking

You can use If you want to implement a wireframe ASAP.

### Vitest + React Testing Library

This uses Vitest over Jest. Because it is Vite Powered.

# Code Detail

### useAuthValue hook

To keep some state after page refreshing, This uses localStorage. You can pick `storage` with `useAuthValue` hook.

```
const { storage } = useAuthValue();

// ...

return (
    <>
        <p>storage.user.id</p>
        <p>storage.user.username</p>
    </>
)
```

### WebSocket-based Live Validation

I personally think all frontend developers have not to write live validation rule using Joi or Zod. It has actually no effect on the server.

With `useWebSocket`, `useWebSocketValidation` hooks, You can directly access to server middleware.

```
const { wsCli } = useWebSocket({
  url: "/live_validation?middleware=authSignIn",
  allowGuest: true,
});
```
First, connect to backend middleware.

```
useWebSocketValidation(
  {
    type: "client.send:data",
    data: {
      email: email,
      password: password,
    },
  },
  {
    wsCli: wsCli,
    dependencies: [email, password],
  }
);
```

Then, you can receive a response from the backend server with `useWebSocketEvent` hook. And if there is an error, you can pass it to the `FormControl` component you defined.

# Not Implemented

### All EmailCode and PhoneNumberCode

These are implemented as stubs on backend. Just enter any string. You will pass.

### Profile Setting Modal ( Change Email, Change PhoneNumber, Change Password, Create or Update Profile Picture )

Same reason as before.

# Not Supported

### Responsive Design

Although It won't crumpled too much, Mobile design isn't considered at all.

# Added Soon

### Rich Search Features

There is a little problem in the backend. But it will be supported soon.

### Replace localStorage with IndexDB

localStorage is insecure and unstable. It will be replaced.

### Replace RTK Query with SWR

SWR seems simpler and easier to manage than RTK Query.
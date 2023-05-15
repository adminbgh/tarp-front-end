![Welcome](https://i.imgur.com/6V31BJY.jpg)

# ADVANTIS FRONT-END

Automatically know the red flags on any token!

## Tech Stack

**Client:** React, Redux, Socket.io, Axios, Boostrap, Material UI

This project uses **ViteJS.**

To know more about [Click here](https://vitejs.dev)

## Getting started

Getting advantis-front-end with git

```bash
  git clone https://github.com/Sln-steve/advantis-front-end.git
```

## Run Locally

Go to the project directory

```bash
  cd advantis-front-end
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_APP_API_URL`

`VITE_APP_SOCKET_URL`

## All routes

![Imgur](https://i.imgur.com/UCBUvjh.png)

### Application Flow

![Logo1](https://i.imgur.com/RXm3RVL.gif)

By entering the contract you want to analyze and dispatch a check within our Database and within the API to verify that the added contract exists.

If the entered contract is valid, it is redirected to the "Contract" component where we can see all the main information of this, as well as its logo, price, initials, social networks and more

### Top 10 wallets

If the entered contract is not yet loaded in our Database, it will only render the top 10 wallets after a few seconds, since it receives the information through **Socket.io**

Once all the information has been rendered, you can consult the top 10 wallets with their last 10 transactions made within it, as well as having the possibility of marking the wallets that seem suspicious so that they can later be verified by an administrator or also you can mark the wallet you want to keep them in Monitoring yourself (This option only works for **registered users**)

## ADMIN Flow

![Logo2](https://i.imgur.com/V1AghDY.gif)

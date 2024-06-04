# StorySprout

StorySprout is a collaborative storytelling platform where users can collectively create and explore branching narratives. Dive into imaginative worlds, contribute your own sentences, and watch as stories grow and evolve with each new addition.

## Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [How to run](#how-to-run)
4. [Future Work](#future-work)

<br/>

## Features

- **Story Contributions**: Contribute to the growing story.
- **Branching Narratives**: Explore different story paths and contribute to multiple branches.

<br/>

## Requirements

- Node.js (https://nodejs.org)
- PostgreSQL 13.+ (https://www.postgresql.org)

<br/>

## How to run

Make sure the postgresql service is running.

```
git clone https://github.com/petarkosic/story-sprout
cd /story-sprout
cd /server
npm install

cd ..
cd client
npm install
```

Inside `/server` create a `.env` file.

```
PORT=<app_port>                 (default = 5000)

POSTGRES_USER=<db_user>         (default = postgres)
POSTGRES_PASSWORD=<db_password>
POSTGRES_HOST=<db_host>         (default = localhost)
POSTGRES_PORT=<db_port>         (default = 5432)
POSTGRES_DATABASE=postgres      (default = postgres)
```

To start the server, open `/server` folder and run:

```
npm run dev
```

To start the client, open `/client` folder and run:

```
npm run dev
```

Open your browser and go to http://localhost:3000 to view the app.

<br/>

## Future Work

[x] **User Authentication**: Sign up and log in to track your contributions and interact with other users.
[ ] **Create Stories**: Allow users to create a new story.
[ ] **Real-Time Updates**: See new contributions as they happen with real-time updates.

# StorySprout

StorySprout is a collaborative storytelling platform where users can collectively create and explore branching narratives. Dive into imaginative worlds, contribute your own sentences, and watch as stories grow and evolve with each new addition.

## Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [How to run](#how-to-run)
4. [Technology Stack](#technology-stack)
5. [Future Work](#future-work)

<br/>

## Features

- **Story Contributions**: Contribute to the growing story.
- **Branching Narratives**: Explore different story paths and contribute to multiple branches.
- **Story Path**: Choose a sentence to see the story so far.
- **Story Rating**: Rate the story and see the average rating.
- **User Profile**: See your profile and contributions.

<br/>

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL

## Requirements

- Docker (https://www.docker.com)

## How to run

Make sure you have docker installed and running.

<br/>

Clone the repository and change into the directory:

```
git clone https://github.com/petarkosic/story-sprout
cd /story-sprout
```

Inside `/server` folder, create an `.env` file.

```
PORT=<app_port>                 (default = 5000)

POSTGRES_USER=<db_user>         (default = postgres)
POSTGRES_PASSWORD=<db_password>
POSTGRES_HOST=<db_host>         (default = postgres)
POSTGRES_PORT=<db_port>         (default = 5432)
POSTGRES_DATABASE=postgres      (default = story_sprout)

ACCESS_TOKEN_SECRET=<some_secret>
REFRESH_TOKEN_SECRET=<some_other_secret>
ACCESS_TOKEN_LIFETIME='15m'
REFRESH_TOKEN_LIFETIME='15d'
```

<br/>

To start the application, from the root project directory run:

```
docker compose up -d
```

<br/>

**Note**: Please be patient during the initial setup, as the database is being initialized and seeded with default data.

<br/>

Open your browser and go to http://localhost:3000 to view the app.

To stop the application, run:

```
docker compose down
```

## Future Work

- [x] **User Authentication**: Sign up and log in to track your contributions and interact with other users.
- [x] **Create Stories**: Allow users to create a new story.
- [x] **Rating System**: Allow users to rate other users' stories.
- [x] **User Nickname**: Allow users to set a nickname and use it to identify themselves.
- [x] **User Profile**: Show users their profile and their contributions.

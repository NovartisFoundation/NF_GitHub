<center>
    <img src="https://www.novartisfoundation.org/themes/custom/nvs_arctic/logo/novartis-foundation-logo.svg" alt="Novartis Foundation" width="400"/>
</center>


The Novartis Foundation AI in health maturity assessment tool helps countries identify where to best invest resources to enable successful deployment of impactful AI solutions in health.

The ultimate goal is that the potential of this transformative technology can be realized everywhere, and no country is left behind.

# 👓 Backend

## Description

The application backend is using Drupal's backend. More information about settings can be found on the [backend documentation](./docs/backend.md).

## Requirements

- [Docker & docker-compose](https://docs.docker.com/engine/install/)
- Make (usually installed by default on most unix based OS')

## How to install

### API Setup

- Copy and rename the `.env.docker` file to `.env`
- Run the `make setup` command

### Database 

A database is provided by default to make the app works properly with all the questions from the AI in health maturity assessment tool. The database content is all the question to make the tool work properly and an admin access to the admin.

The default access account to the admin:
```
Account: admin
Password: Ws5nWh8PdhS4
```

> :warning: We highly recommend you to change the password in your Drupal Administration. :warning:

# 🎩 Frontend

## Description

The application frontend is using Next.js as React framework. We highly recommend the use of Vercel to run the frontend application. More information about setting up the application can be found in the [frontend documentation](./docs/frontend.md)

# ❓ Questions
The Novartis Foundation AI in health maturity assessment tool are composed of differents areas and pillars that have multiple questions. Theses questions are editable in the drupal's admin interface. More information about the questions can be found in [questions documentation](./docs/questions.md).

# 👨‍💻 Contributions

The Novartis Foundation AI in health maturity assessment tool does not accept any contributions.
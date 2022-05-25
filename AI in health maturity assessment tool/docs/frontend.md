# Frontend
Novartis Foundation Assessment Frontend

## Technology Stack
The frontend code is build with the Framework [Next.js](https://nextjs.org/) who's build on top of React. 

<hr />

## Run the project
Once you received the authorization to access the , run the following command:
```
clone the projet
cd novartis/frontend
npm i / yarn
```
This will clone the project and install all the dependancy you need to run the project.
To also run the project you will need to create a `.env.local` file with the following environments variables:
```
AWS_REGION_MAIL
AWS_ACCESS_KEY_ID_MYAPP
AWS_SECRET_ACCESS_KEY_MYAPP
EMAIL_FROM
EMAIL_NAME_FROM
API_URL
WEBSITE_URL
```

To run the project on the frontend side
```
npm run dev / yarn run dev
```

## Build and Deploy

We are highly recommend the team to use [Vercel](https://vercel.com/) as hosting management and deployment for a seamless experience. If the app need to be run on a different environment, please follow the [following instructions](https://nextjs.org/docs/deployment#other-hosting-options). An example with Docker can be found on [this page](https://nextjs.org/docs/deployment#docker-image) as well.

## Code
As the app is using React for the frontend, the entire frontend app is coded in Javascript and run APIs call to the backend (Drupal) who will deliver the correct information to the end user. Documentation about how Next.JS is working can be found [here](https://nextjs.org/docs/getting-started).

## Email
The current project is using [AWS SES](https://aws.amazon.com/ses/) to send email when a user finish the assessment. All variables for AWS SES are found and set inside the `.env` / `.env.local` file.

## Images

The images used for the assessment questions are inside the Drupal Installation in the folder `/sites/default/files/answers/`, to access these files, Next.js need to have a configuration set in the next.config.js.
```
images: {
    domains: ["you-domain.com"],
},
```
More information about the domains can be found on [Vercel website](https://nextjs.org/docs/basic-features/image-optimization#domains).

## Languages
The application is available in the following languages: English, French, Spanish and Portuguese. The user interface language can be set under the folder `public/static/locals/[language]`. In the translation file, the url used for the project are referring to `yourdomain.com`, please update them with you own domain.

## Admin
The application admin is located under `/admin` on your frontend application. You can use the same account you use for your backend application to see the results from the assessment tool.

## Legal
Please make sure you are updating the application with your own terms and conditions before publishing the application online.
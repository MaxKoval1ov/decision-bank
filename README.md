# Project README

## Table of Contents

  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Logging In](#logging-in)
  - [Customizing Data](#customizing-data)

## Getting Started

1. **Navigate to the Root Folder:**
   
   Make sure you are in the root folder of your project.

2. **Build and Run Docker Compose:**

   Run the following command to build and start the Docker containers:
   
    docker-compose up --build


3. **Access the Web Page:**

Open your web browser and navigate to http://localhost:3001 to access the web page.

## Logging In

To log in, use one of the following usernames along with the password 'password':

- Username: debt
- Segment 1 (credit_modifier = 100)
- Segment 2 (credit_modifier = 300)
- Segment 3 (credit_modifier = 1000)

## Customizing Data

If you need to customize the data stored in the database, follow these steps:

1. **Locate the `seeds.ts` file:**

The data is managed by the `seeds.ts` file, which is located inside the `server/prisma` folder.

2. **Modify Data in `seeds.ts`:**

Inside the `seeds.ts` file, you can change the payload to customize the data according to your needs.

3. **Rebuild and Run the Application:**

After making changes to the `seeds.ts` file, rebuild and restart the application using the `docker-compose up --build` command as mentioned in the "Getting Started" section.

That's it! You should now be able to access the web page, log in with the provided credentials, and customize the data as required.

Enjoy project!

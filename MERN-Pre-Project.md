![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Project 3 Setup

## Get setup on git

Creating a git repo first will save setup time, as opposed to creating it locally and connecting it with a repo later.

1. Create a git repo on github.com (your personal account). Create it with a Readme, and ensure it's public.
2. Add your teammates as collaborators by navigating to your repo then going to Settings -> Collaborators -> signing in -> Add people -> searching for your teammates and sending invites.
3. Next, navigate back to the Code tab of your repo. Click on the green Code button and copy the SSH or HTTPS url.
4. In your terminal, navigate to your projects folder and run `git clone <link>` replacing `<link>` with the link you copied. Once it completes, open in VSCode.

## Create the Express app

Next we'll initialise an Express application by creating a package.json file and an entry point (index.js). In the VSCode integrated terminal:

1. Run `npm init -y` to create a package.json with defaults.
2. Run `npm i express dotenv mongoose` to install some dependencies.
3. Update your package.json to include `"type": "module` and add a `serve` script that starts the index.js file using nodemon.
4. Later we'll need some additional fields in the `"scripts"` field, so we will add them now to save time later - this command will be executed later when we deploy to heroku. In the package.json for your express app, add the following to the end of your `"scripts"`:
```
{
  "scripts": {
    ...
    "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"
  }
}
```
5. Finally, create your `index.js` entry file.

## Getting connected with MongoDB Atlas

Earlier in the module, we each created an [Atlas](https://cloud.mongodb.com/) account, log into it now.

1. On the Database dashboard, click "Connect" on your cluster.
2. The 'Connect to your application' modal will pop up. Click on "Drivers".
3. Copy the connection string from the code block in step 3 of "Connecting with MongoDB Driver".
4. Below this block, it will tell you to replace `<password>` with the password for the user. In the connection string below, the user is `sam-ga`. Don't forget to also remove the `<` and the `>`.
```
mongodb+srv://sam-ga:<password>@cluster0.mnaihfu.mongodb.net/?retryWrites=true&w=majority
```
5. Create a `.env` file and add your connection string with the password replaced.
6. Don't forget that you'll need to `import 'dotenv/config'` in your index.js file to access it. If you called the variable in your `.env` file `CONNECTION_STRING`, use `process.env.CONNECTION_STRING` to access it inside your index.js file and beyond.


## Bootstrap a React App with create-react-app

Next, we'll create our React App using a create-react-app template.

1. In the VSCode integrated terminal, run `npx create-react-app client --template mern-project` - this will create a `client` folder that will be your React app. It's important it's nested inside of your server-side code for easy (and cheap) deployment later.

## Code away!

This concludes the setup for Project 3. More to come later!
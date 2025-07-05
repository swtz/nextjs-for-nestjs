# How to Run 'The Blog' App for Testing and Development

## Requirements:

- Node.js installed on your machine

## Getting started

Follow the steps below to run the application from scratch:

```sh
# Install all dependencies
npm install

# Set up the .env.local file using the .env.local-example file as a reference

# Create the database file with the required tables
npm run migrate

# (Optional) Populate the website with 10 posts (2 unpublished)
npm run seed

# Build the Next.js application
npm run build

# Start the application (production mode)
npm start

# Run in development mode
npm run dev
```

## Feedback

Feel free to send your feedback to my personal email!

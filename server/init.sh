#!/bin/sh

# Wait for the Postgres database to be ready
until nc -z -v -w30 $POSTGRES_HOST $POSTGRES_PORT
do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# Check if a flag file exists, indicating if the scripts have already run
if [ ! -f /tmp/.initialized ]; then
  # Run Prisma migration
  echo "Running Prisma migration..."
  npm run db:migrate

  # Run Prisma seed
  echo "Running Prisma seed..."
  npm run db:seed

  # Create the flag file to indicate that the initialization has been done
  touch /tmp/.initialized
else
  echo "Initialization has already been performed."
fi

# Start your Node.js application
exec npm run start:prod

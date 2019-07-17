if [ "$1" = "dev" ]; then
  cp .env.dev.json .env.json
  echo "Deployed for development"
else
  cp .env.prod.json .env.json
  echo "Deployed for production"
fi

expo start

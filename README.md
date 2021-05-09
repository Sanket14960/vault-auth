# vault-auth
This is the Authentication microservice for vault-app (password manger)


Features:
- Express REST API for sign-up, sign-in, sign-out, and current-user endpoints
- JWT headers stored in cookies to add an additional layer of security to user endpoints
- All passwords are hashed before storage in MongoDB
- DockerFile added for produciton use
- Communication with NATS event bus


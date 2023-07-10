# EduSense
<hr/>

### Project Structure
- client \- Includes source code for web (frontend)
- server \- Includes source code for api (backend)
<hr/>

### App Feature
- Login, Register
#### - Teacher Role
- Create Class, Join Class, Generate Quiz, Submission Quiz
#### - Student Role
- Join Class, Submission Quiz

<hr/>

### Project Setup
```bash
git clone https://github.com/rvnkrwn/EduSense.git
cd EduSense
```

#### Setup Server Side
> Make sure the system has installed php version ^8.1 and also composer.
```bash
cd server
npm install
php -r "file_exists('.env') || copy('.env.example', '.env');"
npm run start
```
> Setting up a database connection, make sure the system has MongoDB installed and is running. Open the `.env` file and adjust the database connection configuration according to the MySQL configuration on the system.
```env
MONGO_URL=
```
> JWT Secret key
```env
JWT_SECRET=
```
> SMTP config || optional
```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_MAIL=
```
> Run the Client Side
```bash
cd client
npm run start
```
> Open http://localhost:3000 (primary || if port 3000 is using auto use another port)
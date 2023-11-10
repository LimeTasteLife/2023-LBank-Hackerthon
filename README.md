# 2023-LBank-Hackerthon
Git repository for 2023 LBank Hackerthon.

## Site Link
https://lbank-hackathon.vercel.app/

## backend
```
git clone
cd ./backend
touch .env
npm i
npm run dev
```

백엔드는 .env 파일을 세팅해야 합니다.
.env예시는 다음과 같습니다.
```
DATABASE_URL=''  
SEQUELIZE_HOST=''
SEQUELIZE_USERNAME=''
SEQUELIZE_PASSWORD=''
JSON_RPC_PROVIDER='https://polygon-mumbai.infura.io/v3/...'
CONTRACT_ADDRESS='0x6dA6584CFd74D8e1712bcb322D1b6b93C3bB4093'
// admin address
PRIVATE_KEY='...'
PUBLIC_KEY='...'
// test address
TEST_KEY='...'
TEST_KEY_NEG='...'
```

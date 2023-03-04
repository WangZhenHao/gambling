cd /work/static/test/html5/root

if [ ! -d "./gitProject/h5-common" ]; then
  mkdir -vp ./gitProject/h5-common
  cd ./gitProject/h5-common
  git init
  # git remote add origin https://udream-wangzh:Aa123456@code.aliyun.com/udream_code/h5-ums-v2.git
  git remote add origin https://udream-wangzh:Aa123456@code.aliyun.com/udream_code/h5-common.git
  git checkout -b dev
  git pull origin dev
  echo "构建成功"
else
  cd ./gitProject/h5-common
   git pull origin dev
   echo "构建成功"
fi

cd ./page/udream_web

npm install
npm run build:test
rm -rf /work/static/test/html5/root/common/page/udream_web
cp -r ./dist/test /work/static/test/html5/root/common/page/udream_web
chown -R udream:udream /work/static/test/html5/root/common/page/udream_web
chmod -R 777 /work/static/test/html5/root/common/page/udream_web
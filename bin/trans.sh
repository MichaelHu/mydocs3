if [ "$2" == "local" ]; then
# to local
sed -i '' -e '/http:\/\/258i.com\/static/s/http:\/\/258i.com\/static/file:\/\/\/Users\/hudamin\/projects\/git\/mystatic/g' $1

else

# to online
sed -i '' -e '/file:\/\/\/Users\/hudamin\/projects\/git\/mystatic/s/file:\/\/\/Users\/hudamin\/projects\/git\/mystatic/http:\/\/258i.com\/static/g' $1

fi

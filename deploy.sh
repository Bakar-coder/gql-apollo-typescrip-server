#!/bin/bash
echo What is the version of your app?
read VERSION
docker build -t adams-casper/eco-shop:$VERSION
docker push adams-casper/eco-shop:$VERSION
ssh root@64.227.13.208 "docker pull adams-casper/eco-shop:$VERSION && docker tag adams-casper/eco-shop:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
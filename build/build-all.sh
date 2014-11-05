#!/bin/bash

ROOT=/Users/hudamin/projects/git/mydocs
DOCDIR=$ROOT/docs
DISTDIR=$ROOT/dist

cd $ROOT

rm -rf __tmp
mkdir -p __tmp/docs
cp -r $DOCDIR/* __tmp/docs

pushd __tmp/docs

find . -type f \
    -name "*.md.preview.html" \
    -exec rm -f {} \;

find . -type f \
    -regex "\..*\.md" \
    -exec sh $ROOT/build/build-markdown.sh {} \;

cd ..
cp -r docs $DISTDIR 

popd

rm -rf __tmp

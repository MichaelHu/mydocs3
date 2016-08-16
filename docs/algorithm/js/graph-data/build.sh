#!/bin/bash

new_file=all.js

: > $new_file 
for j in `ls network*`
do
    cat $j >> $new_file 
done

#!/bin/bash
files="sigma-utils sigma-graph sigma-prototype"
for i in $files
do 
    new_file=$i.js
    > $new_file 
    for j in `ls $i`
    do
        cat $i/$j >> $new_file 
    done
done

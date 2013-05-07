#!/bin/bash
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
i=1
for file in ./*.jpg; do
    mv -T ${file} ./test90/art_${i}.jpg
    i=$(expr ${i} + 1)
done
i=1
IFS=$SAVEIFS

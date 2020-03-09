#!/bin/bash

if [ ! $1 ]; then
    echo "Please provide a version"
    exit 0;
fi

docker build -t odp:ne-connector.$1 .
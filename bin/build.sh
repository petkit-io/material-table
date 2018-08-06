#!/bin/bash
ng-packagr -p package.json

rm -rf dist/style
cp -R src/style dist/style


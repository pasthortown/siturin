#!/bin/bash
ng build --base-href "http://desarrollo.siturin/" --prod
rm -R ./../ClientBuild/
cp -R ./dist/client/ ./../ClientBuild/

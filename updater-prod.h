#!/bin/bash
git pull
rm -R ./../frontend
cp -R ClientBuild/ ./../frontend/
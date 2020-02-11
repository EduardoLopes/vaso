# vaso

A module to help develop experiments

## Install

This is a really simple module, made for personal use, so i'm not publishing on NPM. To use it, clone the repository and run `npm link`.

## Usage

- `vaso` run the browser-sync server
- `vaso create <folder name>` create a folder with a empty project
- `vaso build` build the js file

Put `//js: <file>` inside the main.js file and this comment will be replaced with the file content. Root is the js folder inside the folder created by `vaso create <folder name>`

## Why?

I've posted a lot of stuff on [codepen](https://codepen.io/eduardolopes). Since i don't have a premium account, it was kinda frustrating for me to use their editor and write all the javascript in a single file.

What this projet does is concatenate all javascript files into a single one, so i can easily paste on codepen. It uses browser-sync for server/synchronised browser testing and gulp for whatching files and live reload.

## Known issues

The order of the comments that will be replaced with the file content is important. The functions and vars inside all files are global! You can use IIFE functions to help with that.

I don't wanna use a import system or something like that, so the code will be easier to read on codepen for the ones that want to understand the code!
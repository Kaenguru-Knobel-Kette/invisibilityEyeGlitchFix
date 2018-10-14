# Invisibility Eye Glitch Fix
An UPF patcher for Skyrim and Skyrim Special Edition. Fixes messed up eye textures caused by invisibility effects.

The Unified Patching Framework (UPF) is a core module provided with [zEdit](https://github.com/z-edit/zedit) to generate patch plugins.
# Developement
Download [NodeJS](https://nodejs.org/en/download) and install it. This will allow you to use `npm` from the command line to install NodeJS packages. We use `npm` to set up a gulp build system so we can use multiple JavaScript source files in development and create release archives with a single command.

Open a command prompt in the folder where you cloned the repository. Type `npm install` to install packages.

`npm run build` creates the dist folder. In the dist folder will be a built index.js JavaScript file (concatenating javascript files you required using //= require), the entire contents of your partials folder, and your module.json file.

`npm run release` creates the releases folder. In the releases folder will be a ZIP archive in the format noDistantLODforNPCs-v{version}.zip. This archive is a release archive that you can upload and share with people. It's set up so users can install it through zEdit's Manage Extensions window.

`npm run test` installs the patcher in zEdit for quick testing. Variable `zEditPath` in gulpfile.js must be set to your zEdit installation. This will overwrite an already exisiting patcher with the same name!

# install (unix systems)
from npm, install globally
`npm install -g overlap-cli`

install locally
`npm install --save-dev overlap-cli`

# usage
## model conversion
convert your 3d models to a DAE compatible with SCNkit:
`overlap-cli -c YOUR_MODEL.dae`

Or you can specify an output type, for example FBX:
`overlap-cli -c YOUR_MODEL.dae -f fbx`

Overlap-cli is built on top of [assimp](https://github.com/assimp/assimp). For a list of compatible input and export types, see the assimp README file.

# development
clone the repo
`npm link` in folder.

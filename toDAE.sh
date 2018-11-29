# run assimp on the provided file to export a new .dae in the same folder
assimp export $input $output .dae

# replace all backslashes with foreward slashes to fix models that were exported on windows.
sed 's/\\/\//g' gun4.dae > gun4working.dae
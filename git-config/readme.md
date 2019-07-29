# Things to put on .gitconfig

Things to put on your .gitconfig. You can find your .gitconfig on ```%HOMEPATH%\.gitconfig``` (on Windows) or ```~/.gitconfig``` (on Linux).


## VS Code as Git default editor

These lines set VS Code as Git default editor and merge & diff tool

```
[core]
    editor = code --wait
[merge]
    tool = vscode
[mergetool "vscode"]
    cmd = code --wait $MERGED
[diff]
    tool = vscode
[difftool "vscode"]
    cmd = code --wait --diff $LOCAL $REMOTE
```

## Git alias for speed up your work

Here are some alias, very useful in a team environment
```
[alias]
    del = "!f() { git push origin -d $1; git branch -d $1; }; f"
    acp = "!f() { git add .; git commit -m \"$1\"; git pull; git mergetool; git commit -m \"$1 - resolvido\"; git push; }; f"
    ckp = "!f() { git checkout -b $1 && git push --set-upstream origin $1; }; f"
    upd = "!f() { git remote update origin --prune; }; f"
```

Then you can do:
- ``` git del "some-branch" ``` to delete a branch locally and on the default remote
- ``` git acp "commit message" ``` to add all the files, commit your changes, fetch the remote chaings, open the mergetool for the conflicts and finally commit and push the merged version
- ``` git ckp "new-branch" ``` to create a new branch and push it to the origin remote
- ``` git upd ``` to update the list of remote branches
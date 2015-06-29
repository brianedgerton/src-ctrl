# src-ctrl

## This is Alpha Software

`src-ctrl` is a simple module that will allow you to run `pre-commit` and `pre-push` tasks specified in your `package.json` file.

## Usage

Installing the `src-ctrl` module will copy to scripts to your `./.git/hooks` folder. If there are existing scripts there, it will rename them and they will be restored if `src-ctrl` is uninstalled. After installation, just add the commands in your `package.json` file.

```json
{
	"name": "my-module",
	"scripts": {
		"test": "mocha ./specs/**.spec.js",
		"pre-commit": "gulp lint && npm test",
		"pre-push": "gulp integration-tests"
	}
}
```

If the commands exit with a non-zero status, the commit or push event will be prevented.

**But my tests don't pass and I really need to commit? What do I do?**

If you really need to break the rules, `git` itself allows the bypassing of hooks by using the `--no-verify` option.

```bash
$ git commit --no-verify
```

## Future

The next phase will include a plugin loader with the intent that plugins could provide more functionality to facilitate specific git-oriented workflows.

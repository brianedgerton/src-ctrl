# src-ctrl

## DO NOT USE, STILL IN PROOF OF CONCEPT STAGE

* Installs `pre-commit` and `pre-push` hooks to `.git/hooks`
* Runs `pre-commit` and `pre-push` commands specified in `package.json`
* Loads `src-ctrl` plugins and runs any `pre-commit` and `pre-push` sequences
* Loads plugin configuration from `package.json`

*Future*

* When installed globally, provides shell commands to help with gitflow

### src-ctrl-leankit-gitflow

* `pre-commit`
	* Prevent committing directly to `master` or `develop`

* `pre-push`
	* Prevent pushing directly to `upstream`
	* Ensure that `origin` is not an address that should be `upstream`

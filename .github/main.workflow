workflow "New workflow" {
  on = "pull_request"
  resolves = ["Test"]
}

action "Build" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "npm install"
}

action "Lint" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  needs = ["Build"]
  runs = "npm run lint"
}

action "Snapshot & Unit Tests" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  needs = ["Lint"]
  runs = "npm run test"
}

action "Visual Regression Tests" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  needs = ["Snapshot & Unit Tests"]
  runs = "npm run snapshot"
}

import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.28.1',
  defaultReleaseBranch: 'main',
  name: 'stack-monitor',
  projenrcTs: true,

  release: true,
  codeCov: true,
  majorVersion: 1,

  githubOptions: {
    mergify: true,
    mergifyOptions: {
      rules: [{
        name: 'Label core contributions',
        actions: {
          label: ['contribution/core'],
        },
        conditions: ['author~=^(lazinessdevs)$'],
      }],
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();
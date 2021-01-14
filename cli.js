#!/usr/bin/env node
/* eslint-env node */
const execa = require('execa');
const prompts = require('prompts');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

let simulator = process.env.SIMULATOR;
const { scheme } = yargs(hideBin(process.argv)).option('scheme', {
  alias: 's',
  description: 'name of the xcode scheme to run',
  type: 'string',
}).argv;

(async () => {
  if (!simulator) {
    // Build up a list of available devices for the user to select from
    const { stdout } = await execa('xcrun', [
      'simctl',
      'list',
      'devices',
      '--json',
    ]);

    const devices = JSON.parse(stdout).devices;
    const iOSKeys = Object.keys(devices)
      .filter((key) => key.includes('iOS'))
      .sort();

    // merge the devices in order
    const iOSDevices = iOSKeys.reduce((memo, key) => {
      memo.push(...devices[key].filter(({ isAvailable }) => isAvailable));
      return memo;
    }, []);

    // Prompt for which device to start
    const response = await prompts({
      type: 'select',
      name: 'simulator',
      message: 'Pick a Simulator',
      choices: iOSDevices.map(({ name, state, udid }) => ({
        title: `${name}${state !== 'Shutdown' ? ` (${state})` : ''}`,
        value: name,
        description: `UDID: ${udid}.`,
      })),
      initial: 1,
    });

    simulator = response.simulator;
  }

  if (!simulator) {
    console.error(
      'Must select a Simulator, or set the SIMULATOR environment variable. Exiting.'
    );
    process.exit(1);
  }

  // Kick off react-native
  await execa('yarn', [
    'react-native',
    'run-ios',
    '--simulator',
    simulator,
    ...(scheme ? ['--scheme', scheme] : []),
  ]).stdout.pipe(process.stdout);
})();

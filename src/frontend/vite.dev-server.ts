import * as path from 'node:path';
import * as chokidar from 'chokidar';
import { createServer } from 'vite';
// @ts-ignore
import _ from 'lodash';

const modules = [
  '@wemogy/reactbase'
];

async function main() {
  const server = await createServer();
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });

  const modulePaths = modules.map(mod => path.join(process.cwd(), 'node_modules', mod));
  console.log('VITE LINK: Watching modules', modulePaths, 'for changes');

  const restart = _.debounce(() => {
    console.log('VITE LINK: Triggering restart');
    server.restart(true);
  }, 2000, {});

  chokidar.watch(modulePaths)
    .on('all', (event, path) => {
      // The watcher detects a lot of 'add' and 'addDir' events at startup / restart.
      // These need to be filtered out because they crash the server.
      if (event.includes('add')) {
        return;
      }

      // Filter out sub-dependencies
      if ((path.match(/node_modules/g) || []).length > 1) {
        return;
      }

      // Filter out git files
      if (path.includes('.git')) {
        return;
      }

      // Filter out IntelliJ files
      if (path.includes('.idea')) {
        return;
      }

      console.log('VITE LINK: File change (', event, ') for', path);

      restart();
    });
}

void main();

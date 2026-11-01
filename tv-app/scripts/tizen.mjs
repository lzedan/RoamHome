// Wraps the Tizen CLI for this project: `package` signs dist/tizen into dist/Roam.wgt,
// `install` and `run` push it to the TV. See TV-SETUP.md for the one-time device setup.
//
// Environment overrides:
//   TIZEN_TOOLS  folder holding `sdb` and `tizen-core/tz` (default: VS Code extension's)
//   TIZEN_TV     device address as host:port (default: 192.168.0.10:26101)
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'

const tools = process.env.TIZEN_TOOLS ?? join(homedir(), '.tizen-extension-platform/server/sdktools/data/tools')
const tz = join(tools, 'tizen-core/tz')
const sdb = join(tools, 'sdb')
const tv = process.env.TIZEN_TV ?? '192.168.0.10:26101'

const projectDir = resolve('dist/tizen')
const packagePath = resolve('dist/Roam.wgt')

function run(command, args) {
  console.log(`\n$ ${[command, ...args].join(' ')}`)
  const result = spawnSync(command, args, { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function requireFile(path, hint) {
  if (!existsSync(path)) {
    console.error(`Missing ${path}\n${hint}`)
    process.exit(1)
  }
}

const commands = {
  package() {
    requireFile(tz, 'Install the Tizen VS Code extension, or set TIZEN_TOOLS.')
    requireFile(join(projectDir, 'config.xml'), 'Run `npm run build:tizen` first.')
    run(tz, ['build', '-w', projectDir])
    run(tz, ['pack', '-w', projectDir])

    // tz names the package after its folder; give it a stable name instead.
    const built = readdirSync(join(projectDir, 'Debug')).find((name) => name.endsWith('.wgt'))
    if (!built) {
      console.error('tz pack did not produce a .wgt')
      process.exit(1)
    }
    copyFileSync(join(projectDir, 'Debug', built), packagePath)
    console.log(`\nPackaged ${packagePath}`)
  },

  install() {
    requireFile(packagePath, 'Run `npm run tizen:package` first.')
    run(sdb, ['connect', tv.split(':')[0]])
    run(tz, ['install', '-w', projectDir, '-p', packagePath, '-e', tv])
  },

  run() {
    run(tz, ['run', '-w', projectDir, '-e', tv])
  },
}

const command = commands[process.argv[2]]
if (!command) {
  console.error(`Usage: node scripts/tizen.mjs <${Object.keys(commands).join('|')}>`)
  process.exit(1)
}
command()

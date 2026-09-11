#!/usr/bin/env node
/**
 * Boilerplate setup script.
 *
 * Interactive mode:
 *   npm run setup
 *
 * Non-interactive mode:
 *   npm run setup -- --name my-new-app --display "My New App" --reset-git --no-install
 *
 * Flags:
 *   --name <kebab-case>       Package name (also used to derive display name)
 *   --display "<Title Case>"  Overrides the derived display name
 *   --reset-git               Wipe .git and create a fresh initial commit
 *   --no-install              Skip `npm install`
 *   --dry-run                 Print what would change, do not write files
 *   --help                    Show this help
 */

import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  const self = await readFile(fileURLToPath(import.meta.url), 'utf8')
  console.log(self.match(/\/\*\*[\s\S]*?\*\//)?.[0] ?? '')
  process.exit(0)
}

const flags = {}
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a.startsWith('--')) {
    const key = a.slice(2)
    const next = args[i + 1]
    if (next && !next.startsWith('--')) {
      flags[key] = next
      i++
    } else {
      flags[key] = true
    }
  }
}

const DRY = flags['dry-run'] === true

function toKebab(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function toTitle(kebab) {
  return kebab.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
}

async function ask(question, defaultVal) {
  const rl = createInterface({ input: stdin, output: stdout })
  const suffix = defaultVal ? ` (${defaultVal})` : ''
  const answer = (await rl.question(`${question}${suffix}: `)).trim()
  rl.close()
  return answer || defaultVal || ''
}

async function updateJson(relPath, updater) {
  const p = path.join(ROOT, relPath)
  if (!existsSync(p)) return log(`skip ${relPath} (not found)`)
  const data = JSON.parse(await readFile(p, 'utf8'))
  updater(data)
  if (!DRY) await writeFile(p, JSON.stringify(data, null, 2) + '\n')
  log(`updated ${relPath}`)
}

async function replaceIn(relPath, replacer) {
  const p = path.join(ROOT, relPath)
  if (!existsSync(p)) return log(`skip ${relPath} (not found)`)
  const raw = await readFile(p, 'utf8')
  const next = typeof replacer === 'function' ? replacer(raw) : raw.replaceAll(replacer.from, replacer.to)
  if (next === raw) return log(`unchanged ${relPath}`)
  if (!DRY) await writeFile(p, next)
  log(`updated ${relPath}`)
}

function log(msg) {
  console.log(`${DRY ? '[dry-run] ' : ''}✓ ${msg}`)
}

function run(cmd) {
  console.log(`\n$ ${cmd}`)
  if (!DRY) execSync(cmd, { cwd: ROOT, stdio: 'inherit' })
}

async function main() {
  console.log('┌─────────────────────────────────────────┐')
  console.log('│  React Vite Boilerplate — Setup         │')
  console.log('└─────────────────────────────────────────┘\n')

  const rawName = flags.name || (await ask('Project name (kebab-case)', 'my-app'))
  const kebab = toKebab(rawName)
  if (!kebab) {
    console.error('✗ Invalid project name.')
    process.exit(1)
  }
  const displayName = flags.display || toTitle(kebab)

  console.log('')
  console.log(`  Package name : ${kebab}`)
  console.log(`  Display name : ${displayName}`)
  console.log(`  Reset git    : ${flags['reset-git'] ? 'yes' : 'no'}`)
  console.log(`  Install      : ${flags['no-install'] ? 'no' : 'yes'}`)
  console.log(`  Dry run      : ${DRY ? 'yes' : 'no'}`)
  console.log('')

  if (!flags.name && !flags.yes) {
    const confirm = await ask('Proceed? [Y/n]', 'Y')
    if (!/^y(es)?$/i.test(confirm)) {
      console.log('Aborted.')
      process.exit(0)
    }
  }

  await updateJson('package.json', (p) => {
    p.name = kebab
  })

  await replaceIn('index.html', (raw) => raw.replace(/<title>[^<]*<\/title>/, `<title>${displayName}</title>`))

  await replaceIn('README.md', (raw) => raw.replace(/^# .+$/m, `# ${displayName}`))

  for (const envFile of ['.env', '.env.example']) {
    await replaceIn(envFile, (raw) =>
      /^VITE_APP_NAME=/m.test(raw)
        ? raw.replace(/^VITE_APP_NAME=.*$/m, `VITE_APP_NAME=${displayName}`)
        : raw,
    )
  }

  for (const lng of ['en', 'vi']) {
    await updateJson(`src/locales/${lng}/common.json`, (o) => {
      o.appName = displayName
    })
  }

  if (!existsSync(path.join(ROOT, '.env')) && existsSync(path.join(ROOT, '.env.example'))) {
    if (!DRY) await cp(path.join(ROOT, '.env.example'), path.join(ROOT, '.env'))
    log('created .env from .env.example')
  }

  if (flags['reset-git']) {
    if (existsSync(path.join(ROOT, '.git'))) {
      if (!DRY) await rm(path.join(ROOT, '.git'), { recursive: true, force: true })
      log('removed old .git')
    }
    run('git init -b main')
    run('git add .')
    run(`git commit -m "chore: initialize ${kebab}"`)
  }

  if (!flags['no-install']) {
    run('npm install')
  }

  console.log('\n✅ Setup complete.\n')
  console.log('Next steps:')
  console.log('  npm run dev             # start dev server')
  console.log('  npm run storybook       # start Storybook')
  console.log('  npm run typecheck       # type check')
  console.log('  npm run build           # production build')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

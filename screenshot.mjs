import {execFile} from 'child_process'
import {mkdirSync} from 'fs'

const url = process.argv[2] || 'http://localhost:5050'
const out = process.argv[3] || './temporary screenshots/shot.png'
const w = process.argv[4] || '1440'
const h = process.argv[5] || '2400'
mkdirSync('./temporary screenshots', {recursive: true})
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const args = ['--headless=new','--hide-scrollbars','--force-device-scale-factor=1',`--window-size=${w},${h}`,`--screenshot=${out}`,'--virtual-time-budget=5000',url]
execFile(chrome, args, (e,so,se)=>{ if(e){console.error(se||e.message);process.exit(1)} console.log('saved',out) })

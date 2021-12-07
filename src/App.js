/* eslint-disable no-restricted-globals */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { XTerm } from 'xterm-for-react'
import { WebLinksAddon } from 'xterm-addon-web-links';
import { colors, HELP_LIST, NOT_FOUND, SHOW_HELP, WELCOME_TEXTS, WITH_PROMPT } from './utils';

function DevDayPage() {
  const [enabled, setEnabled] = useState(true);
  const [input, setInput] = useState('');
  const xtermRef = useRef(null);
  const writeTerminal = useCallback((text) => xtermRef.current?.terminal.write(text), []);
  const clearTerminal = useCallback(() => xtermRef.current?.terminal.clear());

  const asyncTyped = useCallback(async (text, time = 200) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        writeTerminal(text);
        resolve(null);
      }, time);
    });
  }, [writeTerminal]);

  useEffect(() => {
    loadAddons();
    focus();
    welcomeTyped();

    function loadAddons() {
      xtermRef.current?.terminal.loadAddon(new WebLinksAddon());
    }

    async function renderKmongDevday(arr) {
      for (const text of arr) {
        await asyncTyped(text, 120);
      }
    }

    function focus() {
      xtermRef.current?.terminal.focus()
    }
    
    async function welcomeTyped() {
      await renderKmongDevday(WELCOME_TEXTS.KMONG);
      await asyncTyped('', 750);
      await renderKmongDevday(WELCOME_TEXTS.DEVDAY);
      await asyncTyped('', 500);
      await asyncTyped('1');
      await asyncTyped('회');
      await asyncTyped(' 크');
      await asyncTyped('몽');
      await asyncTyped(' 데', 150);
      await asyncTyped('브', 150);
      await asyncTyped('데', 150);
      asyncTyped('이\r\n');
      asyncTyped('press Enter key to start');
    }
  }, [asyncTyped, writeTerminal])

  const pressEnterKey = useCallback(() => {
    switch (input) {
      case '': {


        // D-day 계산
        const setDay = new Date("2021-12-16:23:59:59+0900");
        const now = new Date();
        const distance = setDay.getTime() - now.getTime();
        let day = Math.floor(distance/(1000*60*60*24));

        if (day == 0) {
          day = 'DAY';
        }

        clearTerminal();
       
        writeSchedule(day);

        break;
      }
      case 'ls': {
        writeLs();
        break;
      }
      case 'ls -al': {
        writeLsAll();
        break;
      }
      case 'vi .dev-kmong': {
        clearTerminal();
        wirteDevKmong();
        break;
      }
      case 'cd':
      case 'cd ':
      case 'cd ..':
      case 'cd ~' : {
        window.location.replace("/2021-devday/")
        break;
      }
      case 'cd bk': {
        const person = input.split(' ')[1] ?? '';
        if (person === '' || person === '..') {
          writeNoSuchCd();
        } else {
          clearTerminal();
          writeBk();
        }

        break;
      }
      case 'cd edgar':
      case 'cd daniel': {

        const person = input.split(' ')[1] ?? '';
        if (person === '' || person === '..') {
          writeNoSuchCd();
        } else {
          clearTerminal();
          writeDanieL();
        }

        break;
        
      }
      case 'cd mincho': {

        const person = input.split(' ')[1] ?? '';
        if (person === '' || person === '..') {
          writeNoSuchCd();
        } else {
          clearTerminal();
          writeMincho();
        }

        break;
      }
      case 'cd vigli': {
        const person = input.split(' ')[1] ?? '';
        if (person === '' || person === '..') {
          writeNoSuchCd();
        } else {
          clearTerminal();
          writeVigli();
        }
        break;
      }
      case 'cd nadia':
      case 'show me the money': {
        writeTerminal('\r\n');
        writeTerminal('10,000');
        writeTerminal('\r\n');
        break;
      }
      case 'rm -rf':
      case 'rm -rf /': {
        writeTerminal('\r\n');
        writeTerminal('please');
        writeTerminal('\r\n');
        break;
      }
      case 'devday start': {
        writeStart();
        break;
      }
      case 'devday readme': {
        writeReadme();
        break;
      }
      case 'devday --help': {
        writeHelp();
        break;
      }
      default: {
        writeNotFoundCommand();
        break;
      }
    }
    writeTerminal(WITH_PROMPT);
    writeTerminal("");
    setInput('');

    function writeNotFoundCommand() {
      writeTerminal('\r\n');
      writeTerminal(NOT_FOUND(input));
      writeTerminal('\r\n');
      writeTerminal(SHOW_HELP);
      writeTerminal('\r\n');
    }

    function writeHelp() {
      writeTerminal('\r\n');
      HELP_LIST.forEach((help) => {
        writeTerminal(WITH_PROMPT);
        writeTerminal(`${help.command}    ${help.description}`);
      });
      writeTerminal('\r\n');
    }

    function writeLs() {
      writeTerminal('\r\n');
      writeTerminal(`${colors.blue}bk               edgar               daniel               pablo`);
      writeTerminal('\r\n');
      writeTerminal(`mincho           vigli               nadia                bong${colors.white}`);
      writeTerminal('\r\n');
    }

    // 이스터 에그로 추가 하면 좋을 듯 
    function writeLsAll() {
      
      writeTerminal('\r\n');
      writeTerminal('total 1216\n\r');
      writeTerminal('drwxr-xr-x    11 User  staff      125 12  6 12:16 .\n\r');
      writeTerminal('drwxr-xr-x     4 User  staff     1216 12  6 12:16 ..\n\r');
      writeTerminal(`drwxr-xr-x    13 User  staff      416 12  6 12:16 ${colors.blue}.git${colors.white}\n\r`);
      writeTerminal('-rw-r--r--     1 User  staff      310 12  6 12:16 .gitignore\n\r');
      writeTerminal(`drwxr-xr-x    19 User  staff      919 12  6 12:16 ${colors.blue}bk${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x    12 User  staff      408 12  6 12:16 ${colors.blue}edgar${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x     9 User  staff      315 12  6 12:16 ${colors.blue}daniel${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x     9 User  staff      630 12  6 12:16 ${colors.blue}pablo${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x     5 User  staff      401 12  6 12:16 ${colors.blue}mincho${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x    19 User  staff      919 12  6 12:16 ${colors.blue}vigli${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x    15 User  staff      609 12  6 12:16 ${colors.blue}nadia${colors.white}\n\r`);
      writeTerminal(`drwxr-xr-x    13 User  staff      418 12  6 12:16 ${colors.blue}bong${colors.white}\n\r`);
      writeTerminal(`-rw-rw-r--    10 User  staff     1216 12  6 12:16 .dev-kmong\n\r`);
      writeTerminal('\r\n');

    }

    async function wirteDevKmong () {
      await asyncTyped('', 500);
      await asyncTyped('이 ');
      await asyncTyped('파일을 ');
      await asyncTyped('찾아내다니 ');
      await asyncTyped('.');
      await asyncTyped('.');
      await asyncTyped('.', 150);
      await asyncTyped('\r\n', 150);
      await asyncTyped('당신은 ', 150);
      await asyncTyped('찐 개발자 ', 150);
      await asyncTyped('✧⁺⸜(  •⌄•  )⸝⁺✧', 150);
      
      await asyncTyped('\r\n', 150);
      writeTerminal('\r\n');
      writeTerminal('press devday --help to show menu\n\r');
      writeTerminal('\r\n');
    }

    function writeCd() {
      const person = input.split(' ')[1] ?? '';
      writeTerminal('\r\n');
      writeTerminal(`${colors.red}WARNING${colors.white} Access denied for user to database '${person}'.`);
      writeTerminal('\r\n');
    }

    function writeNoSuchCd() {
      writeTerminal('\r\n');
      writeTerminal(`${colors.red}WARNING${colors.white} bash: cd: desktop: No such file or directory`);
      writeTerminal('\r\n');
    }

    async function writeReadme() {
      writeTerminal(WITH_PROMPT);
      const url = HELP_LIST.find((help) => help.command === 'devday readme').url;
      writeTerminal(`visit to ${url}`);

      await asyncTyped('\r\n', 150);
      writeTerminal('\r\n');
      asyncTyped('press devday --help to show menu\n\r');
    }

    async function writeStart() {
      writeTerminal(WITH_PROMPT);
      const url = HELP_LIST.find((help) => help.command === 'devday start').url;
      writeTerminal(`visit to ${url}`);
      writeTerminal('\r\n');
      await asyncTyped('password : kmong', 300);

      // 움직일 수가 없다 ... 
      // setEnabled(false);
      writeTerminal('\r\n');
      await asyncTyped('.', 300);
      writeTerminal('\r\n');
      await asyncTyped('..', 400);
      writeTerminal('\r\n');
      await asyncTyped('...', 500);
      writeTerminal('\r\n');
      await asyncTyped('....', 700);
      writeTerminal('\r\n');
      await asyncTyped('.....', 900);
      writeTerminal('\r\n');
      writeTerminal("[프로세스 완료됨]");

      await asyncTyped('\r\n', 150);
      writeTerminal('\r\n');
      asyncTyped('press devday --help to show menu\n\r');

    }
  }, [asyncTyped, input, writeTerminal]);

  async function writeSchedule(day) {

    writeTerminal('\r\n');
    writeTerminal('\r\n');

    await asyncTyped('\r\t*************	 Kmong DevDay	 *************\n', 100);
    writeTerminal('\r\n');
    await asyncTyped(`\r\t\t      일정표 D-${day} (12/16)\n`, 120);

    writeTerminal('\r\n');
    writeTerminal('\r\n');

    await asyncTyped('\r\t1', 100);
    await asyncTyped('부\n', 200);
    writeTerminal('\r\t\t14:00 - 14:30   ooo  [주제 주제 주제]\n');
    writeTerminal('\r\t\t14:40 - 15:10   ooo  [주제 주제 주제]\n');
    writeTerminal('\r\t\t15:20 - 15:50   ooo  [주제 주제 주제]\n');
    

    writeTerminal('\r\n');
    writeTerminal('\r\n');

    await asyncTyped('\r\t쉬', 100);
    await asyncTyped('는', 120);
    await asyncTyped('시', 150);
    await asyncTyped('간\n', 180);
    writeTerminal('\r\t\t15:50 - 16:10    쉬고 오셔용 (｡•̀ᴗ-)✧ (찡긋-☆)\n');

    writeTerminal('\r\n');
    writeTerminal('\r\n');

    await asyncTyped('\r\t2', 150);
    await asyncTyped('부\n', 200);
    writeTerminal('\r\t\t16:10 - 16:40    ooo [주제 주제 주제]\n');
    writeTerminal('\r\t\t16:50 - 17:20    ooo [주제 주제 주제]\n');
    writeTerminal('\r\t\t17:30 - 18:00    ooo [주제 주제 주제]\n');
    writeTerminal('\r\t\t18:10 - 18:40    ooo [주제 주제 주제]\n');

    writeTerminal('\r\n');
    writeTerminal('\r\npress devday --help to show menu\n\r');
    writeTerminal('\r\n');
  }

// 소감 작성 함수 시작
  
  async function writeMincho(){

      await asyncTyped('', 500);
      await asyncTyped('안');
      await asyncTyped('녕');
      await asyncTyped('하');
      await asyncTyped('세');
      await asyncTyped('요', 150);
      await asyncTyped('\r\n', 150);
      await asyncTyped('민쵸 ', 150);
      await asyncTyped('입니다 !!!', 150);
      await asyncTyped(' (⸝⸝･ᴗ･⸝⸝)੭˒˒', 150);

      await asyncTyped('\r\n', 150);
      await asyncTyped('2021 년도 ', 250);
      await asyncTyped('한 해의 ', 250);
      await asyncTyped('마무리를 ', 250);
      await asyncTyped('\r\n', 150);
      await asyncTyped('크몽 데브데이와 ', 550);
      await asyncTyped('함께 ', 250);
      await asyncTyped('할 수 있어서 ', 250);
      await asyncTyped('씬나요 ~~ !! ', 250);
      await asyncTyped('(۶•̀ᴗ•́)۶ ', 250);
      await asyncTyped('\r\n', 150);
      await asyncTyped('\r\n', 150);
      await asyncTyped('크몽 데브 데이 화이팅 !!! ', 550);
      writeTerminal('\r\n');
      writeTerminal('\r\n');
      writeTerminal('press devday --help to show menu\n\r');
      writeTerminal('\r\n');

  }

  // Vigli 소감 작성
 async function writeVigli() {

      await asyncTyped('', 500);
      await asyncTyped('DanieL', 50);
      await asyncTyped(' bk', 200);
      await asyncTyped(' Mincho', 200);
      await asyncTyped(' Bong', 200);
      await asyncTyped(' Nadia', 200);
      await asyncTyped(' 본인', 150);
      await asyncTyped(' 업무로', 150);
      await asyncTyped(' 바쁜', 150);
      await asyncTyped(' 와중에', 150);
      await asyncTyped('\r\n', 150);
      await asyncTyped('재밌는', 150);
      await asyncTyped(' 아이디어로', 150);
      await asyncTyped(' 참여를', 150);
      await asyncTyped(' 잘', 150);
      await asyncTyped(' 해주셔서', 150);
      await asyncTyped('\r\n', 150);
      await asyncTyped('TF', 550);
      await asyncTyped(' 진행', 550);
      await asyncTyped(' 성공적', 550);
      await asyncTyped(' (˵ ͡~ ͜ʖ ͡°˵)ﾉ', 150);

      await asyncTyped('\r\n', 150);
      writeTerminal('\r\n');
      writeTerminal('press devday --help to show menu\n\r');

      writeTerminal('\r\n');
 }

 async function writeDanieL() {
      await asyncTyped('', 500);
      await asyncTyped('T: ', 50);
      await asyncTyped('Thanks ', 150);
      await asyncTyped('god, ', 150);
      await asyncTyped(`it's `, 150);
      await asyncTyped(`Dev `, 150);
      await asyncTyped(`Day !`, 150);
      await asyncTyped('\r\n', 150);
      await asyncTyped('F: ', 50);
      await asyncTyped('Fun ', 150);
      await asyncTyped('You ', 150);
      await asyncTyped(`!?! `, 150);
      await asyncTyped(`즐겁게 `, 550);
      await asyncTyped(`참여하세요~ `, 550);
      await asyncTyped(`(˵ ͡~ ͜ʖ ͡°˵)ﾉ`, 150);


      await asyncTyped('\r\n', 150);
      writeTerminal('\r\n');
      writeTerminal('press devday --help to show menu\n\r');
      writeTerminal('\r\n');
 }

  async function writeBk() {
      await asyncTyped('', 500);
      await asyncTyped('감사합니다 ', 50);
      await asyncTyped('\r\n ', 150);
      await asyncTyped('별로 ', 150);
      await asyncTyped('한 ', 150);
      await asyncTyped('건 ', 350);
      await asyncTyped('없지만 ', 350);
      await asyncTyped('함께 할 수 있어 ', 150);
      await asyncTyped('영광 ', 150);
      await asyncTyped('이었습니다.  ', 150);

      await asyncTyped('\r\n', 150);
      writeTerminal('\r\n');
      writeTerminal('press devday --help to show menu\n\r');
      writeTerminal('\r\n');
 }

  const handleChangeCLI = useCallback((data) => {
    if (!enabled) {
      return;
    }

    if (!xtermRef.current) {
      return;
    }

    const code = data.charCodeAt(0);
    if (code === 13) {
      // 엔터
      pressEnterKey();
    } else if (code < 32) {
      // 이상한거 (컨투롤, 알트 커맨드 등등)
      return;
    } else if (code === 127) {
      // 빽스페이스
      pressBackspace();
    } else {
      // 타이핑
      typing(data);
    }

    function pressBackspace() {
      writeTerminal("\b \b");
      setInput(input.slice(0, -1));
    }

    function typing(data) {
      writeTerminal(data);
      setInput(input + data);
    }
  }, [enabled, input, pressEnterKey, writeTerminal]);

  return (
    <main style={styles.main}>
      <XTerm
        ref={xtermRef}
        options={{ cursorBlink: enabled }}
        onData={handleChangeCLI}
      />
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }
};

export default DevDayPage;

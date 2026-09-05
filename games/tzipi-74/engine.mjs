import {pairs, history} from './questions.mjs';

export const games = {
  family: {title:'אם לסבתא היו תלתלים', subtitle:'אמת או שקר', count:pairs.length},
  history: {title:'זה מעניין ת׳סבתא שלי', subtitle:'לפני או אחרי שסבתא נולדה', count:history.length}
};

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for(let i=result.length-1; i>0; i--) {
    const j=Math.floor(random()*(i+1));
    [result[i], result[j]]=[result[j], result[i]];
  }
  return result;
}

export function createGame(mode, random = Math.random) {
  if(!games[mode]) throw new Error('Unknown game');
  const source = mode === 'family' ? pairs : history;
  const selectedQuestions = shuffle(source, random).slice(0, mode === 'family' ? 10 : 20);
  const questions = mode === 'family' ? selectedQuestions.map(pair => {
    const selected = random() < .5 ? 0 : 1;
    return {id:pair.id, question:pair.statements[selected], answer:selected === pair.truth ? 'true' : 'false', fact:pair.statements[pair.truth]};
  }) : selectedQuestions.map(q=>({...q}));
  return {mode, questions:shuffle(questions,random), index:0, score:0, answers:[], done:false};
}

export function answerGame(state, value) {
  if(state.done || state.answers.length > state.index) return null;
  const allowed = state.mode === 'family' ? ['true','false'] : ['before','after'];
  if(!allowed.includes(value)) return null;
  const question=state.questions[state.index];
  const correct=value === question.answer;
  state.answers.push({value, correct});
  if(correct) state.score++;
  return {correct, question};
}

export function nextQuestion(state) {
  if(state.done || state.answers.length !== state.index+1) return false;
  if(state.index === state.questions.length-1) state.done=true;
  else state.index++;
  return true;
}

export function resultText(mode, score, total) {
  const p=score/total;
  const index=p===1 ? 0 : p>=.8 ? 1 : p>=.6 ? 2 : p>=.4 ? 3 : 4;
  const messages=mode === 'family' ? [
    ['האנציקלופדיה של סבתא ציפי!','מכירים כל סיפור וכל פרט. לסבתא אין סודות מכם!'],
    ['מכירים את סבתא מקרוב!','איזה יופי של היכרות! עוד קפה עם סבתא ותדעו גם את השאר.'],
    ['יש לכם מקום טוב באלבום המשפחתי','מכירים לא מעט מסבתא ציפי, ויש עוד סיפורים נהדרים לגלות.'],
    ['הסיפורים הכי טובים עוד לפניכם','כבר מכירים חלק מהסיפורים. זה זמן מצוין לשבת עם סבתא ולשמוע עוד.'],
    ['הזמנה לקפה עם סבתא!','יש עולם שלם של סיפורים לגלות על ציפי. מתחילים בשיחה טובה ובחיבוק.']
  ] : [
    ['אלופי ההיסטוריה והידע הכללי!','אף תקופה לא בלבלה אתכם. מסע מושלם בזמן!'],
    ['יש לכם חוש מצוין להיסטוריה!','ידע כללי מרשים, וזיכרון שמחבר יפה בין האירועים והתקופות.'],
    ['מטיילים יפה על ציר הזמן','בסיס טוב בידע כללי ובהיסטוריה, ועוד כמה תגליות לאוסף.'],
    ['ציר הזמן מתחיל להסתדר','חלק מהאירועים כבר יושבים במקום. בסיבוב הבא יהיו פחות הפתעות.'],
    ['כל מסע בזמן מתחיל בצעד אחד','הפעם ההיסטוריה הצליחה להפתיע. עכשיו כבר יש לכם כמה עובדות חדשות לסיבוב הבא!']
  ];
  return messages[index];
}

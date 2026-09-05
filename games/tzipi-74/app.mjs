import {games,createGame,answerGame,nextQuestion,resultText} from './engine.mjs';

const $=id=>document.getElementById(id);
let state=null;
const choiceLabels={true:'אמת',false:'שקר',before:'לפני שסבתא נולדה',after:'אחרי שסבתא נולדה'};

function show(view) {
  for(const id of ['home','play','results']) $(id).hidden=id!==view;
  window.scrollTo({top:0,behavior:'instant'});
}
function home() {
  state=null;
  show('home');
  document.title='סבתא ציפי חוגגת 74 — משחקים משפחתיים';
  $('home-title').focus({preventScroll:true});
}
function start(mode) {
  state=createGame(mode);
  show('play');
  $('game-title').textContent=games[mode].title;
  $('game-category').textContent=games[mode].subtitle;
  document.title=games[mode].title+' — סבתא ציפי חוגגת 74';
  renderQuestion();
}
function status() {
  $('score').textContent=state.score;
  $('question-count').textContent=`שאלה ${state.index+1} מתוך ${state.questions.length}`;
  $('progress').setAttribute('aria-valuemax',state.questions.length);
  $('progress').setAttribute('aria-valuenow',state.answers.length);
  $('progress').setAttribute('aria-valuetext',`${state.answers.length} מתוך ${state.questions.length} שאלות נענו`);
  $('progress-fill').style.width=`${state.answers.length/state.questions.length*100}%`;
}
function renderQuestion() {
  const q=state.questions[state.index];
  $('question').textContent=q.question;
  $('question-hint').textContent=state.mode==='family'?'הסיפור הזה על סבתא — אמת או שקר?':'זה קרה לפני או אחרי שסבתא ציפי נולדה?';
  $('feedback').replaceChildren();
  $('feedback').className='feedback';
  $('next').hidden=true;
  $('answers').replaceChildren();
  const choices=state.mode==='family'?['true','false']:['before','after'];
  for(const value of choices) {
    const button=document.createElement('button');
    button.className='answer-button';
    button.dataset.value=value;
    const symbol=document.createElement('span');
    symbol.className='answer-icon';
    symbol.setAttribute('aria-hidden','true');
    symbol.textContent={true:'✓',false:'×',before:'↶',after:'↷'}[value];
    const label=document.createElement('span');
    label.textContent=state.mode==='family'?choiceLabels[value]:(value==='before'?'לפני':'אחרי');
    if(state.mode==='history') {
      const small=document.createElement('small');
      small.textContent='שסבתא נולדה';
      label.append(small);
    }
    button.append(symbol,label);
    button.addEventListener('click',()=>answer(value));
    $('answers').append(button);
  }
  status();
  $('question').focus({preventScroll:true});
}
function answer(value) {
  const result=answerGame(state,value);
  if(!result) return;
  const {correct,question:q}=result;
  for(const button of $('answers').children) {
    button.disabled=true;
    const right=button.dataset.value===q.answer;
    const chosen=button.dataset.value===value;
    button.classList.add(right?'correct':chosen?'wrong':'dimmed');
    if(chosen) button.setAttribute('aria-label',`${choiceLabels[value]} — הבחירה שלך. ${correct?'נכון':'לא נכון'}`);
    else if(right) button.setAttribute('aria-label',`${choiceLabels[q.answer]} — התשובה הנכונה`);
    button.querySelector('.answer-icon').textContent=right?'✓':chosen?'×':'·';
  }
  const feedback=$('feedback');
  feedback.className='feedback '+(correct?'good':'bad');
  const title=document.createElement('strong');
  title.textContent=correct?'בול! תשובה נכונה ✦':'הפעם לא — אבל גילינו משהו!';
  const explanation=document.createElement('p');
  explanation.textContent=state.mode==='family'?(q.answer==='true'?'זו האמת: ':'זה שקר. האמת היא: ')+q.fact:`${choiceLabels[q.answer]} · ${q.year}`;
  feedback.append(title,explanation);
  if(q.note) {
    const detail=document.createElement('p');
    detail.className='detail';
    detail.textContent=q.note;
    feedback.append(detail);
  }
  if(q.source) {
    const link=document.createElement('a');
    link.className='source-link';
    link.href=q.source;
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.textContent=`מקור: ${q.sourceLabel} ↗`;
    link.setAttribute('aria-label',`מקור: ${q.sourceLabel}, נפתח בכרטיסייה חדשה`);
    feedback.append(link);
  }
  status();
  $('next').textContent=state.index===state.questions.length-1?'לתוצאות! ✦':'לשאלה הבאה ←';
  $('next').hidden=false;
  // Keep feedback in the viewport without auto-advancing or stealing focus from its live region.
  requestAnimationFrame(()=> {
    const rect=feedback.getBoundingClientRect();
    if(rect.bottom>window.innerHeight-20) feedback.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
}
function results() {
  const total=state.questions.length;
  const [title,message]=resultText(state.mode,state.score,total);
  $('result-title').textContent=title;
  $('result-message').textContent=message;
  $('result-game').textContent=games[state.mode].title+' · סיימתם!';
  $('result-score').textContent=state.score;
  $('result-total').textContent=`מתוך ${total}`;
  $('result-percent').textContent=`${Math.round(state.score/total*100)}% תשובות נכונות`;
  show('results');
  $('result-title').focus({preventScroll:true});
}
document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>start(button.dataset.start)));
$('next').addEventListener('click',()=>{
  if(!state || !nextQuestion(state)) return;
  if(state.done) results(); else renderQuestion();
});
$('again').addEventListener('click',()=>start(state.mode));
$('other').addEventListener('click',()=>start(state.mode==='family'?'history':'family'));
$('home-button').addEventListener('click',home);
function leave() {
  if(state && !state.done && state.answers.length>0) $('exit-dialog').showModal();
  else home();
}
$('leave').addEventListener('click',leave);
document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();leave();});
$('stay').addEventListener('click',()=>$('exit-dialog').close());
$('exit').addEventListener('click',()=>{$('exit-dialog').close();home();});


// ══════════════════════════════════════════════════════════
// STATE MANAGEMENT
// ══════════════════════════════════════════════════════════
const KEY = 'py_tracker_90d_v1';
let state = { checks:{}, startDate:null };
let filter = 'all';
let expanded = {};

const CURRICULUM = (() => {
  const weekThemes = [
    'Python Setup & Basics',
    'Variables & Data Types',
    'Operators & Logic',
    'Control Flow',
    'Loops',
    'Functions',
    'Lists & Strings',
    'Tuples & Dictionaries',
    'Sets & Comprehensions',
    'OOP Basics',
    'Files & Modules',
    'Exceptions & Debugging',
    'Projects & Practice'
  ];

  const dayTitles = [
    'Environment Setup', 'Hello World', 'Variables', 'Input & Output', 'Numbers & Math',
    'Booleans & Comparisons', 'Strings', 'String Methods', 'Lists', 'List Methods',
    'Tuples', 'Dictionaries', 'Sets', 'Loop Review', 'If Statements', 'Else & Elif',
    'Nested Conditions', 'Logical Operators', 'For Loop', 'While Loop', 'Break & Continue',
    'Range & Enumerate', 'Function Basics', 'Parameters', 'Return Values', 'Scope',
    'Default Arguments', 'Lambda Functions', 'Recursion Intro', 'Mini Project', 'String Problems',
    'List Problems', 'Dictionary Problems', 'Set Problems', 'Comprehensions', 'Tuple Review',
    'OOP Intro', 'Classes', 'Objects', 'Methods', 'Constructors', 'Encapsulation', 'Inheritance',
    'Polymorphism', 'Magic Methods', 'Project Builder', 'File Reading', 'File Writing',
    'CSV Handling', 'JSON', 'Modules', 'Packages', 'Standard Library', 'Imports', 'Exceptions',
    'Try/Except', 'Finally', 'Custom Errors', 'Debugging', 'Testing Basics', 'Pytest Intro',
    'Real-world App', 'Calculator App', 'To-Do App', 'Quiz App', 'Timer App', 'Game Logic', 'Data Analysis',
    'Web Scrape Basics', 'API Basics', 'Automation Script', 'Automation Script 2', 'Mini Portfolio',
    'Code Review', 'Performance Tips', 'Project Planning', 'Project Build 1', 'Project Build 2',
    'Project Build 3', 'Project Build 4', 'Project Testing', 'Project Polish', 'Final Review'
  ];

  const templates = [
    ['Install Python', 'Set up VS Code', 'Create hello.py'],
    ['Print a message', 'Run the script', 'Check the output'],
    ['Use variables', 'Store a name', 'Print a greeting'],
    ['Read user input', 'Convert to int', 'Show computed result'],
    ['Practice arithmetic', 'Use exponentiation', 'Round a result'],
    ['Compare values', 'Use == and !=', 'Explain truthy values'],
    ['Create strings', 'Concatenate text', 'Use f-strings'],
    ['Trim whitespace', 'Uppercase/lowercase', 'Slice a string'],
    ['Build a list', 'Access by index', 'Append a value'],
    ['Sort a list', 'Remove an item', 'Reverse a list'],
    ['Create a tuple', 'Read tuple values', 'Compare tuple vs list'],
    ['Build a dictionary', 'Add a key', 'Look up a value'],
    ['Create a set', 'Union and intersection', 'Unique values'],
    ['Review variables', 'Use conditionals', 'Test a small script'],
    ['Write if block', 'Test a true case', 'Check false case'],
    ['Add else', 'Check multiple branches', 'Read boolean logic'],
    ['Write nested if', 'Use and/or', 'Check edge cases'],
    ['Practice comparisons', 'Use not', 'Combine conditions'],
    ['Loop through list', 'Use range()', 'Print each item'],
    ['Count using while', 'Stop on condition', 'Avoid infinite loops'],
    ['Break a loop', 'Continue a loop', 'Use enumerate'],
    ['Create range', 'Loop with index', 'Summarize output'],
    ['Define function', 'Call function', 'Use parameters'],
    ['Pass arguments', 'Return a value', 'Use result in script'],
    ['Study local scope', 'Understand globals', 'Trace variable values'],
    ['Write default arg', 'Test missing input', 'Practice overload logic'],
    ['Write lambda', 'Use map()', 'Filter values'],
    ['Try recursion', 'Base case', 'Call recursively'],
    ['Solve a simple challenge', 'Test different values', 'Trace execution'],
    ['Practice with strings', 'Reverse text', 'Count vowels'],
    ['Solve list task', 'Use list traversal', 'Modify values elegantly'],
    ['Solve dictionary task', 'Map keys', 'Count frequencies'],
    ['Solve set task', 'Find unique items', 'Compare data'],
    ['Use comprehension', 'Create list from range', 'Filter values'],
    ['Review tuple logic', 'Use packing', 'Unpack values'],
    ['Create a class', 'Add attributes', 'Print object info'],
    ['Instantiate object', 'Call method', 'Inspect state'],
    ['Design a class', 'Set object values', 'Use instance data'],
    ['Write method', 'Use self', 'Return a result'],
    ['Create constructor', 'Initialize fields', 'Practice object setup'],
    ['Use __init__', 'Model a student', 'Track values'],
    ['Create child class', 'Extend methods', 'Use inheritance'],
    ['Override method', 'Use super()', 'Check behavior'],
    ['Implement __str__', 'Debug object output', 'Explore dunder methods'],
    ['Build a small project', 'Apply design', 'Test the flow'],
    ['Open a file', 'Read text', 'Print lines'],
    ['Write to a file', 'Append content', 'Read after writing'],
    ['Read CSV data', 'Split rows', 'Inspect values'],
    ['Read JSON file', 'Use json.load', 'Print data'],
    ['Import a module', 'Use math', 'Call a function'],
    ['Create package', 'Organize files', 'Import from package'],
    ['Use random', 'Use datetime', 'Review library docs'],
    ['Structure imports', 'Avoid circular imports', 'Explain access'],
    ['Handle exception', 'Catch ValueError', 'Display message'],
    ['Use try/except', 'Check multiple errors', 'Handle invalid input'],
    ['Use finally', 'Add cleanup code', 'Practice flow control'],
    ['Define custom error', 'Raise it', 'Catch it'],
    ['Trace code execution', 'Use print debugging', 'Inspect state'],
    ['Write a unit test', 'Assert conditions', 'Run the test'],
    ['Run pytest', 'Fix failing case', 'Review feedback'],
    ['Design app flow', 'List requirements', 'Sketch modules'],
    ['Build calculator UI', 'Add input', 'Compute values'],
    ['Create todo app', 'Add tasks', 'Mark complete'],
    ['Build quiz app', 'Track score', 'Show final result'],
    ['Create timer app', 'Track seconds', 'Display countdown'],
    ['Code game logic', 'Use loops', 'Track score'],
    ['Process data', 'Summarize statistics', 'Print table'],
    ['Fetch sample page', 'Parse HTML', 'Inspect output'],
    ['Call a public API', 'Parse JSON', 'Display result'],
    ['Automate file work', 'Batch rename files', 'Log result'],
    ['Write second script', 'Use argparse', 'Run from terminal'],
    ['Plan your portfolio', 'Choose a project', 'Outline features'],
    ['Review code quality', 'Refactor naming', 'Improve readability'],
    ['Optimize loops', 'Improve complexity', 'Measure performance'],
    ['Draft project plan', 'Break into tasks', 'Set milestone'],
    ['Build project core', 'Write main logic', 'Test key flow'],
    ['Add features', 'Handle edge cases', 'Improve UX'],
    ['Finalize features', 'Handle errors', 'Test main paths'],
    ['Refine UI', 'Improve feedback', 'Polish styling'],
    ['Run regression tests', 'Check output', 'Fix failures'],
    ['Review project docs', 'Summarize steps', 'Prepare demo'],
    ['Final code review', 'Check edge cases', 'Record improvements']
  ];

  let currentDay = 1;
  const curriculum = [];

  weekThemes.forEach((theme, weekIndex) => {
    const daysInWeek = weekIndex === weekThemes.length - 1 ? 6 : 7;
    const weekDays = [];

    for (let i = 0; i < daysInWeek; i++) {
      const index = currentDay - 1;
      const title = dayTitles[index] || `Practice Day ${currentDay}`;
      const topic = theme;
      const tasks = templates[index]?.map((task, taskIndex) => ({
        n: `${taskIndex + 1}. ${task}`,
        detail: '#python #practice',
        min: 20 + (taskIndex * 10)
      })) || [
        { n: '1. Review notes', detail: '#python #daily-focus', min: 25 },
        { n: '2. Practice examples', detail: '#python #coding', min: 25 }
      ];

      weekDays.push({ d: currentDay, title, topic, tasks });
      currentDay += 1;
    }

    curriculum.push({ label: `Week ${weekIndex + 1} — ${theme}`, days: weekDays });
  });

  return curriculum;
})();

function loadState(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw) state = JSON.parse(raw);
    if(!state.startDate) state.startDate = new Date().toISOString().split('T')[0];
  }catch(e){ state = { checks:{}, startDate: new Date().toISOString().split('T')[0] }; }
  saveState();
}
function saveState(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }

function getStart(){ return new Date(state.startDate+'T00:00:00'); }
function dayDate(d){ const dt=new Date(getStart()); dt.setDate(dt.getDate()+d-1); return dt; }
function currentDay(){
  const now=new Date(); now.setHours(0,0,0,0);
  const diff=Math.floor((now-getStart())/86400000)+1;
  return Math.max(1,Math.min(diff,90));
}
function fmtDate(dt){ return dt.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }
function fmtShort(dt){ return dt.toLocaleDateString('en-IN',{day:'numeric',month:'short'}); }
function taskKey(d,t){ return `d${d}_t${t}`; }
function getDayDone(day){ return day.tasks.filter((_,i)=>state.checks[taskKey(day.d,i)]).length; }
function getWeekNum(d){ return Math.ceil(d/7); }

// ══════════════════════════════════════════════════════════
// FILTER
// ══════════════════════════════════════════════════════════
function setFilter(f,btn){
  filter=f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderContent();
}
function setFilterMob(f,btn){
  filter=f;
  document.querySelectorAll('.mob-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  // sync top filter
  document.querySelectorAll('.filter-btn').forEach(b=>{
    if(b.getAttribute('onclick')===`setFilter('${f}',this)`) b.classList.add('active');
    else b.classList.remove('active');
  });
  renderContent();
}

// ══════════════════════════════════════════════════════════
// SIDEBAR TOGGLE (MOBILE)
// ══════════════════════════════════════════════════════════
function openSidebar(){
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow='hidden';
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.style.overflow='';
}

// ══════════════════════════════════════════════════════════
// TASK TOGGLE
// ══════════════════════════════════════════════════════════
function toggleTask(d,t){
  state.checks[taskKey(d,t)]=!state.checks[taskKey(d,t)];
  saveState();
  renderAll();
}
function toggleExpand(d){
  expanded[d]=!expanded[d];
  renderContent();
}

// ══════════════════════════════════════════════════════════
// RENDER ALL
// ══════════════════════════════════════════════════════════
function renderAll(){
  const today=currentDay();
  let totalDone=0,totalTasks=0,daysDone=0;
  CURRICULUM.forEach(w=>w.days.forEach(day=>{
    const done=getDayDone(day);
    totalTasks+=day.tasks.length; totalDone+=done;
    if(done===day.tasks.length) daysDone++;
  }));
  const pct=Math.round((totalDone/totalTasks)*100);
  document.getElementById('sb-prog').style.width=pct+'%';
  document.getElementById('sb-pct').textContent=pct+'%';
  document.getElementById('sb-done').textContent=totalDone;
  document.getElementById('sb-total').textContent=totalTasks;
  document.getElementById('sb-days').textContent=daysDone;
  document.getElementById('topbar-date').textContent=fmtDate(new Date());
  document.getElementById('topbar-day').textContent=`Day ${today} / 90`;
  renderSidebar(today);
  renderContent();
}

function renderSidebar(today){
  const nav=document.getElementById('sidebar-nav');
  nav.innerHTML='';
  CURRICULUM.forEach(week=>{
    const lbl=document.createElement('div');
    lbl.className='nav-week-label';
    lbl.textContent=week.label;
    nav.appendChild(lbl);
    week.days.forEach(day=>{
      const done=getDayDone(day);
      const isToday=day.d===today;
      const allDone=done===day.tasks.length;
      const partial=done>0&&!allDone;
      const a=document.createElement('a');
      a.className='nav-day'+(isToday?' today':'');
      a.href='#day-'+day.d;
      a.onclick=()=>{ if(window.innerWidth<=768) closeSidebar(); };
      a.innerHTML=`<span class="nav-day-num">d${String(day.d).padStart(2,'0')}</span><span class="nav-day-title">${day.title}</span><span class="nav-dot${allDone?' done':partial?' partial':''}"></span>`;
      nav.appendChild(a);
    });
  });
}

function renderContent(){
  const today=currentDay();
  const content=document.getElementById('content');
  content.innerHTML='';
  let any=false;

  CURRICULUM.forEach(week=>{
    const filtered=week.days.filter(day=>{
      if(filter==='all') return true;
      if(filter==='today') return day.d===today;
      if(filter==='week'){
        const wk=getWeekNum(today);
        return getWeekNum(day.d)===wk;
      }
      const done=getDayDone(day);
      if(filter==='done') return done===day.tasks.length;
      if(filter==='pending') return done<day.tasks.length;
      return true;
    });
    if(!filtered.length) return;
    any=true;

    const sec=document.createElement('div');
    sec.className='week-section';
    sec.innerHTML=`<div class="week-heading"><span class="week-badge">${week.label.split('—')[0].trim()}</span><span class="week-title">${week.label.split('—')[1]?.trim()||''}</span><div class="week-line"></div></div>`;

    filtered.forEach(day=>{
      const isToday=day.d===today;
      const isLocked=day.d>today;
      const done=getDayDone(day);
      const allDone=done===day.tasks.length;
      const dt=dayDate(day.d);
      const isOpen=expanded[day.d]!==undefined?expanded[day.d]:isToday;
      const totalMin=day.tasks.reduce((s,t)=>s+t.min,0);
      const hrs=Math.floor(totalMin/60),mins=totalMin%60;
      const timeStr=hrs>0?`${hrs}h ${mins}m`:`${mins}m`;
      const pct=Math.round((done/day.tasks.length)*100);

      let cls='day-card'+(isToday?' is-today':allDone?' is-done':isLocked?' is-locked':'');
      let badge=isLocked?'🔒':allDone?'✓':`D${day.d}`;
      let badgeCls='day-num-badge'+(isToday?' today':allDone?' done':isLocked?' locked':'');
      let progCls='day-prog-text'+(allDone?' done':done>0?' partial':'');

      const card=document.createElement('div');
      card.className=cls; card.id='day-'+day.d;
      card.innerHTML=`
        <div class="day-header" onclick="toggleExpand(${day.d})">
          <div class="${badgeCls}">${badge}</div>
          <div class="day-info">
            <div class="day-title-row">
              <span class="day-title-text">${day.title}</span>
              ${isToday?'<span class="today-tag">TODAY</span>':''}
            </div>
            <div class="day-meta-row">
              <span class="meta-pill">${day.topic}</span>
              <span class="meta-pill">· ${day.tasks.length} tasks</span>
              <span class="meta-pill">· ⏱ ${timeStr}</span>
              <span class="meta-pill">· ${fmtShort(dt)}</span>
            </div>
          </div>
          <div class="day-right">
            <span class="${progCls}">${done}/${day.tasks.length}</span>
            <div class="day-mini-bar"><div class="day-mini-fill" style="width:${pct}%"></div></div>
            <span class="chevron${isOpen?' open':''}">▾</span>
          </div>
        </div>
        ${isOpen?renderTasksHTML(day,isLocked):''}
      `;
      sec.appendChild(card);
    });
    content.appendChild(sec);
  });

  if(!any) content.innerHTML='<div class="empty-state"><div>✓</div>Nothing here</div>';
}

function renderTasksHTML(day,isLocked){
  if(isLocked) return `<div class="locked-notice">🔒 Unlocks on ${fmtDate(dayDate(day.d))}</div>`;
  let h='<div class="task-list">';
  day.tasks.forEach((t,i)=>{
    const checked=!!state.checks[taskKey(day.d,i)];
    h+=`<div class="task-item" onclick="toggleTask(${day.d},${i})">
      <div class="task-cb${checked?' checked':''}"></div>
      <div class="task-body">
        <div class="task-name${checked?' done':''}">${t.n}</div>
        <div class="task-detail">${t.detail}</div>
      </div>
      <div class="task-time">⏱ ${t.min}m</div>
    </div>`;
  });
  return h+'</div>';
}

// ══════════════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════════════
loadState();
renderAll();

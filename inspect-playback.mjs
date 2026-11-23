const pages = await fetch('http://10.0.1.121:9998/json/list').then(r => r.json());
const page = pages.find(p => p.title === 'NHK World');
if (!page) throw new Error('NHK World debug target not found');
const ws = new WebSocket(page.webSocketDebuggerUrl);
const result = await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('DevTools request timed out')), 5000);
  ws.onopen = () => ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      returnByValue: true,
      expression: `(function(){var v=document.querySelector('video'),e=v&&v.error,m=document.querySelector('#message');return JSON.stringify({title:document.title,url:location.href,video:v?{readyState:v.readyState,paused:v.paused,currentTime:v.currentTime,networkState:v.networkState,error:e?{code:e.code,message:e.message}:null,buffered:v.buffered.length?v.buffered.end(v.buffered.length-1):0}:null,message:m?m.textContent:''});})()`
    }
  }));
  ws.onmessage = event => {
    clearTimeout(timeout);
    const data = JSON.parse(event.data);
    ws.close();
    if (data.error) reject(new Error(data.error.message));
    else resolve(data);
  };
  ws.onerror = () => reject(new Error('DevTools WebSocket failed'));
});
process.stdout.write(JSON.stringify(result) + '\n');

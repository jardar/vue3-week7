function a(t,r="/"){if(typeof t!="number")return t;const e=new Date(t),n=e.getMonth()+1,o=e.getDate();return`${e.getFullYear()}${r}${n<10?"0"+n:n}${r}${o<10?"0"+o:o}`}export{a as T};

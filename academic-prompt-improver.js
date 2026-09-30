const $=id=>document.getElementById(id);
function clean(s){return s.trim().replace(/\s+/g," ")}
function buildPrompt(){
 const task=clean($("task").value); if(!task){$("status").textContent="Enter a rough academic request first.";return}
 const type=$("type").value, level=$("level").value, format=$("format").value, context=clean($("context").value), evidence=$("evidence").value;
 const evidenceRule=evidence==="strict"
  ?"Clearly separate: (1) claims supported by evidence, (2) interpretation, and (3) AI-generated suggestions. Never invent citations, findings, statistics, authors, or sources. If evidence is unavailable, say so."
  :evidence==="sources"
  ?"Use only sources that can be verified. Give enough bibliographic detail to locate each source. Never fabricate citations; mark anything unverified."
  :"Do not invent factual claims, citations, findings, or statistics.";
 const prompt=[
  "ROLE: Act as a careful academic research assistant.",
  "TASK: "+task,
  "TASK TYPE: "+type+".",
  "ACADEMIC LEVEL: "+level+".",
  context?"CONTEXT / CONSTRAINTS: "+context:"",
  "OUTPUT: Use a "+format.toLowerCase()+". Keep the response directly relevant to the task and do not add variables, populations, methods, outcomes, or constraints that I did not provide.",
  "EVIDENCE & INTEGRITY: "+evidenceRule,
  "UNCERTAINTY: State important assumptions and limitations. Ask for missing information only when it materially affects accuracy.",
  "FINAL CHECK: Before answering, verify that every substantive element stays within my supplied scope."
 ].filter(Boolean).join("\n\n");
 $("output").textContent=prompt;$("outputCard").hidden=false;$("copy").disabled=false;$("status").textContent="Prompt improved locally in your browser; no API key is used.";
}
$("build").addEventListener("click",buildPrompt);
$("copy").addEventListener("click",async()=>{await navigator.clipboard.writeText($("output").textContent);$("status").textContent="Copied.";});
$("clear").addEventListener("click",()=>{$("task").value="";$("context").value="";$("output").textContent="";$("outputCard").hidden=true;$("copy").disabled=true;$("status").textContent="";});

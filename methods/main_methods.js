//? scriptLog(logLevel, message);

//? jobLog(jobName,jobGroupName,"SUCCESS","message");

//* var outputParams=new java.util.HashMap();

//* outpuParams.put("returnType","SUCCES");

//* outpuParams.put("returnMessage","message");

//* outpuParams.put("returnType","WARNING");

//* outpuParams.put("returnMessage","message");


//* outpuParams.put("returnType","ERROR");

//* outpuParams.put("returnMessage","message");

//? ibappsSetSuccessMessage("ok","ok");

//? ibappsSetWarningMessage("advise","advise");

//? ibappsSetSuccessMessage(codeError,"error","error");

//? var it = inputParams.keySet().toArray(); forEach 

//? var it = inputParams.keySet().iterator(); while(it.hasNext()) {it.next()}

// query
//? var iql = "SELECT PARTY_TYPE_KEY FROM R_PARTY WHERE PARTY_NO = :serial";
//? bindVars
//? var bindVars = new BindVars();
//? added BindVars
//? bindVars.add("serial", serial);
//? query invocation
//? var iqlResult = iqlQuery(iql, bindVars);
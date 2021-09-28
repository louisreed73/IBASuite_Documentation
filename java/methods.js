//* Object.setKeys() return an hashMap of object members.
//* Object.values() return an hashMap of object values.

//* Object.setKeys().toArray() return an array of object members.
//* Object.values().toArray() return an array of object values.
//? After that the returned value can use forEach loop function(value,index,array)

//* Object.setKeys().iterator() return an array of object members.
//* Object.values().iterator() return an array of object values.
//? After that you can use:

//* var it=Object.setKeys();
//* it.size(); number of elements for(var i=0;i.size();i++)

//* var it=Object.setKeys().iterator();

//* while(it.hasNext()) {
//*     var key=String(it.next());
//*     console.log(Object.get(key))

//*  scriptLog("DEBUG",Object.get(key))
//* }



//* dtoToJson() - mapToJson();
//* var objAgency=dtoToJson(inputParams);
//* var objAgency2=mapToJson(inputParams);
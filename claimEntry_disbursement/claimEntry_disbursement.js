//add values to create DISBURESEMENT

var claimDto = findClaimBySerial(claimSerial);

var claimDto = findClaimBySerial(claimSerial);
var claimId = claimDto.getId();
var bindParams2 = new Packages.dk.ibapps.ibapps.model.script.general.BindVars();
bindParams2.add("claimId", claimId);



//hcd-724
var entryType = "Indemnization Reserve";
bindParams2.add("entryType", entryType);
var sqlClaimEntries = "select * from (select entry_no, id from claim_entry where ref_claim = :claimId and ref_transaction_type in (15, 18) and ENTRY_TEXT = :entryType and closed_by is null order by date_created desc) where rownum <= 5";
//hcd-724
var sqlResultClaimEntries = sqlQuery(sqlClaimEntries, bindParams2);

var bindParams3 = new Packages.dk.ibapps.ibapps.model.script.general.BindVars();
bindParams3.add("claimEntryId", sqlResultClaimEntries.get(0).get("ID"));



var sqlCheck = "select count(id) COUNT from claim_entry where ref_parent = :claimEntryId and ref_transaction_type in (4, 5) and closed_by is null";
var sqlCheckResult = sqlQuery(sqlCheck, bindParams3);



var claimEntryNo = sqlResultClaimEntries.get(0).get("ENTRY_NO");



claimEntryDto = getClaimEntry(claimSerial, claimEntryNo);



//Create DISBURESEMENT
var bindParams4 = new Packages.dk.ibapps.ibapps.model.script.general.BindVars();
bindParams4.add("claimEntryId", claimEntryDto.getId());
var sqlQuery1 = "select ref_claim_group from claim_entry where id = :claimEntryId";
var sqlQueryResutl1 = sqlQuery(sqlQuery1, bindParams4);
var claimGroupId = sqlQueryResutl1.get(0).get("REF_CLAIM_GROUP");
var bindParams5 = new Packages.dk.ibapps.ibapps.model.script.general.BindVars();
bindParams5.add("claimEntryId", claimEntryDto.getId());




var sqlQuery2 = "select entry from prod_claim_default_reserve where id = (select ref_prod_claim_Default_reserve from claim_entry where id = :claimEntryId)";
var sqlQueryResutl2 = sqlQuery(sqlQuery2, bindParams5);
var pcdre = sqlQueryResutl2.get(0).get("ENTRY");



var bindParams6 = new Packages.dk.ibapps.ibapps.model.script.general.BindVars();
bindParams6.add("claimGroupId", claimGroupId);




var sqlQuery3 = "select name from product_claim_group where id = :claimGroupId";
var sqlQueryResutl3 = sqlQuery(sqlQuery3, bindParams6);
var pcgn = sqlQueryResutl3.get(0).get("NAME");

var disbursementEntry = createClaimEntry(
    claimSerial,
    claimEntryDto.getEntryText(),
    "",
    java.math.BigDecimal(amountPayNote),
    claimEntryDto.getEntryDate(),
    claimEntryDto.getEntry(),
    "DISBURSEMENT",
    "",
    pcgn, // productClaimGroupName,
    pcdre, // productClaimDefaultReserveEntry,
    claimEntryDto.getSerial(), // parentClaimEntrySerial
    claimEntryDto.getCoverPremiumPartTypeName(), // coverPremiumPartTypeName
    getEnumValueByEnumNameAndCode("CLAIM_DISBURSEMENT_TYPE", 7).getSerial() // disbursementTypeSerial - manual payment
);

//update reserve Claim Entries
var reserveToupdate = reserveOther - amountPayNote
kgUpdateClaimEntryAmount(claimSerial, claimEntryNo, reserveToupdate)



// create Collection

var bindParams = new BindVars();
bindParams.add("claimSerial", claimSerial);
var iqlResultColl = iqlQuery(queryColl, bindParams);

var customerSerial = iqlResultColl.get(0).get("CUSTOMER_NO");
var customerDTO = findCustomerBySerial(customerSerial);

var policy = iqlResultColl.get(0).get("POLICY_NO");
var policyDTo = getScriptDTOBySerial(policy);

var collectionSerial = ibappsGetCollectionsForPolicy(policyDTo, null);
var collectionDTO = getCollectionBySerial(collectionSerial);



var sqlBindVars = new Packages.dk.ibapps.ibapps.model.script.general.BindVars();
sqlBindVars.add("customerId", customerDTO.getId());

var partySerial = sqlQuery("select serial from party where ref_customer = :customerId", sqlBindVars).get(0).get("SERIAL");



var today = IBDateTruncate(new java.util.Date());



var collectionGroupDTO = createCollectionGroup(today, today, partySerial, java.math.BigDecimal(0));



var collectionGroupSerial = collectionGroupDTO.getSerial();
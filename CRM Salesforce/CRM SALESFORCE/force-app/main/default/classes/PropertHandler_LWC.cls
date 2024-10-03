public class PropertHandler_LWC{
    @AuraEnabled(cacheable = true)
    public static List<Property_Sheet1__c> getProperty(String type, String verified){
        // Assuming verified is now a string with values like 'true' or 'false'
        return [SELECT Id, Location__c, Property_Name__c, Type__c, Verified__c
                FROM Property_Sheet1__c
                WHERE Type__c = :type AND Verified__c = :verified];
    }

}
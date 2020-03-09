
/**
 * @typedef Payload
 * @property {string} eventId The Event ID
 * @property {string} documentId The Document ID for which the Event Occured
 * @property {string} documentName The Document Name for which the Event Occured
 * @property {string} app The App in which the Event Occured
 * @property {string} triggerType Who triggred the Event
 * @property {string} triggerId ID of the entity that triggred the Event
 * @property {string} source The Source of the Event
 * @property {string} timestamp When the Event Occured
 * @property {string} partnerId The Partner ID of the Flow for which the Event Occured
 * @property {string} partnerName The Partner Name of the Flow for which the Event Occured
 * @property {string} priority Priority of the Event
 * @property {string} txnId Transaction ID of the Request that triggred the Event
 */

/**
 * 
 * @param {Payload} payload The Event Payload
 */
function getSubject(payload) {
    // Logic
}

/**
 * 
 * @param {Payload} payload The Event Payload
 */
function getHTML(payload) {
    // Logic
}


module.exports.getSubject = getSubject;
module.exports.getHTML = getHTML;
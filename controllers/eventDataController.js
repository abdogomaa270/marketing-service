// DATA STORAGE
const freeEventsData = [
  "terms_and_conditions_agree",
  "terms_and_conditions_disagree",
  "submission_form_fill",
  "submission_form_submit",
  "submission_form_cancel",
  "payment_proceed",
  "payment_success",
  "payment_failed",
  "payment_cancel",
  "newsletter_form_submission",
  "nour_chatbot_view",
  "whatsapp_service_quality_management_click",
  "sign_up_enter",
  "sign_up_exit_without_completion",
  "sign_up_complete",
  "forgot_password",
  "Reset_password_complete",
  "initiate_support_chat",
  "download_app_store",
  "download_google_play",
];
exports.DateRequiredEventsData = [
  "submission_form_access",
  "payment_page_access",
  "check_status_access",
  "language_selection_arabic",
  "language_selection_english",
];
const requiredEventsDataObject = {
  service_selection: "serviceName",
  nour_chatbot_service_click: "serviceName",
  faq_question_view: "faq_question",
  end_chat_time_spent: "timeSpent",
  page_time_spent: "timeSpent",
  social_media_conversion: "platform",
};

const requiredEventsData = (eventName, body) => {
  const key = requiredEventsDataObject[eventName];
  return { key: body[key] };
};
//-------------------------------------------------------------
/**
 * @param {string} eventName
 * @param {object} body
 * @returns {object | boolean}
 */
//MAIN FUNCTION
exports.formCustomDataObject = (eventName, body) => {
  if (freeEventsData.includes(eventName)) {
    return false;
  }
  if (this.DateRequiredEventsData.includes(eventName)) {
    return {
      when: body.when,
    };
  }
  if (Object.keys(requiredEventsDataObject).includes(eventName)) {
    const dataObject = requiredEventsData(eventName, body);
    return dataObject;
  }
  return null;
};

//@desc it returns all events names
//@usage : in validation eventName
exports.allEventsNames = freeEventsData
  .concat(this.DateRequiredEventsData)
  .concat(Object.keys(requiredEventsDataObject));

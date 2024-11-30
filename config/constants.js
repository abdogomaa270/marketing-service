require("dotenv").config("./.env");

module.exports.env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  PIXEL_ID: process.env.PIXEL_ID,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};
/**
 * ! IMPORTANT NOTE
 * read it if you will add new event <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 *
 * 1- add the event name to the events object as a key
 * 2- if this event don't require any data form client (frontend || mobile) ? => just set it to false
 *    end ;
 * 3- if this event require data ? set it's value as an object with number of keys as the number of required data
 *    - key (any name you want it will not affect any thing) and value
 *    - value => it will be keyName in request body
 * 
 * THEN => you need to add it's validation in the validation file ../validations/marketingValidator.js
 * 
 * append the existing validation with this 
 * 
 * <keyName>: joi.when("eventName", {
    is: joi.string().valid(<eventName1>,<eventName2>), //list of events that require this data
    then: joi.string().required(), //write your validation here
  }),
 */

module.exports.events = {
  //free event data
  terms_and_conditions_agree: false,
  terms_and_conditions_disagree: false,
  submission_form_fill: false,
  submission_form_submit: false,
  submission_form_cancel: false,
  payment_proceed: false,
  payment_success: false,
  payment_failed: false,
  payment_cancel: false,
  newsletter_form_submission: false,
  nour_chatbot_view: false,
  whatsapp_service_quality_management_click: false,
  sign_up_enter: false,
  sign_up_exit_without_completion: false,
  sign_up_complete: false,
  forgot_password: false,
  Reset_password_complete: false,
  initiate_support_chat: false,
  download_app_store: false,
  download_google_play: false,
  //when key required event data
  submission_form_access: { key: "when" },
  payment_page_access: { key: "when" },
  check_status_access: { key: "when" },
  language_selection_arabic: { key: "when" },
  language_selection_english: { key: "when" },
  //other required event data
  service_selection: { key1: "serviceName" },
  nour_chatbot_service_click: { key1: "serviceName" },
  faq_question_view: { key1: "faq_question" },
  end_chat_time_spent: { key1: "timeSpent" },
  page_time_spent: { key1: "timeSpent" },
  social_media_conversion: { key1: "platform" },
};

//@usage : in validation eventName
exports.allEventsNames = Object.keys(this.events);

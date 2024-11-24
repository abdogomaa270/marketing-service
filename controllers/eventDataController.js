const {
  freeEventsData,
  DateRequiredEventsData,
} = require("../config/constants");

const requiredEventsData = (eventName, body) => {
  switch (eventName) {
    case "nour_chatbot_service_click":
      return { serviceName: body.serviceName };
    case "faq_question_view":
      return { faq_question: body.faq_question };
    case "end_chat_time_spent":
    case "page_time_spent":
      return { timeSpent: body.timeSpent };
    case "social_media_conversion":
      return { platform: body.platform };
    default:
      return {};
  }
};

exports.detectCustomData = (eventName, body) => {
  if (freeEventsData.includes(eventName)) {
    return false;
  }
  if (DateRequiredEventsData.includes(eventName)) {
    return {
      when: body.when,
    };
  }
  if (Object.keys(requiredEventsData).includes(eventName)) {
    const dataObject = requiredEventsData(eventName, body);
    return dataObject;
  }
  return null;
};

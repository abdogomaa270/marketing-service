const bizSdk = require("facebook-nodejs-business-sdk");
const { CustomData, EventRequest, UserData, ServerEvent } = bizSdk;
const { env } = require("../config/constants");
const { detectCustomData } = require("./eventDataController");
const ApiError = require("../middlewares/ApiError");

const access_token = env.ACCESS_TOKEN;
const pixel_id = env.PIXEL_ID;

bizSdk.FacebookAdsApi.init(access_token);

let current_timestamp = Math.floor(new Date() / 1000); //UNIX timestamp
//--------------------------------------------------------------------
const setUserData = (req) => {
  const { userId, email, phones } = req.body;
  return new UserData()
    .setExternalId(userId)
    .setEmails([email])
    .setPhones(phones)
    .setClientIpAddress(req.ip)
    .setClientUserAgent(req.headers["user-agent"]);
};
//--------------------------------------------------------------------
const initializeServerEvent = ({ userData, eventSourceUrl, req }) => {
  const eventName = req.body.eventName;

  const serverEvent = new ServerEvent()
    .setEventName(eventName)
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setEventSourceUrl(eventSourceUrl)
    .setActionSource("website");

  const customData = detectCustomData(eventName, req.body);
  if (customData) {
    const customDataObject = new CustomData().setCustomProperties(customData);
    serverEvent.setCustomData(customDataObject);
  }
  return serverEvent;
};
//-------------------------------------------------------------------
exports.sendEventToMeta = async (req, res) => {
  try {
    const eventSourceUrl =
      req.headers.referer || "http://jaspers-market.com/product/123";

    const userData = setUserData(req);
    console.log(userData);

    const serverEvent = initializeServerEvent({
      userData,
      eventSourceUrl,
      req,
    });
    //5- create eventRequest object
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
      eventsData
    );

    const response = await eventRequest.execute();

    return res.status(200).json({ status: `success`, response: response });
  } catch (err) {
    return new ApiError(err.message, 500);
  }
};

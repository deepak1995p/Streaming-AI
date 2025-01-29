/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai"

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY
// const genAI = new GoogleGenerativeAI(apiKey)

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// })

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// }

async function run(prompt) {
  // const chatSession = model.startChat({
  //   generationConfig,
  //   // safetySettings: Adjust safety settings
  //   // See https://ai.google.dev/gemini-api/docs/safety-settings
  //   history: [],
  // })

  // const result = await chatSession.sendMessage(prompt)
  // const response = result.response.text()
  // console.log(result.response.text())

  // return response
}

export default run
// export const msalConfig = {
//   auth: {
//       clientId: "54b8cd30-fb65-4e60-8f41-ca7a8dcf4938", // Replace with your Client ID
//       authority: "https://login.microsoftonline.com/7e315b15-f710-4dd7-adcb-2738eee4c5e3", // Replace with your Tenant ID
//       redirectUri: "http://localhost:5173/login", // Your redirect URL
//   },
// };
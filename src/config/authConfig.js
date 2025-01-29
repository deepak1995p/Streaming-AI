export const msalConfig = {
    auth: {
        clientId: "<<Client ID>>", // Replace with your Client ID
        authority: "https://login.microsoftonline.com/<your Tenant ID>", // Replace with your Tenant ID
        redirectUri: "http://localhost:5173/login", // Your redirect URL
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};
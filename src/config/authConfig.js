export const msalConfig = {
    auth: {
        clientId: "54b8cd30-fb65-4e60-8f41-ca7a8dcf4938", // Replace with your Client ID
        authority: "https://login.microsoftonline.com/7e315b15-f710-4dd7-adcb-2738eee4c5e3", // Replace with your Tenant ID
        redirectUri: "http://localhost:5173/login", // Your redirect URL
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};
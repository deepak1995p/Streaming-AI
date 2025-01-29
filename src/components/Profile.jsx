import { useMsal } from "@azure/msal-react";

const UserProfile = () => {
  const { instance, accounts } = useMsal();

  const getProfile = async () => {
    const account = accounts[0];
    const tokenResponse = await instance.acquireTokenSilent({
      scopes: ["User.Read"],
      account,
    });

    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
      },
    });

    const userData = await response.json();
    console.log(userData);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button onClick={getProfile} className="bg-green-500 text-white px-4 py-2 rounded-lg w-52 h-12">
        Get Profile
      </button>
    </div>

  );
};

export default UserProfile;
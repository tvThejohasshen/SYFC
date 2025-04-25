import { UserManager } from 'https://cdn.skypack.dev/oidc-client-ts';

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mjcv7jdTm",
    client_id: "7ltlrjvtav1jkoqjrolp0j7b01",
    redirect_uri: "https://www.techsg.click",
    response_type: "code",
    scope: "phone openid email"
};

// create a UserManager instance
export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

export async function signOutRedirect () {
    const clientId = "7ltlrjvtav1jkoqjrolp0j7b01";
    const logoutUri = "https://www.techsg.click";
    const cognitoDomain = "https://us-east-1mjcv7jdtm.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};
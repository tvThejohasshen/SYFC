import { UserManager } from 'https://cdn.skypack.dev/oidc-client-ts';

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_aOUMlhBgb",
    client_id: "1b7iih9kge05ojlvjta9najefs",
    redirect_uri: "https://www.techsg.click",
    response_type: "code",
    scope: "phone openid email"
};

// create a UserManager instance
export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

export async function signOutRedirect () {
    const clientId = "1b7iih9kge05ojlvjta9najefs";
    const logoutUri = "https://www.techsg.click"; // Make sure to replace with your actual logout URI
    const cognitoDomain = "https://us-east-1aoumlhbgb.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};
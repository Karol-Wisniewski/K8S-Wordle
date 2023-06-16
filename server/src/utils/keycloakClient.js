import Keycloak from 'keycloak-connect';
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
if (!KEYCLOAK_CLIENT_ID) {
	console.error("No keycloak client id specified!");
	process.exit(1);
}
const KEYCLOAK_SERVER_URL = process.env.KEYCLOAK_SERVER_URL;
if (!KEYCLOAK_SERVER_URL) {
	console.error("No keycloak server url specified!");
	process.exit(1);
}
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
if (!KEYCLOAK_REALM) {
	console.error("No keycloak realm specified!");
	process.exit(1);
}

console.log({
	clientId: KEYCLOAK_CLIENT_ID,
	bearerOnly: true,
	serverUrl: KEYCLOAK_SERVER_URL,
	realm: KEYCLOAK_REALM,
  });

export const keycloakClient = new Keycloak({}, {
  clientId: KEYCLOAK_CLIENT_ID,
  bearerOnly: true,
  "realm": KEYCLOAK_REALM,
  "auth-server-url": KEYCLOAK_SERVER_URL,
  "ssl-required": "external",
  "resource": KEYCLOAK_REALM,
  "public-client": true,
  "confidential-port": 0
});

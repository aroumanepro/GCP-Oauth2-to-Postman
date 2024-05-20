import { exec, spawn } from "child_process";
import url from "url";

import { GoogleAuth } from "google-auth-library";

export const getAuthenticatedHeaders = async () => {
  try {
    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    return {
      access_token: accessToken.res.data.access_token,
      id_token: accessToken.res.data.id_token,
      refresh_token: accessToken.res.data.refresh_token,
      token_type: "Bearer",
      expires_in: accessToken.res.data.expires_in,
      refresh_expires_in: accessToken.res.data.expires_in,
      scope: accessToken.res.data.scope,
      token_key: "id_token",
    };
  } catch (error) {
    console.error("Failed to refresh credentials:", error);
    throw error;
  }
};

export const runGcloudCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};

export const run_gcloud_auth = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const process = spawn("gcloud", ["auth", "login"]);

    process.stdout.on("data", (data) => {
      const output = data.toString();
      console.log(output);
      if (output.includes("You are now logged in as")) {
        resolve(output);
      }
    });

    process.stderr.on("data", (data) => {
      console.error(data.toString());
      reject(new Error(data.toString()));
    });

    process.on("error", (error) => {
      console.error("Error during gcloud auth login:", error);
      reject(error);
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`gcloud auth login process exited with code ${code}`));
      }
    });
  });
};

export const actionAuth = (req: any, res: any) => {
  const query_params = req.query;
  const base_url = "/auth2/auth/gcp";
  const query_string = new URLSearchParams(query_params).toString();
  const auth_link = `${base_url}?${query_string}`;

  res.render("login", { auth_link });
};

export const auth = async (req: any, res: any) => {
  const redirectUri = req.query.redirect_uri;
  if (!redirectUri) {
    return res.status(400).json({ error: "Missing redirect_uri" });
  }

  const authCode = "local-service-gcp";
  const redirectUrl = url.format({
    pathname: redirectUri,
    query: { code: authCode },
  });

  res.redirect(redirectUrl);
  return true;
};

export const token = async (req: any, res: any) => {
  try {
    const token = await getAuthenticatedHeaders();
    res.send(token);
  } catch (error) {
    console.error("Error getting token:", error);
    res.status(500).send("Internal Server Error");
  }
};

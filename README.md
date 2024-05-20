# OAuth2 GCP For Postman Application Documentation

## Introduction
This open-source application simulates an OAuth2 server, facilitating token generation via Postman. Ideal for developers working with Google Cloud Platform (GCP), it simplifies authentication with services like Cloud Run without needing to use the command line. Save time and focus on what truly matters: developing and improving your GCP services.

## Prerequisites
To use this application, you need to have the **gcloud CLI** installed.

You can install it by following the instructions on the official [Google Cloud](https://cloud.google.com/sdk/docs/install?hl=en) website.

> **Info:** Ensure that the gcloud CLI is configured correctly.

## Usage

### Configuration Steps

#### 1. Authentication Configuration
Go to the **gcloud** tab in the menu on the left, then go to the **Gcloud Default Application** tab. Click on the switch, a window will open allowing you to log in and create an `application_default_credentials.json`.

#### 2. Starting the Application
Go to the **server** tab in the menu on the left, then in the **server** tab click on the switch to start the server. After that, you will see the default server port in the logs: `http://localhost:8086`.

#### 3. Testing with Postman
Use Postman to test authentication with OAuth2. Follow the steps provided in the "Example with Postman" section.

### Example with Postman

#### Step 1: Configure OAuth 2.0
First, configure a collection in Postman. Choose the authentication type **OAuth 2.0**.

**OAuth 2.0 Settings:**

- **Token Name:** `GCP OAuth`
- **Grant type:** `Authorization Code`
- **Callback URL:** `https://oauth.pstmn.io/v1/browser-callback`
- **Auth URL:** `http://localhost:8086/auth2/auth`
- **Access Token URL:** `http://localhost:8086/token`
- **Client ID:** 
- **Client Secret:** 
- **Scope:** 
- **State:** 
- **Client Authentication:** `Send client credentials in body`

This type of authorization will be used for each request in this collection.

#### Step 2: Send the Request
Send the request to test authentication on a secure Cloud Run service. If everything is configured correctly, you should receive a response from your server.

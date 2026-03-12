# n8n-nodes-google-places-pro-creator33

This is an n8n community node to use the **New Google Places API (v1)**. Unlike the legacy API, this version supports advanced features like the **Field Mask**, allowing you to fetch specific data like phone numbers, website URIs, and ratings for businesses and locations.

## Installation

1. Go to **Settings > Community Nodes** in your n8n instance.
2. Click on **Install a new node**.
3. Enter `n8n-nodes-google-places-pro-creator33` and click **Install**.
4. **Important:** Refresh your browser page after installation to see the node in your workflow editor.

## Features

- **Text Search (New API v1):** Search for places using text strings (e.g., "Sushi in London").
- **Dynamic Field Masking:** Only pay for the data you need by specifying fields.
- **Lead Gen Ready:** Easily extract business phone numbers and websites.

## Setup

### 1. Google Cloud Console
- Enable the **Places API (New)** in your Google Cloud Console.
- Create an **API Key**.

### 2. n8n Credentials
- Create a new credential in n8n for **Google Places API**.
- Paste your API Key.

### 3. Usage
- Add the **Google Places Pro** node to your workflow.
- Enter your query.
- Use the **Field Mask** to define your output. 
  - *Example:* `places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri`

## Support

If you encounter issues, please check your Google Cloud billing status or ensure the **Places API (New)** is specifically enabled, as it is separate from the "Legacy" Places API.

---
Developed with ❤️ for the n8n community.
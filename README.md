# Gmail app badge notification

You can download this extension [here](https://chrome.google.com/webstore/detail/gmail-app-badge-notificat/fbaolhbfbmniffcokakochjjeccpcpkh).

![Screenshot](screenshot.png)

## Setup

1. Install the extension.
2. Add Gmail as an app. You can do so by following [this guide](https://support.google.com/chrome_webstore/answer/3060053?hl=en). **Make sure to select the option "open as a window".**
3. Open the newly installed app.

## Usage

By default it will track all emails on the inbox. You can filter based on custom labels if you on;y want to keep track of specific labels

### Tracking emails pon specific labels

When you right click, you get the option to add the label

![Screenshot_option](confconfigure_email_option.png)

or you can click on the extension and click "configure"

![Screenshot_exension](confconfigure_email_extension.png)

When you click it, a new tab opens on the browser to add the label. Then you can type the label you want to see notifications for and then you can close that tab.

![Screenshot_save](confconfigure_email_save.png)

If you want to go back to track everything again, just remove the label and click save.


## Troubleshooting

The extension hasn't been heavily tested. If you are experiencing any problems, please [open an issue](https://github.com/aberonni/gmail-app-badge-notification/issues/new).

#### Previous apps

If you already had a Gmail app, you might have to remove it and add it again. You can do so from the [chrome://apps](chrome://apps) page.

#### Notifications

You might have to manually enable notifications for the app. You can do so from the [chrome://apps](chrome://apps) page. Right click on the app you previously created and select "App info". Under "Privacy and security" settings, make sure to allow notifications.

![](troubleshooting-notifications.png)

#### Gmail from the app store

This extension does not work with the Gmail app downloaded from the web store. Make sure to follow the steps outlined in [Setup](#Setup) to install your app. **Do not install the app displayed below.**

![](troubleshooting-appstore.png)

# NHK World for webOS

A small webOS TV app that opens the official NHK WORLD-JAPAN live stream in a full-screen video player. It attempts playback when launched and provides on-screen controls to retry or open NHK's live TV page if playback does not start.

The app was created for personal use on an LG webOS TV. It is an unofficial community app and is not affiliated with NHK or LG.

## Features

- Opens the NHK WORLD-JAPAN HLS live stream on launch.
- Full-screen video with the webOS/browser video controls.
- A remote-friendly retry button and a link to NHK's official live page.
- Shows a simple connection/error prompt if playback fails.
- App ID: `org.mondy.nhkworld`.

The stream URL is currently defined in `index.html`. NHK may change its URL or playback requirements at any time. Availability can also depend on region, network access, and the webOS media engine's support for the stream format.

## Repository contents

| File | Purpose |
| --- | --- |
| `appinfo.json` | webOS app metadata, ID, version, title, and entry point. |
| `index.html` | App UI, player, stream URL, and playback/retry logic. |
| `icon.png` | App icon used by webOS. |
| `org.mondy.nhkworld_1.0.0_all.ipk` | Prebuilt installable webOS package. |
| `inputhook-keybinds.json` | Optional example mapping key code `1044` to launch this app with InputHook. |
| `inspect-playback.mjs` | Local debugging helper for inspecting a running app through the webOS DevTools endpoint. Not needed to build or install the app. |

## Build

The app is plain HTML/CSS/JavaScript and has no npm dependencies or compilation step. To create an IPK, install the webOS TV CLI (`ares-cli`) and run `ares-package` from this directory:

```sh
ares-package .
```

The CLI writes a `.ipk` package in the current directory. The output filename is based on the app metadata. To build into another directory, consult the options supported by your installed `ares-package` version (`ares-package --help`).

## Install on a TV

Pair the TV with the webOS TV CLI first, then install and launch the package:

```sh
ares-install --device YOUR_DEVICE org.mondy.nhkworld_1.0.0_all.ipk
ares-launch --device YOUR_DEVICE org.mondy.nhkworld
```

`YOUR_DEVICE` is the device name configured in `ares-setup-device`. The TV and computer need network connectivity to each other. You can also install the IPK with a compatible webOS Homebrew Channel or package manager.

## Optional InputHook mapping

`inputhook-keybinds.json` is an example configuration for the webOS InputHook service. It maps key code `1044` to launch `org.mondy.nhkworld`. InputHook must already be installed and configured on the TV; this file is not part of the app package and is not required for normal launching. Check your InputHook version's documentation before merging the mapping into its active configuration.

## Playback troubleshooting

1. Check that the TV can reach NHK's stream over the internet.
2. Press **Play / retry** on the app screen.
3. If direct playback still fails, use **Open NHK live page** to try NHK's official web player.
4. If the stream URL has changed, update the `stream` value in `index.html`, rebuild the IPK, and reinstall it.

## License

No license has been specified yet. Add a `LICENSE` file before redistributing the code under an open-source license. The NHK name, stream, and any third-party marks or media remain the property of their respective owners.

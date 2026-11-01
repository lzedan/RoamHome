# Samsung TV (Tizen) setup notes

Personal notes for getting apps onto my retail Samsung TV and starting the next project.

## My TV

| Item | Value |
| --- | --- |
| Model | UN55CU7000DXZA (retail unit) |
| Address | `192.168.0.10:26101` (sdb over network) |
| Profile | `tv` / `tv-samsung` |
| Platform version (per `sdb capability`) | 9.0 |
| CPU / userland | armv7, 32-bit |
| `sdbd` | 2.2.31, TV plugin 3.8.11 |
| Signing profile | `HalcyonDisco` (`~/SamsungCertificate/HalcyonDisco/`) |

Retail lockdown
Debug-mode launch (`pkgcmd_debugmode`) is enabled, and so is `netcoredbg_support`.

Note: the platform version looks high for a 2023 model. Worth confirming under Settings > Support > About This TV.

## Tool locations

Everything lives under the VS Code Tizen extension:

```sh
BASE=~/.tizen-extension-platform/server/sdktools/data/tools
SDB=$BASE/sdb
TZ=$BASE/tizen-core/tz
```

Neither is on `PATH`, so use these variables (or add aliases to `~/.zshrc`).

## One-time setup (done)

1. On the TV, enable **Developer Mode** and enter this Mac's IP as the host PC IP. Reboot the TV if asked.
2. Connect from the Mac:
   ```sh
   $SDB connect 192.168.0.10
   $SDB devices
   ```
   It should list the TV as `device`.
3. In Certificate Manager, create a **Samsung** certificate profile with device type **TV**:
   - New author certificate (remember its password).
   - Distributor certificate with the **public** privilege level, signed in with the Samsung account.
   - Select the connected TV so its **DUID** goes into the certificate. The DUID is not the serial number or model code. It is read from the TV over sdb.
4. Check the profile:
   ```sh
   $TZ security-profiles list
   ```

## Build, install, run

From the project folder:

```sh
$TZ build -w .
$TZ pack -w .
$TZ install -w . -p Debug/TizenSandbox.wgt -e 192.168.0.10:26101
$TZ run -w . -e 192.168.0.10:26101
```

- `pack` signs with the active signing profile and writes `Debug/<name>.wgt`.
- `install` shows an "unencrypted connection" warning. That is normal here.
- To uninstall, use `$TZ uninstall` with the same `-e` flag.
- Debugging (not yet tried): launch with debug on and open the printed port in Chrome DevTools. That also works for screenshots of the app's own page.


## Next project: what type of app?

The TV's OS is Tizen, but a retail Samsung TV mostly accepts **web apps**.

| Type | Fits this TV? | Notes |
| --- | --- | --- |
| **Web app** (HTML/CSS/JS) | Yes | The supported path. What this project uses. Easiest to start with and to debug in Chrome |
| **.NET app** (C#) | Maybe | The device reports `netcoredbg_support`, but TV support for .NET apps is limited. Check before committing |
| **Native app** (C/C++) | Unlikely | Generally restricted to Samsung partners on TVs |

If you are new, start with a web app. It needs no extra toolchain, and a framework such as React or plain JS both work.

### Starting a new project

```sh
$TZ list templates
$TZ new --help
```

Pick a template for `tv-samsung`, then keep these in mind:

- In `tizen_web_project.yaml`, `profile` should be `tv-samsung`. This project uses `api_version: "10.0"` and still installed, but if a future app fails to install, try lowering it to match the TV.
- In `config.xml`, `required_version` is `2.3` here. It controls which platform versions can run the app.
- Reuse the same signing profile (`$TZ security-profiles list`). It is tied to the TV's DUID, not to any one app, so new projects need no new certificate.
- The package id `NyITix3EA6` is generated per project. A new project gets a new id.

## Things that may break later

- **Certificate expiry.** Samsung distributor certificates expire. If installs start failing, regenerate it in Certificate Manager.
- **IP address changes.** If the TV's address changes, update the connect command and the host PC IP in Developer Mode.
- **Developer Mode resets** (for example after a factory reset or some firmware updates). Re-enable it and reconnect.
- **Wrong DUID.** A certificate made for a different device will install nowhere else. Regenerate it with the right device selected.

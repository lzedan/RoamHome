# Roam for TV (Candidate 0)

The Figma Make prototype (`../Home Screen Concept Design`) translated into a Samsung Tizen web app that is driven by the remote. The functionality is the prototype's own, and all data is still mock data. The app makes no network requests.

## Commands

```sh
npm install
npm run dev              # desktop browser at http://localhost:8443 (arrow keys, Enter, Esc = Back)
npm run build            # web build to dist/web
npm run tizen:package    # Tizen build, signed with the active tz profile -> dist/Roam.wgt
npm run tizen:install    # sdb connect + install on the TV
npm run tizen:run        # launch on the TV
npm run tizen:deploy     # all three
```

`TIZEN_TV=host:port` overrides the TV address (default `192.168.0.10:26101`). `TIZEN_TOOLS` overrides where `sdb` and `tz` live. Device setup is in `../TV-SETUP.md`.

## How it's put together

| Path | Role |
| --- | --- |
| `src/tv/Stage.tsx` | Lays the app out on a fixed 1920×1080 canvas and scales it uniformly to the window. Nothing reflows. |
| `src/index.css` | The prototype's styles, with every `clamp()`/`vw`/`vh` replaced by the value it takes at 1080p. |
| `src/tv/spatial.ts` | D-pad focus movement based on element geometry. Any `<button>` or `tabIndex={0}` element is a stop. |
| `src/tv/useRemoteNavigation.ts` | Global key handling: arrows, Back, OK-repeat guard, pointer vs. remote mode, idle release. |
| `src/tv/backStack.ts` | Open modals register themselves here. Back closes the most recent one. |
| `src/tv/keys.ts` | Remote key codes (Tizen `XF86Back`/10009, Escape, webOS 461) and the IME Done/Cancel codes. |
| `src/platform/` | Device APIs behind a small interface. Tizen is the only adapter so far, and a browser fallback is used in development. |
| `platform/tizen/` | `config.xml`, icon, and the tz project file. They are copied into `dist/tizen` at build time. |

### Remote behaviour

- **Ambient until touched.** The home screen starts with no visible focus. The first arrow press shows focus on the first pinned app, or on the current event card when app shortcuts are off. After 30 seconds without input, focus is released again and the event rail resumes rotating.
- **Event rail.** Only the current card is a focus stop. Left and Right step the rail itself, so the focused card stays in the leftmost slot, and the rail wraps in both directions.
- **Modals.** Focus is trapped inside the open modal and starts on its main action. Back closes it and returns focus to whatever opened it.
- **Display name field.** The field stays read-only while focus passes over it, so the TV keyboard doesn't pop up. OK starts editing, and Done, Back, Up, or Down ends it. While the keyboard is open, the app stays at full size and the Display Settings panel slides up to keep the field above the keyboard.
- **Back on the home screen** exits the app, per Samsung's guidelines.
- **Focus rings** appear only when the remote is in use. Pointer input gets the prototype's hover styles instead.

### Compatibility

- **Oldest supported engine.** The floor is Tizen 6.5 (2022 TVs, Chromium 85). `config.xml` requires 6.5, and Vite lowers JS syntax to `chrome85`. The CSS is written by hand to avoid `inset`, unprefixed `mask-image`, `:focus-visible`, and outline-based focus rings.
- **Classic script output.** The output is one IIFE loaded with a plain `defer` script. Module scripts with `crossorigin` can fail from a widget package and leave a blank screen.
- **No Tailwind.** v4 wraps its output in `@layer`, which engines older than Chromium 99 discard. The prototype didn't use any utility classes, and the part of preflight it relied on is inlined at the top of `index.css`.
- **Lite effects on TV.** On the TV the app drops the prototype's live `backdrop-filter` blurs, which TV GPUs can't redraw at frame rate. Modals sit on a copy of the photo that is blurred once at startup (`ModalBackdrop`), and event cards get denser tints. Desktop browsers keep the full effects; `?effects=lite` previews the TV rendering.
- **Bundled assets.** Fonts (via `@fontsource`) and photos are bundled. The hero image is downscaled to 1920px, since the original 5340px JPEG decodes to roughly 76 MB of memory.

## Deviations from the prototype

- The "roam" wordmark and the photo credit are plain text, because links can't be followed on a TV.
- In reduced-motion mode the event rail no longer becomes a horizontal scroller. It keeps the same stepped track, without animation.
- The clock re-renders once per minute instead of once per second, since it never shows seconds.

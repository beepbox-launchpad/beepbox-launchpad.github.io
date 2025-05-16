
export const themes = {
    "dark": `
        --page-margin: #101014;
        --editor-background: #23222b;
        --primary-text: white;
        --secondary-text: #999;
        --inverted-text: black;
        --text-selection: rgba(119, 68, 255, 0.99);
        --link-accent: #98f;
        --ui-widget-background: #373640;
        --ui-widget-focus: #6c6b7c;
        --play-widget-background: #486;
        --multiplicative-mod-slider: #456;
        --indicator-primary: #74f;
        --indicator-secondary: #444;
        --input-box-outline: #333;
        --favorited: #74f;
        --favorited-star: #efe8ff;
        --unfavorited: #444444;
        --unfavorited-star: #777777;
        --update-bubble: #ffa033;
        --mod-title: #9a6bff;
	`,
    "light": `
        --page-margin: #101014;
        --editor-background: #23222b;
        --primary-text: white;
        --secondary-text: #999;
        --inverted-text: black;
        --text-selection: rgba(119, 68, 255, 0.99);
        --link-accent: #98f;
        --ui-widget-background: #373640;
        --ui-widget-focus: #6c6b7c;
        --play-widget-background: #486;
        --multiplicative-mod-slider: #456;
        --indicator-primary: #74f;
        --indicator-secondary: #444;
        --input-box-outline: #333;
        --favorited: #74f;
        --favorited-star: #efe8ff;
        --unfavorited: #444444;
        --unfavorited-star: #777777;
        --update-bubble: #ffa033;
        --mod-title:#fff56b;
	`,
    "midnight": `
        --page-margin: #101014;
        --editor-background: #23222b;
        --primary-text: white;
        --secondary-text: #999;
        --inverted-text: black;
        --text-selection: rgba(119, 68, 255, 0.99);
        --link-accent: #98f;
        --ui-widget-background: #373640;
        --ui-widget-focus: #6c6b7c;
        --play-widget-background: #486;
        --multiplicative-mod-slider: #456;
        --indicator-primary: #74f;
        --indicator-secondary: #444;
        --input-box-outline: #333;
        --favorited: #74f;
        --favorited-star: #efe8ff;
        --unfavorited: #444444;
        --unfavorited-star: #777777;
        --update-bubble: #ffa033;
        --mod-title:#fff56b;
	`,
    "beepbox": `
        --page-margin: #101014;
        --editor-background: #23222b;
        --primary-text: white;
        --secondary-text: #999;
        --inverted-text: black;
        --text-selection: rgba(119, 68, 255, 0.99);
        --link-accent: #98f;
        --ui-widget-background: #373640;
        --ui-widget-focus: #6c6b7c;
        --play-widget-background: #486;
        --multiplicative-mod-slider: #456;
        --indicator-primary: #74f;
        --indicator-secondary: #444;
        --input-box-outline: #333;
        --favorited: #74f;
        --favorited-star: #efe8ff;
        --unfavorited: #444444;
        --unfavorited-star: #777777;
        --update-bubble: #ffa033;
        --mod-title:#fff56b;
	`,
}

    // for custom fonts
    export const _themeStyleElement = document.head.appendChild(HTML.style({ type: "text/css", id: "themes" }));
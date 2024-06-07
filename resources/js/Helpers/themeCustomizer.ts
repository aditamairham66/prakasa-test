interface Config {
    sidenav: {
        view: string;
    };
}

class ThemeCustomizer {
    html: HTMLElement;
    config: Config;
    defaultConfig: Config;

    constructor() {
        this.html = document.getElementsByTagName("html")[0] as HTMLElement;
        this.config = JSON.parse(JSON.stringify((window as any).defaultConfig)) || {};
        this.defaultConfig = JSON.parse(JSON.stringify((window as any).config)) || (window as any).config;
    }

    showBackdrop(): void {
        const backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        backdrop.classList.add(
            "transition-all",
            "fixed",
            "inset-0",
            "z-40",
            "bg-gray-900",
            "bg-opacity-50",
            "dark:bg-opacity-80"
        );

        document.body.appendChild(backdrop);
        document.body.style.overflow = "hidden";
        if (window.innerWidth > 1140) {
            document.body.style.paddingRight = "15px";
        }

        backdrop.addEventListener("click", () => {
            this.html.classList.remove("sidenav-enable");
            this.hideBackdrop();
        });
    }

    hideBackdrop(): void {
        const backdrop = document.getElementById("backdrop");
        if (backdrop) {
            document.body.removeChild(backdrop);
            document.body.style.overflow = null;
            document.body.style.paddingRight = null;
        }
    }

    changeSidenavView(view: string, updateConfig: boolean = true): void {
        this.html.setAttribute("data-sidenav-view", view);
        if (updateConfig) {
            this.config.sidenav.view = view;
            this.setSwitchFromConfig();
        }
    }

    setSwitchFromConfig(): void {
        sessionStorage.setItem("__CONFIG__", JSON.stringify(this.config));
    }
}

export default ThemeCustomizer;
